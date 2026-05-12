<?php
declare(strict_types=1);

function assertSameValue(mixed $expected, mixed $actual, string $message = ''): void
{
    if ($expected !== $actual) {
        $details = $message !== '' ? $message . PHP_EOL : '';
        $details .= 'Expected:' . PHP_EOL . var_export($expected, true) . PHP_EOL;
        $details .= 'Actual:' . PHP_EOL . var_export($actual, true) . PHP_EOL;

        throw new RuntimeException($details);
    }
}

function sampleRows(): array
{
    return [
        ['name' => 'Jan', 'city' => 'Warszawa'],
        ['name' => 'Anna', 'city' => 'Kraków'],
    ];
}

function sampleCsv(): string
{
    return "name,city\nJan,Warszawa\nAnna,Kraków";
}

function sampleSsv(): string
{
    return "name;city\nJan;Warszawa\nAnna;Kraków";
}

function sampleTsv(): string
{
    return "name\tcity\nJan\tWarszawa\nAnna\tKraków";
}

function csvEncoder(): CsvEncoder
{
    return new CsvEncoder();
}

function ssvEncoder(): SsvEncoder
{
    return new SsvEncoder();
}

function tsvEncoder(): TsvEncoder
{
    return new TsvEncoder();
}

function yamlEncoder(): YamlEncoder
{
    return new YamlEncoder();
}

function jsonEncoder(): JsonEncoder
{
    return new JsonEncoder();
}

function sampleYaml(): string
{
    return yaml_emit(sampleRows());
}

function sampleJson(): string
{
    return json_encode(sampleRows(), JSON_PRETTY_PRINT);
}

function testCsvToSsv(): void
{
    $decoded = csvEncoder()->decode(sampleCsv());
    $actual = ssvEncoder()->encode($decoded);

    assertSameValue(sampleSsv(), $actual, 'CSV -> SSV conversion failed');
}

function testCsvToTsv(): void
{
    $decoded = csvEncoder()->decode(sampleCsv());
    $actual = tsvEncoder()->encode($decoded);

    assertSameValue(sampleTsv(), $actual, 'CSV -> TSV conversion failed');
}

function testSsvToCsv(): void
{
    $decoded = ssvEncoder()->decode(sampleSsv());
    $actual = csvEncoder()->encode($decoded);

    assertSameValue(sampleCsv(), $actual, 'SSV -> CSV conversion failed');
}

function testSsvToTsv(): void
{
    $decoded = ssvEncoder()->decode(sampleSsv());
    $actual = tsvEncoder()->encode($decoded);

    assertSameValue(sampleTsv(), $actual, 'SSV -> TSV conversion failed');
}

function testTsvToCsv(): void
{
    $decoded = tsvEncoder()->decode(sampleTsv());
    $actual = csvEncoder()->encode($decoded);

    assertSameValue(sampleCsv(), $actual, 'TSV -> CSV conversion failed');
}

function testTsvToSsv(): void
{
    $decoded = tsvEncoder()->decode(sampleTsv());
    $actual = ssvEncoder()->encode($decoded);

    assertSameValue(sampleSsv(), $actual, 'TSV -> SSV conversion failed');
}

function testCsvToYaml(): void
{
    $decoded = csvEncoder()->decode(sampleCsv());
    $actual = yamlEncoder()->encode($decoded);

    assertSameValue(sampleYaml(), $actual, 'CSV -> YAML conversion failed');
}

function testYamlToCsv(): void
{
    $decoded = yamlEncoder()->decode(sampleYaml());
    $actual = csvEncoder()->encode($decoded);

    assertSameValue(sampleCsv(), $actual, 'YAML -> CSV conversion failed');
}

function testSsvToYaml(): void
{
    $decoded = ssvEncoder()->decode(sampleSsv());
    $actual = yamlEncoder()->encode($decoded);

    assertSameValue(sampleYaml(), $actual, 'SSV -> YAML conversion failed');
}

function testYamlToSsv(): void
{
    $decoded = yamlEncoder()->decode(sampleYaml());
    $actual = ssvEncoder()->encode($decoded);

    assertSameValue(sampleSsv(), $actual, 'YAML -> SSV conversion failed');
}

function testTsvToYaml(): void
{
    $decoded = tsvEncoder()->decode(sampleTsv());
    $actual = yamlEncoder()->encode($decoded);

    assertSameValue(sampleYaml(), $actual, 'TSV -> YAML conversion failed');
}

function testYamlToTsv(): void
{
    $decoded = yamlEncoder()->decode(sampleYaml());
    $actual = tsvEncoder()->encode($decoded);

    assertSameValue(sampleTsv(), $actual, 'YAML -> TSV conversion failed');
}

function testCsvToJson(): void
{
    $decoded = csvEncoder()->decode(sampleCsv());
    $actual = jsonEncoder()->encode($decoded);

    assertSameValue(sampleJson(), $actual, 'CSV -> JSON conversion failed');
}

function testJsonToCsv(): void
{
    $decoded = jsonEncoder()->decode(sampleJson());
    $actual = csvEncoder()->encode($decoded);

    assertSameValue(sampleCsv(), $actual, 'JSON -> CSV conversion failed');
}

function testSsvToJson(): void
{
    $decoded = ssvEncoder()->decode(sampleSsv());
    $actual = jsonEncoder()->encode($decoded);

    assertSameValue(sampleJson(), $actual, 'SSV -> JSON conversion failed');
}

function testJsonToSsv(): void
{
    $decoded = jsonEncoder()->decode(sampleJson());
    $actual = ssvEncoder()->encode($decoded);

    assertSameValue(sampleSsv(), $actual, 'JSON -> SSV conversion failed');
}

function testTsvToJson(): void
{
    $decoded = tsvEncoder()->decode(sampleTsv());
    $actual = jsonEncoder()->encode($decoded);

    assertSameValue(sampleJson(), $actual, 'TSV -> JSON conversion failed');
}

function testJsonToTsv(): void
{
    $decoded = jsonEncoder()->decode(sampleJson());
    $actual = tsvEncoder()->encode($decoded);

    assertSameValue(sampleTsv(), $actual, 'JSON -> TSV conversion failed');
}

function testYamlToJson(): void
{
    $decoded = yamlEncoder()->decode(sampleYaml());
    $actual = jsonEncoder()->encode($decoded);

    assertSameValue(sampleJson(), $actual, 'YAML -> JSON conversion failed');
}

function testJsonToYaml(): void
{
    $decoded = jsonEncoder()->decode(sampleJson());
    $actual = yamlEncoder()->encode($decoded);

    assertSameValue(sampleYaml(), $actual, 'JSON -> YAML conversion failed');
}

