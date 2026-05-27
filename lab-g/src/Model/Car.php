<?php
namespace App\Model;

use App\Service\Config;

class Car {
    private ?int $id = null;
    private ?string $manufacturer = null;
    private ?string $model = null;
    private ?int $year = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Car
    {
        $this->id = $id;

        return $this;
    }

    public function getManufacturer(): ?string
    {
        return $this->manufacturer;
    }

    public function setManufacturer(?string $manufacturer): Car
    {
        $this->manufacturer = $manufacturer;

        return $this;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(?string $model): Car
    {
        $this->model = $model;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(?int $year): Car
    {
        $this->year = $year;

        return $this;
    }

    public static function fromArray($array): Car
    {
        $car = new self();
        $car->fill($array);

        return $car;
    }

    public function fill($array): Car
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['manufacturer'])) {
            $this->setManufacturer($array['manufacturer']);
        }
        if (isset($array['model'])) {
            $this->setModel($array['model']);
        }
        if (isset($array['year'])) {
            $this->setYear($array['year']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM car';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $cars = [];
        $carsArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($carsArray as $carArray) {
            $cars[] = self::fromArray($carArray);
        }

        return $cars;
    }

    public static function find($id): ?Car
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM car WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $carArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $carArray) {
            return null;
        }
        $car = Car::fromArray($carArray);

        return $car;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO car (manufacturer, model, year) VALUES (:manufacturer, :model, :year)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'manufacturer' => $this->getManufacturer(),
                'model' => $this->getModel(),
                'year' => $this->getYear(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE car SET manufacturer = :manufacturer, model = :model, year = :year WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'manufacturer' => $this->getManufacturer(),
                'model' => $this->getModel(),
                'year' => $this->getYear(),
                'id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM car WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setManufacturer(null);
        $this->setModel(null);
        $this->setYear(null);
    }
}
