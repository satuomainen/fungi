<?php

class SpeciesController
{
    private SpeciesDao $dao;

    public function __construct(Database $database)
    {
        $this->dao = new SpeciesDao($database);
    }

    public function handleRequest(?string $id): void
    {
        if (isset($id)) {
            $this->getSpeciesById((int)$id);
            return;
        }

        $this->getAllSpecies();
    }

    private function getSpeciesById(string $id): void
    {
        $species = $this->dao->getSpeciesById($id);

        if ($species === false) {
            http_response_code(404);
            return;
        }

        echo json_encode($species);
    }

    private function getAllSpecies(): void
    {
        echo json_encode($this->dao->getAllSpecies());
    }
}