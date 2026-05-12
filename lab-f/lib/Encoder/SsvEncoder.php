<?php

use App\Encoder\EncoderInterface;

class SsvEncoder implements EncoderInterface {

    /**
     * @inheritDoc
     */
    public function decode(string $data): array {
        $lines = array_filter(explode("\n", trim($data)));

        if (count($lines) === 0) {
            return [];
        }

        $header = str_getcsv(array_shift($lines), ";", '"', "");
        $result = [];

        foreach ($lines as $line) {
            $values = str_getcsv($line, ";", '"', "");
            $row = array_combine($header, $values);
            if ($row) {
                $result[] = $row;
            }
        }

        return $result;
    }

    /**
     * @inheritDoc
     */
    public function encode(array $data): string {
        if (empty($data)) {return "";}

        $header = array_keys($data[0]);
        $lines = [];

        $lines[] = implode(";", $header);

        foreach ($data as $row) {
            $values = [];
            foreach ($header as $key) {
                $values[] = $row[$key] ?? "";
            }
            $lines[] = implode(";", $values);
        }

        return implode("\n", $lines);
    }
}