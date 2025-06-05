<?php

declare(strict_types=1);
spl_autoload_register(function ($class) {
    require __DIR__ . "/src/$class.php";
});

header("Content-type: application/json; charset=UTF-8");

set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");

$parts = explode("/", $_SERVER["REQUEST_URI"]);
$entity = $parts[1] ?? null;
$id = $parts[2] ?? null;

$database = new Database;
$router = new RootRouter($database);

$router->handleRequest($_SERVER["REQUEST_METHOD"], $entity, $id);
