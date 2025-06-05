<?php

class ArticleDao
{
    private PDO $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getArticles(): array
    {
        $sql = "SELECT 
                    id,
                    language,
                    main_heading as mainHeading,
                    body
                FROM articles 
                ORDER BY id, language";

        $stmt = $this->conn->query($sql);
        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }

        return $data;
    }
}