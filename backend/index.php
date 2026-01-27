<?php
// Compatible with older PHP runtimes (no scalar type hints / return types).

// Minimal PHP backend under /api/ (also supports /staging/api/)
// Public:
//   GET  /content.json
//   GET  /uploads/<file>
// Admin (session required):
//   POST /admin/login
//   POST /admin/logout
//   GET  /admin/content
//   PUT  /admin/content
//   POST /admin/upload

session_name('admin');
$reqUri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$reqPathForMount = parse_url($reqUri, PHP_URL_PATH);
if (!is_string($reqPathForMount) || $reqPathForMount === '') $reqPathForMount = '/';

// Detect where this API is mounted:
// - production: /api
// - staging: /staging/api
$mountPrefix = '/api';
if (substr($reqPathForMount, 0, 12) === '/staging/api') {
  $mountPrefix = '/staging/api';
} elseif (substr($reqPathForMount, 0, 4) === '/api') {
  $mountPrefix = '/api';
} else {
  // fallback if routed unexpectedly
  $mountPrefix = '/';
}
$GLOBALS['MOUNT_PREFIX'] = $mountPrefix;

$cookiePath = $mountPrefix;
$secureCookie = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
// session_set_cookie_params(lifetime, path, domain, secure, httponly)
session_set_cookie_params(0, $cookiePath, '', $secureCookie, true);
session_start();

header('X-Content-Type-Options: nosniff');

// -----------------------------
// CORS (for separate frontend domains)
// -----------------------------
// Allows the dashboard/site to call the API at https://api.vistabela.fraiptech.com.br
// while keeping credentials (cookies) working.
//
// Configure via env: CORS_ORIGINS="https://painel.example.com,https://site.example.com"
$origin = isset($_SERVER['HTTP_ORIGIN']) ? (string)$_SERVER['HTTP_ORIGIN'] : '';
$corsEnv = getenv('CORS_ORIGINS');
$allowedOrigins = array(
  'https://painel.vistabela.fraiptech.com.br',
  'https://vistabela.fraiptech.com.br'
);
if (is_string($corsEnv) && trim($corsEnv) !== '') {
  $allowedOrigins = array();
  $parts = explode(',', $corsEnv);
  foreach ($parts as $p) {
    $p = trim((string)$p);
    if ($p !== '') $allowedOrigins[] = $p;
  }
}

if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
  header('Access-Control-Max-Age: 600');
}

// Reply to CORS preflight requests early
if (isset($_SERVER['REQUEST_METHOD']) && strtoupper((string)$_SERVER['REQUEST_METHOD']) === 'OPTIONS') {
  http_response_code(204);
  exit;
}

$baseDir = __DIR__;

