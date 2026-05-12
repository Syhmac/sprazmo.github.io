<?php
session_start();

// Wczytanie klas z enkoderami
require_once __DIR__ . '/lib/Encoder/EncoderInterface.php';
require_once __DIR__ . '/lib/Encoder/CsvEncoder.php';
require_once __DIR__ . '/lib/Encoder/SsvEncoder.php';
require_once __DIR__ . '/lib/Encoder/TsvEncoder.php';
require_once __DIR__ . '/lib/Encoder/JsonEncoder.php';
require_once __DIR__ . '/lib/Encoder/YamlEncoder.php';

$lastInputCookieName = 'lab_f_last_input';
$lastInputFormatCookieName = 'lab_f_last_input_format';
$lastOutputFormatCookieName = 'lab_f_last_output_format';

$inputData = $_POST['input_data'] ?? ($_COOKIE[$lastInputCookieName] ?? '');
$selectedInputFormat = $_POST['input_format'] ?? ($_COOKIE[$lastInputFormatCookieName] ?? '');
$selectedOutputFormat = $_POST['output_format'] ?? ($_COOKIE[$lastOutputFormatCookieName] ?? '');

// Obsługa POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['convert'])) {
    $input_data = $_POST['input_data'] ?? '';
    $input_format = $_POST['input_format'] ?? '';
    $output_format = $_POST['output_format'] ?? '';

    $inputData = $input_data;
    $selectedInputFormat = $input_format;
    $selectedOutputFormat = $output_format;

    if ($input_data !== '') {
        setcookie($lastInputCookieName, $input_data, time() + 60 * 60 * 24 * 30, '/');
    }

    if ($input_format !== '') {
        setcookie($lastInputFormatCookieName, $input_format, time() + 60 * 60 * 24 * 30, '/');
    }

    if ($output_format !== '') {
        setcookie($lastOutputFormatCookieName, $output_format, time() + 60 * 60 * 24 * 30, '/');
    }

    // Walidacja
    if (empty($input_data)) {
        $_SESSION['error'] = 'Pole "Dane wejściowe" nie może być puste!';
    } elseif (!$input_format) {
        $_SESSION['error'] = 'Wyberz format wejściowy!';
    } elseif (!$output_format) {
        $_SESSION['error'] = 'Wyberz format wyjściowy!';
    } else {
        // Input
        $table = match ($input_format) {
            'csv' => (new CsvEncoder)->decode($input_data),
            'ssv' => (new SsvEncoder)->decode($input_data),
            'tsv' => (new TsvEncoder)->decode($input_data),
            'json' => (new JsonEncoder)->decode($input_data),
            'yaml' => (new YamlEncoder)->decode($input_data),
        };

        // Output
        $output_data = match ($output_format) {
            'csv' => (new CsvEncoder)->encode($table),
            'ssv' => (new SsvEncoder)->encode($table),
            'tsv' => (new TsvEncoder)->encode($table),
            'json' => (new JsonEncoder)->encode($table),
            'yaml' => (new YamlEncoder)->encode($table),
        };

        $_SESSION['output'] = $output_data;
    }
}

// Renders the layout
require_once __DIR__ . '/templates/layout.php';
