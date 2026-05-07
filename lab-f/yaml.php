<?php

$data = [
    'name' => 'SP',
    'index' => '57931',
    'date' => date(DATE_ATOM)
];

$yaml = yaml_emit($data);

echo $yaml;