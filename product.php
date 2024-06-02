<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="src/assets/styles/product.css">
    <title>Product Details</title>
</head>

<body>
    <main>
        <?php
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            // Подключение к базе данных
            $conn_string = "host=localhost port=5432 dbname=postgres user=postgres password=postgres";
            $conn = pg_connect($conn_string);

            if (!$conn) {
                echo "<h2>An error occurred while connecting to the database.</h2>";
                exit;
            }

            // Запрос к базе данных для получения данных продукта
            $query = "SELECT * FROM products WHERE id = $1";
            $result = pg_query_params($conn, $query, array($id));

            if ($result && pg_num_rows($result) == 1) {
                $product = pg_fetch_assoc($result);

                $product_html = "<div class='product'>
                    <img src='" . htmlspecialchars($product['image']) . "' alt='Изображение не найдено'>
                    <h2>" . htmlspecialchars($product['name']) . "</h2>
                    <h3>" . htmlspecialchars($product['description']) . "</h3>
                    <h3>" . htmlspecialchars($product['price']) . "</h3>
                    </div>";
                echo $product_html;

                // Запрос к базе данных для получения комментариев
                $query_comments = "SELECT * FROM comments WHERE product_id = $1";
                $result_comments = pg_query_params($conn, $query_comments, array($id));
                pg_close($conn);

                $comments_container_html = '<div class="comments-container"><div class="comments">';

                if ($result_comments && pg_num_rows($result_comments) > 0) {
                    while ($row_comment = pg_fetch_assoc($result_comments)) {
                        $comment_html = "<div class='comment'>
                        <h2>" . htmlspecialchars($row_comment['username']) . "</h2>
                        <h3>Оценка: <span>" . htmlspecialchars($row_comment['rating']) . "</span></h3>
                        <h3><br><span>" . htmlspecialchars($row_comment['comment']) . "</span></h3>
                        </div>";
                        $comments_container_html .= $comment_html;
                    }
                } else {
                    $comments_container_html .= "<h2>Отзывов нет</h2>";
                }
                $comments_container_html .= '</div>';

                $form_comment_html = "<form action='comment.php' method='post' class='comment_form'>
                    <h2>Комментировать</h2>
                    <input type='hidden' name='product_id' value='" . htmlspecialchars($product['id']) . "'>
                    <input type='text' name='username' placeholder='Имя'>
                    <input type='text' name='rating' placeholder='Оценка'>
                    <textarea name='comment' placeholder='Комментарий'></textarea>
                    <input type='submit' value='Добавить'>
                    </form>";

                $comments_container_html .= $form_comment_html . '</div>';
                echo $comments_container_html;
            } else {
                pg_close($conn);
                echo "<h2>Продукт с таким id не существует</h2>";
            }
        } else {
            echo "<h2>ID продукта не указан.</h2>";
        }
        ?>
    </main>
</body>

</html>