// Default locations (portable):
// - content lives in the domain "_private" folder:
//   - production: content.json
//   - staging:   content-staging.json
// - uploads live in the domain "images" folder (outside public_html), per hosting layout
$domainRoot = null;
{
  // Find domain root by walking up until we see both "public_html" and "_private".
  // Examples:
  // - prod API:    .../public_html/api        -> domain root is .../
  // - staging API: .../public_html/staging/api -> domain root is .../
  $cursor = $baseDir;
  for ($i = 0; $i < 8; $i++) {
    $candidate = realpath($cursor);
    if ($candidate !== false && is_dir($candidate)) {
      if (is_dir($candidate . DIRECTORY_SEPARATOR . 'public_html') && is_dir($candidate . DIRECTORY_SEPARATOR . '_private')) {
        $domainRoot = $candidate;
        break;
      }
    }
    $parent = dirname($cursor);
    if (!is_string($parent) || $parent === '' || $parent === $cursor) break;
    $cursor = $parent;
  }

  // Fallback: previous heuristic (may point to public_html/staging in some layouts)
  if ($domainRoot === null) {
    $fallback = realpath($baseDir . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..');
    if ($fallback !== false && is_dir($fallback)) $domainRoot = $fallback;
  }
  if ($domainRoot === null) {
    $domainRoot = dirname(dirname($baseDir));
  }
}

$isStaging = isset($GLOBALS['HOTEL_MOUNT_PREFIX']) && $GLOBALS['HOTEL_MOUNT_PREFIX'] === '/staging/api';

$privateDir = $domainRoot . DIRECTORY_SEPARATOR . '_private';
$contentPath = $privateDir . DIRECTORY_SEPARATOR . ($isStaging ? 'content-staging.json' : 'content.json');

// Keep admin users isolated too (recommended)
$usersPath = $privateDir . DIRECTORY_SEPARATOR . ($isStaging ? 'users-staging.json' : 'users.json');

$uploadsDir = $domainRoot . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . ($isStaging ? 'uploads-staging' : 'uploads');

// Optional shared storage under ../midias/site (recommended for production)
// - uploads: store images in a persistent shared folder
// - users.json: allow nginx to block direct access while API can still read it from disk
$sharedDir = $baseDir . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'midias' . DIRECTORY_SEPARATOR . 'site';
$sharedDirReal = realpath($sharedDir);
if ($sharedDirReal !== false && is_dir($sharedDirReal)) {
  // Prefer shared storage when present
  $contentPath = $sharedDirReal . DIRECTORY_SEPARATOR . ($isStaging ? 'content-staging.json' : 'content.json');
  $usersPath = $sharedDirReal . DIRECTORY_SEPARATOR . ($isStaging ? 'users-staging.json' : 'users.json');

  // Uploads go into a dedicated folder (avoid exposing users/content via /api/uploads)
  $uploadsDir = $sharedDirReal . DIRECTORY_SEPARATOR . ($isStaging ? 'uploads-staging' : 'uploads');
}

// Explicit overrides (highest priority)
$envContent = getenv('CONTENT_PATH');
if (is_string($envContent) && trim($envContent) !== '') {
  $contentPath = $envContent;
}
$envUploads = getenv('UPLOADS_DIR');
if (is_string($envUploads) && trim($envUploads) !== '' && is_dir($envUploads)) {
  $uploadsDir = $envUploads;
}
$envUsers = getenv('USERS_PATH');
if (is_string($envUsers) && trim($envUsers) !== '') {
  $usersPath = $envUsers;
}

function starts_with($haystack, $prefix) {
  return is_string($haystack) && is_string($prefix) && substr($haystack, 0, strlen($prefix)) === $prefix;
}

function json_response($status, $data) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  exit;
}

function detect_public_base_url() {
  $env = getenv('PUBLIC_BASE_URL');
  if (is_string($env) && trim($env) !== '') {
    return rtrim(trim($env), '/');
  }

  $proto = 'http';
  if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
    $proto = (string)$_SERVER['HTTP_X_FORWARDED_PROTO'];
  } elseif (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
    $proto = 'https';
  }

  $host = '';
  if (!empty($_SERVER['HTTP_X_FORWARDED_HOST'])) {
    $host = (string)$_SERVER['HTTP_X_FORWARDED_HOST'];
  } elseif (!empty($_SERVER['HTTP_HOST'])) {
    $host = (string)$_SERVER['HTTP_HOST'];
  }
  $host = trim($host);
  if ($host === '') return '';

  return $proto . '://' . $host;
}

function read_json_file($path) {
  if (!file_exists($path)) return null;
  $raw = file_get_contents($path);
  if ($raw === false) return null;
  $data = json_decode($raw, true);
  if (!is_array($data)) return null;
  return $data;
}

function require_admin() {
  if (!isset($_SESSION['admin']) || $_SESSION['admin'] !== true) {
    json_response(401, array('error' => 'unauthorized'));
  }
}

function request_path() {
  $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
  $path = parse_url($uri, PHP_URL_PATH);
  if (!is_string($path)) return '/';

  $prefix = isset($GLOBALS['MOUNT_PREFIX']) && is_string($GLOBALS['MOUNT_PREFIX'])
    ? $GLOBALS['MOUNT_PREFIX']
    : '/api';
  $prefix = rtrim($prefix, '/');

  // If this script is mounted under /api or /staging/api, strip it when present.
  if ($prefix !== '' && $prefix !== '/' && starts_with($path, $prefix . '/')) {
    $path = substr($path, strlen($prefix));
  } elseif ($prefix !== '' && $prefix !== '/' && $path === $prefix) {
    $path = '/';
  }
  return $path;
}

function request_method() {
  $m = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
  return strtoupper($m);
}

