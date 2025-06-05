<?php

class Database
{
    public function getConnection(): PDO
    {
        return new PDO("sqlite:fungi.sqlite");
    }
}