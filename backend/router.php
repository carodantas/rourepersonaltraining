<?php
// Router for PHP built-in server — mirrors backend/.htaccess (serve files if present, else index.php).
// From backend/: php -S localhost:8000 router.php

if (!function_exists('php_sapi_name') || php_sapi_name() !== 'cli-server') {
  http_response_code(403);
  echo 'Forbidden';
  exit;
}

$uri = isset($_SERVER['REQUEST_URI']) ? (string)$_SERVER['REQUEST_URI'] : '/';
$path = parse_url($uri, PHP_URL_PATH);
if (!is_string($path) || $path === '') {
  $path = '/';
}
$path = urldecode($path);

$file = __DIR__ . $path;
if ($path !== '/' && is_file($file)) {
  return false;
}

require __DIR__ . DIRECTORY_SEPARATOR . 'index.php';