function extract_upload_filename($urlOrPath) {
  if (!is_string($urlOrPath) || trim($urlOrPath) === '') return null;
  $p = parse_url($urlOrPath, PHP_URL_PATH);
  if (!is_string($p) || $p === '') $p = (string)$urlOrPath;

  // Accept:
  // - /api/uploads/<file>
  // - /staging/api/uploads/<file>
  // - /uploads/<file> (already stripped by router)
  $rel = null;
  if (starts_with($p, '/staging/api/uploads/')) {
    $rel = substr($p, strlen('/staging/api/uploads/'));
  } elseif (starts_with($p, '/api/uploads/')) {
    $rel = substr($p, strlen('/api/uploads/'));
  } elseif (starts_with($p, '/uploads/')) {
    $rel = substr($p, strlen('/uploads/'));
  }
  if (!is_string($rel) || $rel === '') return null;

  $rel = str_replace(array('\\', '..'), array('/', ''), $rel);
  $name = basename($rel);
  if (!is_string($name) || $name === '' || strpos($name, '/') !== false) return null;
  return $name;
}

function get_json_body() {
  $raw = file_get_contents('php://input');
  if ($raw === false) return array();
  $data = json_decode($raw, true);
  return is_array($data) ? $data : array();
}

function write_json_atomic($path, $data) {
  $dir = dirname($path);
  if (!is_dir($dir)) return false;
  $tmp = $path . '.tmp';
  $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  if ($json === false) return false;

  $fp = fopen($tmp, 'wb');
  if ($fp === false) return false;
  try {
    if (!flock($fp, LOCK_EX)) return false;
    if (fwrite($fp, $json) === false) return false;
    fflush($fp);
    flock($fp, LOCK_UN);
  } finally {
    fclose($fp);
  }
  return rename($tmp, $path);
}

function validate_content_schema($content) {
  $errors = array();

  // Blog CMS schema:
  // {
  //   meta?: { version?: number, updatedAt?: string },
  //   blog: {
  //     featuredPostSlug?: string,
  //     categories: array,
  //     posts: array
  //   }
  // }
  if (!array_key_exists('blog', $content) || !is_array($content['blog'])) {
    $errors[] = "missing_or_invalid:blog";
    return $errors;
  }
  $blog = $content['blog'];
  foreach (array('categories', 'posts') as $k) {
    if (!array_key_exists($k, $blog) || !is_array($blog[$k])) {
      $errors[] = "missing_or_invalid:blog.$k";
    }
  }

  return $errors;
}

function load_users($usersPath) {
  $data = read_json_file($usersPath);
  if (!is_array($data)) return array();
  $users = isset($data['users']) ? $data['users'] : null;
  return is_array($users) ? $users : array();
}

function ensure_users_store($usersPath) {
  $dir = dirname($usersPath);
  if (!is_dir($dir)) {
    @mkdir($dir, 0755, true);
  }
  if (!file_exists($usersPath)) {
    // Seed an empty users store when missing (supports prod + staging isolation).
    write_json_atomic($usersPath, array('users' => array()));
  }
}

function load_users_store($usersPath) {
  ensure_users_store($usersPath);
  $data = read_json_file($usersPath);
  if (!is_array($data)) $data = array();
  if (!isset($data['users']) || !is_array($data['users'])) $data['users'] = array();
  return $data;
}

function gen_user_id($existingIds) {
  $existing = is_array($existingIds) ? $existingIds : array();
  for ($i = 0; $i < 10; $i++) {
    $bytes = function_exists('random_bytes') ? random_bytes(8) : openssl_random_pseudo_bytes(8);
    if ($bytes === false) $bytes = uniqid('', true);
    $id = 'u_' . substr(bin2hex($bytes), 0, 16);
    if (!in_array($id, $existing, true)) return $id;
  }
  return 'u_' . substr(md5(uniqid('', true)), 0, 16);
}

