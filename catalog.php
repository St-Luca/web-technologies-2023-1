<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/assets/styles/style.css">
    <title>Каталог</title>
</head>

<body>
    <div class="products">
        <?php
        // Подключение к базе данных
        $conn_string = "host=localhost port=5432 dbname=postgres user=postgres password=postgres";
        $conn = pg_connect($conn_string);

        if (!$conn) {
            echo "<h2>An error occurred while connecting to the database.</h2>";
            exit;
        }

        // Запрос к базе данных
        $query = "SELECT * FROM products";
        $result = pg_query($conn, $query);
        pg_close($conn);

        if ($result && pg_num_rows($result) > 0) {
            while ($row = pg_fetch_assoc($result)) {
                // Генерация HTML для каждого продукта
                $product_html = "<div class='product'>
                    <img src='" . htmlspecialchars($row['image']) . "' alt='Изображение не найдено'>
                    <a href='product.php?id=" . htmlspecialchars($row['id']) . "'><h2>" . htmlspecialchars($row['name']) . "</h2></a>
                    <h3>" . htmlspecialchars($row['description']) . "</h3>
                    <h3>" . htmlspecialchars($row['price']) . "</h3>
                    </div>";
                echo $product_html;
            }
        } else {
            echo "<h2>No products found.</h2>";
        }
        ?>
    </div>
</body>

</html>