<?php

class ArticlesController
{
    private ArticleDao $dao;

    public function __construct(Database $database)
    {
        $this->dao = new ArticleDao($database);
    }

    public function handleRequest(): void
    {
        $this->getArticles();
    }

    private function getArticles(): void
    {
        echo json_encode($this->dao->getArticles());
    }
}