function normalize_users_store($usersPath, $data) {
  if (!is_array($data)) $data = array('users' => array());
  if (!isset($data['users']) || !is_array($data['users'])) $data['users'] = array();

  $changed = false;
  $ids = array();
  foreach ($data['users'] as $u) {
    if (is_array($u) && isset($u['id']) && is_string($u['id']) && $u['id'] !== '') {
      $ids[] = $u['id'];
    }
  }

  foreach ($data['users'] as $idx => $u) {
    if (!is_array($u)) continue;

    if (!isset($u['id']) || !is_string($u['id']) || trim($u['id']) === '') {
      $u['id'] = gen_user_id($ids);
      $ids[] = $u['id'];
      $changed = true;
    }
    if (!array_key_exists('active', $u)) {
      $u['active'] = true;
      $changed = true;
    }
    if (!isset($u['role']) || !is_string($u['role']) || $u['role'] === '') {
      $u['role'] = 'admin';
      $changed = true;
    }
    if (!array_key_exists('name', $u)) {
      $u['name'] = '';
      $changed = true;
    }
    if (!isset($u['createdAt']) || !is_string($u['createdAt']) || $u['createdAt'] === '') {
      $u['createdAt'] = gmdate('c');
      $changed = true;
    }
    if (!isset($u['updatedAt']) || !is_string($u['updatedAt']) || $u['updatedAt'] === '') {
      $u['updatedAt'] = gmdate('c');
      $changed = true;
    }

    $data['users'][$idx] = $u;
  }

  if ($changed) {
    write_json_atomic($usersPath, $data);
  }
  return $data;
}

function safe_user($u) {
  if (!is_array($u)) return null;
  return array(
    'id' => isset($u['id']) ? $u['id'] : null,
    'username' => isset($u['username']) ? $u['username'] : null,
    'name' => isset($u['name']) ? $u['name'] : null,
    'role' => isset($u['role']) ? $u['role'] : null,
    'active' => array_key_exists('active', $u) ? $u['active'] : true,
    'createdAt' => isset($u['createdAt']) ? $u['createdAt'] : null,
    'updatedAt' => isset($u['updatedAt']) ? $u['updatedAt'] : null
  );
}

function verify_password_and_maybe_upgrade($user, $password, $usersPath) {
  // Allow either passwordHash (recommended) or password (plaintext, for bootstrap).
  $hash = isset($user['passwordHash']) ? $user['passwordHash'] : null;
  $plain = isset($user['password']) ? $user['password'] : null;

  $ok = false;
  if (is_string($hash) && $hash !== '') {
    $ok = password_verify($password, $hash);
  } elseif (is_string($plain) && $plain !== '') {
    $ok = hash_equals($plain, $password);
    // Upgrade to passwordHash on successful login
    if ($ok) {
      $user['passwordHash'] = password_hash($password, PASSWORD_DEFAULT);
      unset($user['password']);

      $data = read_json_file($usersPath);
      if (is_array($data) && isset($data['users']) && is_array($data['users'])) {
        foreach ($data['users'] as $idx => $u) {
          $uName = is_array($u) && isset($u['username']) ? $u['username'] : null;
          $meName = isset($user['username']) ? $user['username'] : null;
          if ($uName === $meName) {
            $data['users'][$idx] = $user;
            write_json_atomic($usersPath, $data);
            break;
          }
        }
      }
    }
  }
  return array('ok' => $ok, 'user' => $user);
}

$method = request_method();
$path = request_path();

// Block access to private folder even if webserver serves static
if (starts_with($path, '/private/')) {
  http_response_code(404);
  exit;
}

// Serve uploads when requests are routed through index.php (rewrite/router)
if ($method === 'GET' && starts_with($path, '/uploads/')) {
  $rel = substr($path, strlen('/uploads/'));
  $rel = str_replace(['..', '\\'], ['', '/'], $rel);
  $filePath = $uploadsDir . DIRECTORY_SEPARATOR . $rel;
  // Backward-compat: if uploadsDir is ".../midias/site/uploads" and file doesn't exist,
  // try legacy location ".../midias/site/<file>".
  if (!is_file($filePath)) {
    $parent = dirname($uploadsDir);
    if ($parent !== false && is_dir($parent)) {
      $legacy = $parent . DIRECTORY_SEPARATOR . $rel;
      if (is_file($legacy)) $filePath = $legacy;
    }
  }
  if (!is_file($filePath)) {
    http_response_code(404);
    exit;
  }
  $finfo = new finfo(FILEINFO_MIME_TYPE);
  $mime = $finfo->file($filePath);
  if (!is_string($mime) || $mime === '') $mime = 'application/octet-stream';
  header('Content-Type: ' . $mime);
  readfile($filePath);
  exit;
}

// Serve content.json as static-like
if ($method === 'GET' && ($path === '/content.json' || $path === '/content')) {
  if (!file_exists($contentPath)) {
    json_response(404, array('error' => 'content_not_found'));
  }
  header('Content-Type: application/json; charset=utf-8');
  readfile($contentPath);
  exit;
}

