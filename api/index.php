<?php

declare(strict_types=1);
spl_autoload_register(function ($class) {
    require __DIR__ . "/src/$class.php";
});

header("Content-type: application/json; charset=UTF-8");

set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");

// REQUEST_URI: /fungi/api/{entity}/{id}, 3={entity}, 4={id}
$parts = explode("/", $_SERVER["REQUEST_URI"]);
$entity = $parts[3] ?? null;
$id = $parts[4] ?? null;

$database = new Database;
$router = new RootRouter($database);

$router->handleRequest($_SERVER["REQUEST_METHOD"], $entity, $id);
