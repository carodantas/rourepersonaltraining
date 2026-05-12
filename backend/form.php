<?php
// Local dev shim: Angular dev-servers proxy `/form.php` to the PHP CLI server (`backend/`),
// while the maintained handler stays in `roure/public/form.php`.
if (!function_exists('php_sapi_name') || php_sapi_name() !== 'cli-server') {
  http_response_code(403);
  echo 'Forbidden';
  exit;
}
$form = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'roure' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'form.php';
if (!is_file($form)) {
  http_response_code(503);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode(['ok' => false, 'error' => 'form_handler_missing'], JSON_UNESCAPED_UNICODE);
  exit;
}
require $form;