// Admin login/logout/content/upload
if (starts_with($path, '/admin/')) {
  if ($path === '/admin/login' && $method === 'POST') {
    $body = get_json_body();
    $usernameRaw = isset($body['username']) ? $body['username'] : null;
    $passwordRaw = isset($body['password']) ? $body['password'] : null;
    $username = is_string($usernameRaw) ? trim($usernameRaw) : '';
    $password = is_string($passwordRaw) ? (string)$passwordRaw : '';
    if ($username === '' || $password === '') {
      json_response(400, array('error' => 'missing_credentials'));
    }

    $store = normalize_users_store($usersPath, load_users_store($usersPath));
    $users = isset($store['users']) ? $store['users'] : array();
    foreach ($users as $idx => $u) {
      if (!is_array($u)) continue;
      $uName = isset($u['username']) ? $u['username'] : null;
      if ($uName !== $username) continue;
      if (array_key_exists('active', $u) && $u['active'] === false) {
        json_response(401, array('error' => 'invalid_credentials'));
      }
      if (isset($u['role']) && is_string($u['role']) && $u['role'] !== '' && $u['role'] !== 'admin') {
        json_response(401, array('error' => 'invalid_credentials'));
      }
      $user = $u;
      $res = verify_password_and_maybe_upgrade($user, $password, $usersPath);
      if (is_array($res) && !empty($res['ok'])) {
        $_SESSION['admin'] = true;
        $_SESSION['username'] = $username;
        // keep updated user (may have been upgraded from plaintext password)
        if (isset($res['user']) && is_array($res['user'])) {
          $user = $res['user'];
        }
        if (isset($user['id'])) $_SESSION['userId'] = $user['id'];
        if (isset($user['role'])) $_SESSION['role'] = $user['role'];
        json_response(200, array('ok' => true, 'username' => $username));
      }
      break;
    }
    json_response(401, array('error' => 'invalid_credentials'));
  }

  if ($path === '/admin/logout' && $method === 'POST') {
    $_SESSION = array();
    if (ini_get('session.use_cookies')) {
      $params = session_get_cookie_params();
      setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }
    session_destroy();
    json_response(200, array('ok' => true));
  }

  if ($path === '/admin/content' && $method === 'GET') {
    require_admin();
    $content = read_json_file($contentPath);
    if (!is_array($content)) {
      json_response(500, array('error' => 'content_invalid'));
    }
    json_response(200, $content);
  }

  if ($path === '/admin/content' && $method === 'PUT') {
    require_admin();
    $content = get_json_body();
    $errors = validate_content_schema($content);
    if (count($errors) > 0) {
      json_response(400, array('error' => 'invalid_schema', 'details' => $errors));
    }
    if (!isset($content['meta']) || !is_array($content['meta'])) $content['meta'] = array();
    $content['meta']['version'] = (int)(isset($content['meta']['version']) ? $content['meta']['version'] : 1);
    $content['meta']['updatedAt'] = gmdate('c');

    if (!write_json_atomic($contentPath, $content)) {
      json_response(500, array('error' => 'write_failed'));
    }
    json_response(200, array('ok' => true));
  }

  if ($path === '/admin/upload' && $method === 'POST') {
    require_admin();
    if (!isset($_FILES['file'])) {
      json_response(400, array('error' => 'missing_file'));
    }
    $file = $_FILES['file'];
    if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
      $code = isset($file['error']) ? $file['error'] : null;
      json_response(400, array('error' => 'upload_error', 'code' => $code));
    }
    $tmpName = isset($file['tmp_name']) ? $file['tmp_name'] : '';
    if (!is_string($tmpName) || $tmpName === '' || !is_uploaded_file($tmpName)) {
      json_response(400, array('error' => 'invalid_upload'));
    }
    $size = (int)(isset($file['size']) ? $file['size'] : 0);
    $maxBytes = 500 * 1024; // 500KB
    if ($size <= 0 || $size > $maxBytes) {
      json_response(400, array('error' => 'invalid_size', 'maxBytes' => $maxBytes));
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($tmpName);
    $allowed = array(
      'image/jpeg' => 'jpg',
      'image/png' => 'png',
      'image/webp' => 'webp',
      'image/gif' => 'gif'
    );
    if (!is_string($mime) || !array_key_exists($mime, $allowed)) {
      json_response(400, array('error' => 'invalid_type', 'mime' => $mime));
    }

    if (!is_dir($uploadsDir)) {
      mkdir($uploadsDir, 0755, true);
    }

    $ext = $allowed[$mime];
    $bytes = function_exists('random_bytes') ? random_bytes(16) : openssl_random_pseudo_bytes(16);
    if ($bytes === false) $bytes = uniqid('', true);
    $name = bin2hex($bytes) . '.' . $ext;
    $dest = $uploadsDir . DIRECTORY_SEPARATOR . $name;

    if (!move_uploaded_file($tmpName, $dest)) {
      json_response(500, array('error' => 'move_failed'));
    }

    $prefix = isset($GLOBALS['MOUNT_PREFIX']) && is_string($GLOBALS['MOUNT_PREFIX'])
      ? rtrim($GLOBALS['MOUNT_PREFIX'], '/')
      : '/api';
    if ($prefix === '') $prefix = '/api';

    $pathUrl = $prefix . '/uploads/' . $name;
    $base = detect_public_base_url();
    $publicUrl = ($base !== '') ? ($base . $pathUrl) : $pathUrl;
    json_response(200, array('ok' => true, 'url' => $publicUrl));
  }

  if ($path === '/admin/delete-upload' && $method === 'POST') {
    require_admin();
    $body = get_json_body();
    $urlRaw = isset($body['url']) ? $body['url'] : null;
    $name = extract_upload_filename(is_string($urlRaw) ? $urlRaw : '');
    if (!is_string($name) || $name === '') {
      json_response(400, array('error' => 'invalid_url'));
    }

    $filePath = $uploadsDir . DIRECTORY_SEPARATOR . $name;
    if (!is_file($filePath)) {
      json_response(404, array('error' => 'not_found'));
    }
    if (!@unlink($filePath)) {
      json_response(500, array('error' => 'delete_failed'));
    }
    json_response(200, array('ok' => true));
  }

  // Admin users CRUD
  if ($path === '/admin/users' && $method === 'GET') {
    require_admin();
    $store = normalize_users_store($usersPath, load_users_store($usersPath));
    $safe = array();
    foreach ($store['users'] as $u) {
      $s = safe_user($u);
      if (is_array($s)) $safe[] = $s;
    }
    json_response(200, array('users' => $safe));
  }

  if ($path === '/admin/users' && $method === 'POST') {
    require_admin();
    $store = normalize_users_store($usersPath, load_users_store($usersPath));
    $body = get_json_body();

    $usernameRaw = isset($body['username']) ? $body['username'] : null;
    $passwordRaw = isset($body['password']) ? $body['password'] : null;
    $nameRaw = isset($body['name']) ? $body['name'] : null;
    $activeRaw = array_key_exists('active', $body) ? $body['active'] : true;

    $username = is_string($usernameRaw) ? trim($usernameRaw) : '';
    $password = is_string($passwordRaw) ? (string)$passwordRaw : '';
    $name = is_string($nameRaw) ? trim($nameRaw) : '';
    $active = ($activeRaw === false) ? false : true;

    if ($username === '' || $password === '') {
      json_response(400, array('error' => 'missing_fields'));
    }
    if (strlen($password) < 6) {
      json_response(400, array('error' => 'weak_password'));
    }

    foreach ($store['users'] as $u) {
      if (!is_array($u)) continue;
      $uName = isset($u['username']) ? strtolower((string)$u['username']) : '';
      if ($uName !== '' && $uName === strtolower($username)) {
        json_response(400, array('error' => 'username_taken'));
      }
    }

    $existingIds = array();
    foreach ($store['users'] as $u) {
      if (is_array($u) && isset($u['id']) && is_string($u['id']) && $u['id'] !== '') $existingIds[] = $u['id'];
    }
    $id = gen_user_id($existingIds);
    $now = gmdate('c');
    $user = array(
      'id' => $id,
      'username' => $username,
      'name' => $name,
      'role' => 'admin',
      'active' => $active,
      'passwordHash' => password_hash($password, PASSWORD_DEFAULT),
      'createdAt' => $now,
      'updatedAt' => $now
    );
    $store['users'][] = $user;
    if (!write_json_atomic($usersPath, $store)) {
      json_response(500, array('error' => 'write_failed'));
    }
    json_response(200, array('ok' => true, 'user' => safe_user($user)));
  }

  // /admin/users/<id>
  if (preg_match('#^/admin/users/([^/]+)$#', $path, $m)) {
    require_admin();
    $userId = isset($m[1]) ? (string)$m[1] : '';
    $store = normalize_users_store($usersPath, load_users_store($usersPath));

    $idxFound = -1;
    $user = null;
    foreach ($store['users'] as $idx => $u) {
      if (!is_array($u)) continue;
      $id = isset($u['id']) ? (string)$u['id'] : '';
      if ($id === $userId) {
        $idxFound = $idx;
        $user = $u;
        break;
      }
    }
    if ($idxFound < 0 || !is_array($user)) {
      json_response(404, array('error' => 'user_not_found'));
    }

    if ($method === 'GET') {
      json_response(200, array('user' => safe_user($user)));
    }

    if ($method === 'PUT') {
      $body = get_json_body();
      $usernameRaw = isset($body['username']) ? $body['username'] : null;
      $nameRaw = isset($body['name']) ? $body['name'] : null;
      $activeRaw = array_key_exists('active', $body) ? $body['active'] : null;
      $passwordRaw = isset($body['password']) ? $body['password'] : null;

      $username = is_string($usernameRaw) ? trim($usernameRaw) : (isset($user['username']) ? (string)$user['username'] : '');
      $name = is_string($nameRaw) ? trim($nameRaw) : (isset($user['name']) ? (string)$user['name'] : '');
      $active = ($activeRaw === null) ? (array_key_exists('active', $user) ? ($user['active'] === false ? false : true) : true) : ($activeRaw === false ? false : true);
      $password = is_string($passwordRaw) ? (string)$passwordRaw : '';

      if ($username === '') {
        json_response(400, array('error' => 'missing_fields'));
      }

      foreach ($store['users'] as $u2) {
        if (!is_array($u2)) continue;
        $id2 = isset($u2['id']) ? (string)$u2['id'] : '';
        if ($id2 === $userId) continue;
        $uName2 = isset($u2['username']) ? strtolower((string)$u2['username']) : '';
        if ($uName2 !== '' && $uName2 === strtolower($username)) {
          json_response(400, array('error' => 'username_taken'));
        }
      }

      if ($password !== '' && strlen($password) < 6) {
        json_response(400, array('error' => 'weak_password'));
      }

      $user['username'] = $username;
      $user['name'] = $name;
      $user['active'] = $active;
      $user['updatedAt'] = gmdate('c');
      if ($password !== '') {
        $user['passwordHash'] = password_hash($password, PASSWORD_DEFAULT);
        if (isset($user['password'])) unset($user['password']);
      }

      $store['users'][$idxFound] = $user;
      if (!write_json_atomic($usersPath, $store)) {
        json_response(500, array('error' => 'write_failed'));
      }
      if (isset($_SESSION['userId']) && $_SESSION['userId'] === $userId) {
        $_SESSION['username'] = $username;
      }
      json_response(200, array('ok' => true, 'user' => safe_user($user)));
    }

    if ($method === 'DELETE') {
      if (isset($_SESSION['userId']) && $_SESSION['userId'] === $userId) {
        json_response(400, array('error' => 'cannot_delete_self'));
      }

      // prevent deleting last admin
      $adminCount = 0;
      foreach ($store['users'] as $u2) {
        if (!is_array($u2)) continue;
        $role = isset($u2['role']) ? (string)$u2['role'] : 'admin';
        $active = array_key_exists('active', $u2) ? ($u2['active'] === false ? false : true) : true;
        if ($role === 'admin' && $active) $adminCount++;
      }
      $roleMe = isset($user['role']) ? (string)$user['role'] : 'admin';
      $activeMe = array_key_exists('active', $user) ? ($user['active'] === false ? false : true) : true;
      if ($roleMe === 'admin' && $activeMe && $adminCount <= 1) {
        json_response(400, array('error' => 'cannot_delete_last_admin'));
      }

      array_splice($store['users'], $idxFound, 1);
      if (!write_json_atomic($usersPath, $store)) {
        json_response(500, array('error' => 'write_failed'));
      }
      json_response(200, array('ok' => true));
    }
  }

  json_response(404, array('error' => 'not_found'));
}

// Fallback
json_response(404, array('error' => 'not_found'));

