<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab F - Konwerter Formatów Danych</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 900px;
            width: 100%;
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 600;
            font-size: 14px;
        }

        textarea {
            width: 100%;
            min-height: 150px;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            resize: vertical;
            transition: border-color 0.3s;
        }

        textarea:focus {
            outline: none;
            border-color: #667eea;
            background-color: #f8f9ff;
        }

        .format-selection {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
        }

        select {
            padding: 10px 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            background-color: white;
            cursor: pointer;
            transition: border-color 0.3s;
        }

        select:focus {
            outline: none;
            border-color: #667eea;
        }

        .button-group {
            display: flex;
            gap: 10px;
            margin-bottom: 25px;
        }

        button {
            flex: 1;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-convert {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-convert:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-convert:active {
            transform: translateY(0);
        }

        .output-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
        }

        .output-label {
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
            font-size: 14px;
        }

        pre {
            background-color: #f5f5f5;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            padding: 15px;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.5;
            min-height: 100px;
            max-height: 400px;
            overflow-y: auto;
            color: #333;
        }

        .success {
            background-color: #efe;
            color: #3c3;
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #cfc;
        }

        @media (max-width: 600px) {
            .container {
                padding: 20px;
            }

            .format-selection {
                grid-template-columns: 1fr;
            }

            h1 {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔄 Konwerter Formatów Danych</h1>
        <p class="subtitle">Konwertuj dane między formatami CSV, SSV (średnik), TSV (tab), JSON i YAML</p>

        <form method="POST" action="">
            <div class="form-group">
                <label for="input-data">Dane wejściowe:</label>
                <textarea id="input-data" name="input_data" placeholder="Wklej tutaj dane do konwersji..."><?php echo htmlspecialchars($inputData ?? ''); ?></textarea>
            </div>

            <div class="format-selection">
                <div class="form-group">
                    <label for="input-format">Format wejściowy:</label>
                    <select id="input-format" name="input_format" required>
                        <option value="" disabled <?php echo empty($selectedInputFormat) ? 'selected' : ''; ?>>Wybierz format wejściowy</option>
                        <option value="csv" <?php echo (($selectedInputFormat ?? '') === 'csv') ? 'selected' : ''; ?>>CSV</option>
                        <option value="ssv" <?php echo (($selectedInputFormat ?? '') === 'ssv') ? 'selected' : ''; ?>>SSV (średnik)</option>
                        <option value="tsv" <?php echo (($selectedInputFormat ?? '') === 'tsv') ? 'selected' : ''; ?>>TSV (tab)</option>
                        <option value="json" <?php echo (($selectedInputFormat ?? '') === 'json') ? 'selected' : ''; ?>>JSON</option>
                        <option value="yaml" <?php echo (($selectedInputFormat ?? '') === 'yaml') ? 'selected' : ''; ?>>YAML</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="output-format">Format wyjściowy:</label>
                    <select id="output-format" name="output_format" required>
                        <option value="" disabled <?php echo empty($selectedOutputFormat) ? 'selected' : ''; ?>>Wybierz format wyjściowy</option>
                        <option value="csv" <?php echo (($selectedOutputFormat ?? '') === 'csv') ? 'selected' : ''; ?>>CSV</option>
                        <option value="ssv" <?php echo (($selectedOutputFormat ?? '') === 'ssv') ? 'selected' : ''; ?>>SSV (średnik)</option>
                        <option value="tsv" <?php echo (($selectedOutputFormat ?? '') === 'tsv') ? 'selected' : ''; ?>>TSV (tab)</option>
                        <option value="json" <?php echo (($selectedOutputFormat ?? '') === 'json') ? 'selected' : ''; ?>>JSON</option>
                        <option value="yaml" <?php echo (($selectedOutputFormat ?? '') === 'yaml') ? 'selected' : ''; ?>>YAML</option>
                    </select>
                </div>
            </div>

            <div class="button-group">
                <button type="submit" name="convert" class="btn-convert">🚀 Konwertuj</button>
            </div>
        </form>

        <?php if (isset($_POST['convert']) && !empty($_SESSION['error'] ?? '')): ?>
            <div class="success" style="background-color: #fee; border-color: #fcc; color: #c33;">
                ❌ Błąd: <?php echo htmlspecialchars($_SESSION['error']); ?>
                <?php unset($_SESSION['error']); ?>
            </div>
        <?php endif; ?>

        <?php if (isset($_POST['convert']) && !empty($_SESSION['output'] ?? '')): ?>
            <div class="output-section">
                <div class="output-label">📄 Dane wyjściowe:</div>
                <pre><?php echo htmlspecialchars($_SESSION['output']); ?></pre>
                <?php unset($_SESSION['output']); ?>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
