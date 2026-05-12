<?php

use App\Encoder\EncoderInterface;

class JsonEncoder implements EncoderInterface {

    /**
     * @inheritDoc
     */
    public function decode(string $data): array {
        $parsed = json_decode($data, true);
        return is_array($parsed) ? $parsed : [];
    }

    /**
     * @inheritDoc
     */
    public function encode(array $data): string {
        $encoded = json_encode($data, JSON_PRETTY_PRINT);
        return $encoded === false ? '' : $encoded;
    }
}