<?php

class RootRouter
{
    private $allowedServerNames = array("localhost", "havis.org", "www.havis.org");

    private ArticlesController $articlesController;
    private SpeciesController $speciesController;

    public function __construct(Database $database)
    {
        $this->articlesController = new ArticlesController($database);
        $this->speciesController = new SpeciesController($database);
    }

    public function handleRequest(string $method, string $entity, ?string $id = null): void
    {
        $origin = $this->getOrigin();

        switch ($method) {
            case "GET":
                switch ($entity) {
                    case "articles":
                        header("Access-Control-Allow-Origin: $origin");
                        $this->articlesController->handleRequest($id);
                        return;
                    case "species":
                        header("Access-Control-Allow-Origin: $origin");
                        $this->speciesController->handleRequest($id);
                        return;
                    default:
                        http_response_code(404);
                        return;
                }
            default:
                http_response_code(405);
                header("Allowed: GET");
        }
    }

    private function getOrigin(): string|null
    {
        $server = $_SERVER["SERVER_NAME"];
        if ($server === "localhost") {
            return "*";
        }

        if (!in_array($server, $this->allowedServerNames)) {
            return null;
        }

        $scheme = $_SERVER['REQUEST_SCHEME'];
        $port = $_SERVER['SERVER_PORT'] ? ":" . $_SERVER['SERVER_PORT'] : "";

        return "$scheme://$server$port";
    }
}
