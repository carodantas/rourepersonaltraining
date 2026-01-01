<?php
/**
 * Free intake form handler
 *
 * Receives POST (JSON or form-urlencoded), writes a one-line-per-client backup TXT (CSV),
 * sends an email to the team and a confirmation email to the client.
 *
 * Supports both payload shapes:
 * - legacy flat fields (firstName, lastName, plan, program, goals, questions...)
 * - nested IntakeFormSubmission (clientDetails, intakeInformation, goals, additionalNotes...)
 *
 * IMPORTANT
 * - This requires a server that EXECUTES PHP. If you're serving only the Angular SSR (Node)
 *   output, PHP won't run.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // Basic preflight support (if ever needed)
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  http_response_code(204);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
  exit;
}

// -----------------------------
// Config (EDIT THESE)
// -----------------------------
$FROM_NAME = 'Roure Personal Training';
$FROM_EMAIL = 'info@roure.nl'; // Recommended to be a valid mailbox on your domain
$TEAM_RECIPIENTS = [
  'info@roure.nl',
  'niels.greven@roure.nl',
];

// Optional delay between team email and client email (helps with strict SMTP rate-limits/greylisting).
// Set as environment variable on the server, e.g. ROURE_MAIL_DELAY_MS=1200 (1.2s)
$MAIL_DELAY_MS_ENV = getenv('ROURE_MAIL_DELAY_MS');
$MAIL_DELAY_MS = ($MAIL_DELAY_MS_ENV !== false && $MAIL_DELAY_MS_ENV !== '') ? (int)$MAIL_DELAY_MS_ENV : 0;
if ($MAIL_DELAY_MS < 0) $MAIL_DELAY_MS = 0;
// Default delay ONLY on staging if not configured via env var
if ($MAIL_DELAY_MS === 0) {
  $scriptNameForEnv = str_replace('\\', '/', (string)($_SERVER['SCRIPT_NAME'] ?? ''));
  if (strpos($scriptNameForEnv, '/staging/') !== false) {
    $MAIL_DELAY_MS = 8000;
  }
}

// Staging helpers:
// - ROURE_SEND_CLIENT_EMAIL=0 to disable client confirmations (team email still sent)
// - ROURE_CLIENT_EMAIL_OVERRIDE=test@example.com to force all client confirmations to a fixed address
$SEND_CLIENT_EMAIL = getenv('ROURE_SEND_CLIENT_EMAIL');
$SEND_CLIENT_EMAIL = ($SEND_CLIENT_EMAIL === false || $SEND_CLIENT_EMAIL === '' || $SEND_CLIENT_EMAIL === '1' || strtolower((string)$SEND_CLIENT_EMAIL) === 'true');
$CLIENT_EMAIL_OVERRIDE = trim((string)(getenv('ROURE_CLIENT_EMAIL_OVERRIDE') ?: ''));

// Backup TXT directory (PERSISTENT).
//
// IMPORTANT (deploy-safe):
// - Prefer a directory OUTSIDE your deploy folder.
// - If ROURE_DATA_DIR is not set, we try these fallbacks (first match wins):
//   - ../private_html/roure-data   (common on hosted VPS/cPanel: ~/private_html)
//   - ../_private                 (sibling to site root)
$DATA_DIR = getenv('ROURE_DATA_DIR') ?: '';
$siteRoot = rtrim(dirname(__DIR__), DIRECTORY_SEPARATOR);
$candidate1 = $siteRoot . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'private_html' . DIRECTORY_SEPARATOR . 'roure-data';
$candidate2 = $siteRoot . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '_private';

// Prefer a truly non-public directory (../_private) unless ../private_html/roure-data already exists.
// This avoids accidentally creating secrets in a web-accessible folder on misconfigured hosts.
$PRIVATE_DIR = $DATA_DIR !== '' ? rtrim($DATA_DIR, DIRECTORY_SEPARATOR) : (
  (is_dir($candidate1) ? (realpath($candidate1) ?: $candidate1) : null) ?:
  (is_dir($candidate2) ? (realpath($candidate2) ?: $candidate2) : $candidate2)
);

$BACKUP_TXT_PATH = $PRIVATE_DIR . DIRECTORY_SEPARATOR . 'intake-request.txt';

// HTML templates (served from /emails/* for images)
$TEMPLATE_CLIENT = __DIR__ . DIRECTORY_SEPARATOR . 'emails' . DIRECTORY_SEPARATOR . 'intake-confirmation.html';
$TEMPLATE_TEAM = __DIR__ . DIRECTORY_SEPARATOR . 'emails' . DIRECTORY_SEPARATOR . 'new-intake-request.html';

// SMTP (recommended). Do NOT hardcode passwords in this repo.
// Set these as environment variables on the server:
// - ROURE_SMTP_HOST=mail.roure.nl
// - ROURE_SMTP_PORT=587
// - ROURE_SMTP_USER=info@roure.nl
// - ROURE_SMTP_PASSWORD=********
$SMTP_HOST = getenv('ROURE_SMTP_HOST') ?: 'mail.roure.nl';
$SMTP_PORT = (int)(getenv('ROURE_SMTP_PORT') ?: '587');
$SMTP_USER = getenv('ROURE_SMTP_USER') ?: 'info@roure.nl';
$SMTP_PASSWORD = getenv('ROURE_SMTP_PASSWORD') ?: '';
// Envelope-from (Return-Path) for SMTP. Some servers require it to match the authenticated user.
// If not set, we default to the SMTP user (or FROM_EMAIL).
$SMTP_ENVELOPE_FROM = getenv('ROURE_SMTP_ENVELOPE_FROM') ?: ($SMTP_USER !== '' ? $SMTP_USER : $FROM_EMAIL);

// Optional secret file fallback (recommended on VPS):
// Create: ../_private/smtp.ini (chmod 600)
// Example contents:
// host=mail.roure.nl
// port=587
// user=info@roure.nl
// password=YOUR_PASSWORD
$SMTP_INI_CANDIDATES = [];
$SMTP_INI_CANDIDATES[] = $PRIVATE_DIR . DIRECTORY_SEPARATOR . 'smtp.ini';
// Also support ~/smtp.ini (your current setup)
$homeDir = getenv('HOME') ?: '';
if ($homeDir !== '') {
  $SMTP_INI_CANDIDATES[] = rtrim($homeDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'smtp.ini';
}

$SMTP_PASSWORD_SOURCE = ($SMTP_PASSWORD !== '') ? 'env' : 'none';
$SMTP_INI_USED = null;
if ($SMTP_PASSWORD === '') {
  foreach ($SMTP_INI_CANDIDATES as $iniPath) {
    if (!is_string($iniPath) || $iniPath === '' || !is_file($iniPath)) continue;
    $ini = @parse_ini_file($iniPath, false, INI_SCANNER_RAW);
    if (!is_array($ini)) continue;
    $SMTP_HOST = isset($ini['host']) ? str_val($ini['host']) : $SMTP_HOST;
    $SMTP_PORT = isset($ini['port']) ? (int)str_val($ini['port']) : $SMTP_PORT;
    $SMTP_USER = isset($ini['user']) ? str_val($ini['user']) : $SMTP_USER;
    $SMTP_PASSWORD = isset($ini['password']) ? str_val($ini['password']) : $SMTP_PASSWORD;
    if ($SMTP_PASSWORD !== '') {
      $SMTP_PASSWORD_SOURCE = 'ini';
      $SMTP_INI_USED = $iniPath;
      break;
    }
  }
}

// -----------------------------
// Helpers
// -----------------------------
function read_json_body(): array {
  $raw = file_get_contents('php://input');
  if (!is_string($raw) || trim($raw) === '') return [];
  $decoded = json_decode($raw, true);
  return is_array($decoded) ? $decoded : [];
}

function str_val($v): string {
  if ($v === null) return '';
  if (is_string($v)) return trim($v);
  if (is_bool($v)) return $v ? 'true' : 'false';
  if (is_numeric($v)) return (string)$v;
  return '';
}

function bool_val($v): bool {
  if (is_bool($v)) return $v;
  if (is_numeric($v)) return ((int)$v) === 1;
  if (is_string($v)) {
    $s = strtolower(trim($v));
    return in_array($s, ['1', 'true', 'yes', 'y', 'on'], true);
  }
  return false;
}

function safe_line(string $s): string {
  // Keep backup file one-line-per-entry
  $s = str_replace(["\r", "\n", "\t"], [' ', ' ', ' '], $s);
  return trim($s);
}

function csv_escape(string $v): string {
  // RFC4180-ish
  $v = str_replace(["\r", "\n"], [' ', ' '], $v);
  $needsQuotes = str_contains($v, ',') || str_contains($v, '"');
  $v = str_replace('"', '""', $v);
  return $needsQuotes ? "\"{$v}\"" : $v;
}

function utf8_subject(string $subject): string {
  if (function_exists('mb_encode_mimeheader')) {
    return mb_encode_mimeheader($subject, 'UTF-8');
  }
  return $subject;
}

function make_message_id(string $domain): string {
  $domain = trim($domain);
  if ($domain === '') $domain = 'localhost';
  try {
    $rand = bin2hex(random_bytes(16));
  } catch (Throwable $e) {
    $rand = bin2hex((string)mt_rand()) . bin2hex((string)microtime(true));
  }
  return '<' . $rand . '.' . gmdate('YmdHis') . '@' . $domain . '>';
}

function log_mail_event(string $privateDir, array $event): void {
  try {
    if (!is_dir($privateDir)) return;
    $path = rtrim($privateDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'intake-mail-log.jsonl';
    $line = json_encode($event, JSON_UNESCAPED_SLASHES) . "\n";
    @file_put_contents($path, $line, FILE_APPEND | LOCK_EX);
  } catch (Throwable $e) {
    // ignore
  }
}

function send_mail_utf8(string $to, string $subject, string $body, array $headers): bool {
  $headerLines = [];
  foreach ($headers as $k => $v) {
    $headerLines[] = $k . ': ' . $v;
  }
  $headersStr = implode("\r\n", $headerLines);
  return @mail($to, utf8_subject($subject), $body, $headersStr);
}

function smtp_read($fp): string {
  $data = '';
  while (!feof($fp)) {
    $line = fgets($fp, 515);
    if ($line === false) break;
    $data .= $line;
    // multi-line replies have 3-digit code + '-' until final line with space
    if (preg_match('/^\d{3} /', $line)) break;
  }
  return $data;
}

function smtp_expect_ok($fp, string $cmd, array $okCodes, ?string &$respOut = null): bool {
  fwrite($fp, $cmd . "\r\n");
  $resp = smtp_read($fp);
  $respOut = $resp;
  if (!preg_match('/^(\d{3})/m', $resp, $m)) return false;
  $code = (int)$m[1];
  return in_array($code, $okCodes, true);
}

function smtp_send_mail(string $host, int $port, string $user, string $pass, string $from, array $toList, string $subject, string $body, array $headers, string $ehloName = 'localhost', ?string &$dataAcceptedResp = null): bool {
  $timeout = 20;
  $fp = @stream_socket_client("tcp://{$host}:{$port}", $errno, $errstr, $timeout);
  if (!$fp) return false;
  stream_set_timeout($fp, $timeout);

  $greet = smtp_read($fp);
  if (!preg_match('/^220/m', $greet)) { fclose($fp); return false; }

  if (!smtp_expect_ok($fp, "EHLO {$ehloName}", [250])) { fclose($fp); return false; }

  // STARTTLS on 587
  if (!smtp_expect_ok($fp, "STARTTLS", [220])) { fclose($fp); return false; }
  if (!@stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) { fclose($fp); return false; }
  if (!smtp_expect_ok($fp, "EHLO {$ehloName}", [250])) { fclose($fp); return false; }

  if ($pass === '') { fclose($fp); return false; }
  if (!smtp_expect_ok($fp, "AUTH LOGIN", [334])) { fclose($fp); return false; }
  if (!smtp_expect_ok($fp, base64_encode($user), [334])) { fclose($fp); return false; }
  if (!smtp_expect_ok($fp, base64_encode($pass), [235])) { fclose($fp); return false; }

  if (!smtp_expect_ok($fp, "MAIL FROM:<{$from}>", [250])) { fclose($fp); return false; }
  foreach ($toList as $rcpt) {
    if (!smtp_expect_ok($fp, "RCPT TO:<{$rcpt}>", [250, 251])) { fclose($fp); return false; }
  }
  if (!smtp_expect_ok($fp, "DATA", [354])) { fclose($fp); return false; }

  // Build headers for DATA
  $dataHeaderLines = [];
  foreach ($headers as $k => $v) {
    $dataHeaderLines[] = $k . ': ' . $v;
  }
  // Ensure To/Subject exist in DATA
  $dataHeaderLines[] = 'To: ' . implode(', ', $toList);
  $dataHeaderLines[] = 'Subject: ' . utf8_subject($subject);

  $data = implode("\r\n", $dataHeaderLines) . "\r\n\r\n";
  $data .= $body;
  $data = str_replace(["\r\n.\r\n", "\n.\n"], ["\r\n..\r\n", "\n..\n"], $data);
  $data .= "\r\n.\r\n";

  fwrite($fp, $data);
  $resp = smtp_read($fp);
  $dataAcceptedResp = $resp;
  if (!preg_match('/^250/m', $resp)) { fclose($fp); return false; }

  smtp_expect_ok($fp, "QUIT", [221]);
  fclose($fp);
  return true;
}

function render_template(string $path, array $vars): ?string {
  if (!is_file($path)) return null;
  $tpl = @file_get_contents($path);
  if (!is_string($tpl) || $tpl === '') return null;
  foreach ($vars as $k => $v) {
    $tpl = str_replace('{{' . $k . '}}', (string)$v, $tpl);
  }
  return $tpl;
}

function plan_label(string $value): string {
  $map = [
    'duo-buddy' => 'Duo / Buddy',
    'solo-standard' => 'Solo Standard',
    'long-term' => 'Long-Term',
    'not-sure' => 'Not sure yet',
    '' => 'Not specified',
  ];
  return $map[$value] ?? $value;
}

function program_label(string $value): string {
  $map = [
    'weight-loss-muscle-mass' => 'Weight loss & muscle mass',
    'peak-performance' => 'Peak performance',
    'vitality-longevity' => 'Vitality & longevity',
    'prenatal-postpartum' => 'Prenatal & postpartum',
    'not-sure' => 'Not sure yet',
    '' => 'Not specified',
  ];
  return $map[$value] ?? $value;
}

function goal_label(string $value): string {
  $map = [
    'improve-health' => 'Improve my overall health',
    'increase-flexibility' => 'Increase flexibility',
    'improve-posture' => 'Improve posture',
    'get-stronger' => 'Get stronger',
    'feel-confident' => 'Feel more confident / improve my appearance',
    'tone-shape' => 'Tone and shape my body',
    'lose-weight' => 'Lose weight',
    'other' => 'Other',
  ];
  return $map[$value] ?? $value;
}

// -----------------------------
// Parse input (JSON or POST)
// -----------------------------
$contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
$data = [];
if (str_contains($contentType, 'application/json')) {
  $data = read_json_body();
} else {
  $data = $_POST;
}
if (!is_array($data)) $data = [];

// Support nested IntakeFormSubmission payload
$clientDetails = is_array($data['clientDetails'] ?? null) ? $data['clientDetails'] : null;
$intakeInfo = is_array($data['intakeInformation'] ?? null) ? $data['intakeInformation'] : null;

$firstName = str_val(($clientDetails['firstName'] ?? null) ?? ($data['firstName'] ?? ''));
$lastName = str_val(($clientDetails['lastName'] ?? null) ?? ($data['lastName'] ?? ''));
$phoneNumber = str_val(($clientDetails['phoneNumber'] ?? null) ?? ($data['phoneNumber'] ?? ''));
$email = str_val(($clientDetails['email'] ?? null) ?? ($data['email'] ?? ''));

// Allow overriding client recipient in staging / tests
$originalClientEmail = $email;
if ($CLIENT_EMAIL_OVERRIDE !== '') {
  $email = $CLIENT_EMAIL_OVERRIDE;
}

$plan = str_val(($intakeInfo['interestedPlan'] ?? null) ?? ($data['plan'] ?? ''));
$program = str_val(($intakeInfo['interestedProgram'] ?? null) ?? ($data['program'] ?? ''));

$goals = $data['goals'] ?? [];
if (is_string($goals)) $goals = [$goals];
if (!is_array($goals)) $goals = [];
$goals = array_values(array_filter(array_map(fn($g) => str_val($g), $goals), fn($g) => $g !== ''));

$questions = str_val(($data['additionalNotes'] ?? null) ?? ($data['questions'] ?? ''));
$receiveCommunications = bool_val(($data['receiveCommunications'] ?? null) ?? false);

// Honeypot
$website = str_val($data['website'] ?? '');
if ($website !== '') {
  // Pretend success for bots
  echo json_encode(['ok' => true]);
  exit;
}

// Basic validation
if ($firstName === '' || $lastName === '' || $phoneNumber === '' || $email === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Missing required fields']);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Invalid email']);
  exit;
}

$fullName = trim($firstName . ' ' . $lastName);
$ip = str_val($_SERVER['REMOTE_ADDR'] ?? '');
$userAgent = str_val($_SERVER['HTTP_USER_AGENT'] ?? '');
$submittedAt = str_val(($data['metadata']['submittedAt'] ?? null) ?? '') ?: gmdate('c');

$planLabel = plan_label($plan);
$programLabel = program_label($program);
$goalLabels = array_map('goal_label', $goals);

// Build a base URL that works in both / and /staging/
$host = str_val($_SERVER['HTTP_HOST'] ?? '');
$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
$scheme = $https ? 'https' : 'http';
$scriptName = str_replace('\\', '/', str_val($_SERVER['SCRIPT_NAME'] ?? '/form.php'));
$basePath = rtrim(str_replace('\\', '/', dirname($scriptName)), '/');
$publicBaseUrl = ($host !== '') ? ($scheme . '://' . $host . $basePath) : '';

// -----------------------------
// Backup TXT (CSV, one client per line)
// -----------------------------

$backupWritten = false;
try {
  if (!is_dir($PRIVATE_DIR)) {
    @mkdir($PRIVATE_DIR, 0755, true);
  }

  $header = 'submittedAt,name,email,phoneNumber,planValue,planLabel,programValue,programLabel,goalsValues,goalsLabels,additionalNotes,receiveCommunications,ip,userAgent' . "\n";
  if (!file_exists($BACKUP_TXT_PATH)) {
    @file_put_contents($BACKUP_TXT_PATH, $header, LOCK_EX);
  }

  $lineParts = [
    $submittedAt,
    $fullName,
    $email,
    $phoneNumber,
    $plan,
    $planLabel,
    $program,
    $programLabel,
    implode('|', $goals),
    implode('|', $goalLabels),
    $questions,
    $receiveCommunications ? 'true' : 'false',
    $ip,
    $userAgent,
  ];

  $csvLine = implode(',', array_map('csv_escape', $lineParts)) . "\n";
  $ok = @file_put_contents($BACKUP_TXT_PATH, $csvLine, FILE_APPEND | LOCK_EX);
  $backupWritten = ($ok !== false);
} catch (Throwable $e) {
  // Do not fail the request if backup fails
}

// -----------------------------
// Email to team
// -----------------------------
$teamTo = implode(',', $TEAM_RECIPIENTS);
$teamSubject = "New intake submission: {$fullName}";
$teamVars = [
  'heroImageUrl' => $publicBaseUrl !== '' ? ($publicBaseUrl . '/emails/hero-new-intake-request.jpg') : '',
  'clientName' => $fullName,
  'firstName' => $firstName,
  'lastName' => $lastName,
  'phoneNumber' => $phoneNumber,
  'email' => $email,
  'planLabel' => $planLabel,
  'programLabel' => $programLabel,
  'goalsList' => count($goalLabels) ? implode(', ', $goalLabels) : 'No goals selected.',
  'additionalNotes' => $questions !== '' ? $questions : 'No additional notes provided.',
  'submittedAt' => $submittedAt,
  'ip' => $ip,
  'userAgent' => $userAgent,
];
$teamBody = render_template($TEMPLATE_TEAM, $teamVars);
if ($teamBody === null) {
  $teamBodyLines = [
    "New intake submission received.",
    "",
    "Name: {$fullName}",
    "Email: {$email}",
    "Phone: {$phoneNumber}",
    "Plan: {$planLabel}",
    "Program: {$programLabel}",
    "Goals: " . (count($goalLabels) ? implode(', ', $goalLabels) : '(none selected)'),
    "Questions: " . ($questions !== '' ? $questions : '(none)'),
    "Receive other communications: " . ($receiveCommunications ? 'Yes' : 'No'),
    "",
    "Meta:",
    "Submitted (UTC): {$submittedAt}",
    "IP: {$ip}",
    "User-Agent: {$userAgent}",
  ];
  $teamBody = implode("\r\n", $teamBodyLines);
}

$commonHeaders = [
  'MIME-Version' => '1.0',
  'Content-Type' => (str_contains($teamBody, '<html') ? 'text/html; charset=UTF-8' : 'text/plain; charset=UTF-8'),
  'From' => "{$FROM_NAME} <{$FROM_EMAIL}>",
];

// So the team can reply directly to the client
$teamMessageId = make_message_id($host !== '' ? $host : 'roure.nl');
$teamHeaders = $commonHeaders + [
  'Reply-To' => "{$fullName} <{$email}>",
  'Date' => gmdate('D, d M Y H:i:s \G\M\T'),
  'Message-ID' => $teamMessageId,
];

// Prefer SMTP if configured
$teamRecipients = array_values(array_filter(array_map('trim', explode(',', $teamTo)), fn($x) => $x !== ''));
$teamSent = false;
$teamTransport = 'none';
$teamSmtpDataResp = null;
if ($SMTP_PASSWORD !== '') {
  $teamSent = smtp_send_mail(
    $SMTP_HOST,
    $SMTP_PORT,
    $SMTP_USER,
    $SMTP_PASSWORD,
    $SMTP_ENVELOPE_FROM,
    $teamRecipients,
    $teamSubject,
    $teamBody,
    $teamHeaders,
    ($host !== '' ? $host : 'rourepersonaltraining.nl'),
    $teamSmtpDataResp
  );
  $teamTransport = 'smtp';
}
if (!$teamSent) {
  $teamSent = send_mail_utf8($teamTo, $teamSubject, $teamBody, $teamHeaders);
  $teamTransport = 'mail';
}
log_mail_event($PRIVATE_DIR, [
  'ts' => gmdate('c'),
  'kind' => 'team',
  'to' => $teamRecipients,
  'subject' => $teamSubject,
  'messageId' => $teamMessageId,
  'smtpConfigured' => ($SMTP_PASSWORD !== ''),
  'smtpPasswordSource' => $SMTP_PASSWORD_SOURCE,
  'smtpIniUsed' => $SMTP_INI_USED,
  'transport' => $teamTransport,
  'sent' => $teamSent,
  'smtpDataResp' => is_string($teamSmtpDataResp) ? trim($teamSmtpDataResp) : null,
]);

// Optional pause before sending the client confirmation email
if ($MAIL_DELAY_MS > 0) {
  usleep($MAIL_DELAY_MS * 1000);
}

// -----------------------------
// Confirmation email to client
// -----------------------------
$clientAttempted = false;
$clientSubject = 'We received your intake request';
$clientVars = [
  'heroImageUrl' => $publicBaseUrl !== '' ? ($publicBaseUrl . '/emails/hero-intake-confirmation.jpg') : '',
  'firstName' => $firstName,
  'clientName' => $fullName,
  'phoneNumber' => $phoneNumber,
  'email' => $email,
  'planLabel' => $planLabel,
  'programLabel' => $programLabel,
  'goalsList' => count($goalLabels) ? implode(', ', $goalLabels) : 'No goals selected.',
  'faqUrl' => $publicBaseUrl !== '' ? ($publicBaseUrl . '/faq') : '#',
];
$clientBody = render_template($TEMPLATE_CLIENT, $clientVars);
if ($clientBody === null) {
  $clientBodyLines = [
    "Hi {$firstName},",
    "",
    "Thanks for booking your intake session with Roure Personal Training.",
    "We received your request and our team will get back to you soon.",
    "",
    "Summary:",
    "Name: {$fullName}",
    "Email: {$email}",
    "Phone: {$phoneNumber}",
    "Plan: {$planLabel}",
    "Program: {$programLabel}",
    "Goals: " . (count($goalLabels) ? implode(', ', $goalLabels) : '(none selected)'),
    "Questions: " . ($questions !== '' ? $questions : '(none)'),
    "",
    "If any of this is incorrect, just reply to this email and let us know.",
    "",
    "Best regards,",
    "Roure Personal Training",
  ];
  $clientBody = implode("\r\n", $clientBodyLines);
}

$clientMessageId = make_message_id($host !== '' ? $host : 'roure.nl');
$clientHeaders = $commonHeaders + [
  'Reply-To' => $teamTo,
  'Content-Type' => (str_contains($clientBody, '<html') ? 'text/html; charset=UTF-8' : 'text/plain; charset=UTF-8'),
  'Date' => gmdate('D, d M Y H:i:s \G\M\T'),
  'Message-ID' => $clientMessageId,
];

$clientRecipients = array_values(array_filter([$email], fn($x) => trim((string)$x) !== ''));

$clientSent = false;
$clientTransport = 'none';
$clientSmtpDataResp = null;
if ($SEND_CLIENT_EMAIL && count($clientRecipients) > 0) {
  $clientAttempted = true;
  if ($SMTP_PASSWORD !== '') {
    $clientSent = smtp_send_mail(
      $SMTP_HOST,
      $SMTP_PORT,
      $SMTP_USER,
      $SMTP_PASSWORD,
      $SMTP_ENVELOPE_FROM,
      $clientRecipients,
      $clientSubject,
      $clientBody,
      $clientHeaders,
      ($host !== '' ? $host : 'rourepersonaltraining.nl'),
      $clientSmtpDataResp
    );
    $clientTransport = 'smtp';
  }
  if (!$clientSent) {
    $clientSent = send_mail_utf8($email, $clientSubject, $clientBody, $clientHeaders);
    $clientTransport = 'mail';
  }
}
log_mail_event($PRIVATE_DIR, [
  'ts' => gmdate('c'),
  'kind' => 'client',
  'to' => $clientRecipients,
  'subject' => $clientSubject,
  'messageId' => $clientMessageId,
  'smtpConfigured' => ($SMTP_PASSWORD !== ''),
  'smtpPasswordSource' => $SMTP_PASSWORD_SOURCE,
  'smtpIniUsed' => $SMTP_INI_USED,
  'transport' => $clientTransport,
  'sent' => $clientSent,
  'attempted' => $clientAttempted,
  'smtpDataResp' => is_string($clientSmtpDataResp) ? trim($clientSmtpDataResp) : null,
]);

// Success criteria: we need at least ONE durable channel (team email OR backup file).
// Client email is "nice to have" but not required for ok=true.
$ok = ($teamSent || $backupWritten);

if (!$ok) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Could not send email or write backup']);
  exit;
}

echo json_encode([
  'ok' => true,
  'backupWritten' => $backupWritten,
  'teamEmailSent' => $teamSent,
  'clientEmailSent' => $clientSent,
  'clientEmailAttempted' => $clientAttempted,
  'teamTransport' => $teamTransport,
  'clientTransport' => $clientTransport,
  'teamMessageId' => $teamMessageId,
  'clientMessageId' => $clientMessageId,
  'teamSmtpDataResp' => is_string($teamSmtpDataResp) ? trim($teamSmtpDataResp) : null,
  'clientSmtpDataResp' => is_string($clientSmtpDataResp) ? trim($clientSmtpDataResp) : null
]);


