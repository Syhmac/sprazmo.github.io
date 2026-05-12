<?php

namespace App\Encoder;

interface EncoderInterface {
    /**
     * Dokonuje deserializacji danych z formatu tekstowego do tablicy.
     * @param string $data dane wejściowe w formie tekstu
     * @return array dane wyjściowe w formie tablicy
     */
    public function decode(string $data): array;

    /**
     * Dokjonuje serializacji danych z tablicy do formatu tekstowego.
     * @param array $data dane wejściowe w formie tablicy
     * @return string dane wyjściowe w formie tekstu
     */
    public function encode(array $data): string;
}