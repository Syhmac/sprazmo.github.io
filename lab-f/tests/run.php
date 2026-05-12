<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/ConversionTest.php';

$tests = array_filter(
    get_defined_functions()['user'],
    static fn (string $name): bool => str_starts_with($name, 'test')
);

$passed = 0;
$failed = 0;

foreach ($tests as $test) {
    try {
        $test();
        $passed++;
        echo "[PASS] {$test}\n";
    } catch (Throwable $throwable) {
        $failed++;
        echo "[FAIL] {$test}\n";
        echo $throwable->getMessage() . "\n";
    }
}

echo PHP_EOL . "Summary: {$passed} passed, {$failed} failed" . PHP_EOL;

if ($failed > 0) {
    exit(1);
}

