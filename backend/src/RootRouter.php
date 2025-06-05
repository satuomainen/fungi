<?php

class RootRouter
{
    private ArticlesController $articlesController;
    private SpeciesController $speciesController;

    public function __construct(Database $database)
    {
        $this->articlesController = new ArticlesController($database);
        $this->speciesController = new SpeciesController($database);
    }

    public function handleRequest(string $method, string $entity, ?string $id = null): void
    {
        switch ($method) {
            case "GET":
                switch ($entity) {
                    case "articles":
                        $this->articlesController->handleRequest($id);
                        return;
                    case "species":
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
}
