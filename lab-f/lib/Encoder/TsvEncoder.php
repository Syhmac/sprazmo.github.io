<?php

use App\Encoder\EncoderInterface;

class TsvEncoder implements EncoderInterface {

    /**
     * @inheritDoc
     */
    public function decode(string $data): array {
        $lines = array_filter(explode("\n", trim($data)));

        if (count($lines) === 0) {
            return [];
        }

        $header = str_getcsv(array_shift($lines), "\t", '"', "");
        $result = [];

        foreach ($lines as $line) {
            $values = str_getcsv($line, "\t", '"', "");
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

        $lines[] = implode("\t", $header);

        foreach ($data as $row) {
            $values = [];
            foreach ($header as $key) {
                $values[] = $row[$key] ?? "";
            }
            $lines[] = implode("\t", $values);
        }

        return implode("\n", $lines);
    }
}