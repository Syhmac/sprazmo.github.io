<?php

use App\Encoder\EncoderInterface;

class YamlEncoder implements EncoderInterface {

    /**
     * @inheritDoc
     */
    public function decode(string $data): array {
        $parsed = yaml_parse($data);
        return is_array($parsed) ? $parsed : [];
    }

    /**
     * @inheritDoc
     */
    public function encode(array $data): string {
        return yaml_emit($data);
    }
}