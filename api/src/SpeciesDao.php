<?php

class SpeciesDao
{
    private PDO $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAllSpecies(): array
    {
        $sql = "SELECT
                    id,
                    json_object(
                            'latin', latin_name,
                            'fi', name_fi,
                            'sv', name_sv,
                            'en', name_en
                    ) AS name,
                    main_image AS image,
                    stars,
                    json_group_object(
                        COALESCE(attribute_counts.language, 'fi'),
                        COALESCE(attribute_counts.attrCount, 0)
                    ) AS descriptionSizes
                FROM species s
                LEFT JOIN (
                    SELECT
                        species_id,
                        language,
                        COUNT(species_id) AS attrCount
                    FROM species_attributes
                    GROUP BY species_id, language
                ) AS attribute_counts ON s.id = attribute_counts.species_id
                GROUP BY id, latin_name, name_fi, name_sv, main_image, stars
                ORDER BY s.name_fi";
        $stmt = $this->conn->query($sql);
        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row['name'] = json_decode($row['name']);
            $row['descriptionSizes'] = json_decode($row['descriptionSizes']);
            $data[] = $row;
        }

        return $data;
    }

    public function getSpeciesById(int $id): array | false
    {
        $sql = "SELECT
                    id AS id,
                    json_object(
                            'latin', s.latin_name,
                            'fi', s.name_fi,
                            'sv', s.name_sv,
                            'en', s.name_en
                    ) AS name,
                    s.main_image AS image,
                    s.stars AS stars,
                    imgArray.images AS images,
                    attrObj.attributes
                FROM species s
                LEFT JOIN (
                    SELECT
                        i.species_id AS species_id,
                        json_group_array(i.image_file) AS images
                    FROM images i
                    GROUP BY species_id
                ) As imgArray ON imgArray.species_id = s.id
                LEFT JOIN (
                    SELECT
                        attr.species_id AS species_id,
                        json_group_object(attr.language, json(attr.attributes)) AS attributes
                    FROM (SELECT a.species_id,
                                 a.language,
                                 json_group_array(json_object(
                                         'ordinal', CAST(a.ordinal AS INTEGER),
                                         'name', a.name,
                                         'value', a.value)) as attributes
                          FROM (
                                  SELECT 
                                      species_id, 
                                      language, 
                                      CAST(ordinal AS INTEGER) AS ordinal, 
                                      name, 
                                      value
                                  FROM species_attributes
                                  ORDER BY species_id, language, CAST(ordinal AS INTEGER)
                              ) AS a
                          GROUP BY a.species_id, a.language
                         ) AS attr GROUP BY attr.species_id
                ) AS attrObj ON attrObj.species_id = s.id
                WHERE s.id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $stmt->execute();

        $species = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($species !== false) {
            $species['name'] = json_decode($species['name'] ?? '{}');
            $species['images'] = json_decode($species['images'] ?? '[]');
            $species['attributes'] = json_decode($species['attributes'] ?? '[]');
        }

        return $species;
    }
}