<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $product_id = $_POST['product_id'];
    $username = $_POST['username'];
    $rating = $_POST['rating'];
    $comment = $_POST['comment'];

    // Function to generate UUID
    function generateUUID()
    {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff)
        );
    }

    $comment_id = generateUUID();

    $conn_string = "host=localhost port=5432 dbname=postgres user=postgres password=postgres";
    $conn = pg_connect($conn_string);

    if (!$conn) {
        echo "An error occurred while connecting to the database.";
        exit;
    }

    $query = "INSERT INTO comments (id, product_id, username, rating, comment) VALUES ($1, $2, $3, $4, $5)";
    $result = pg_query_params($conn, $query, array($comment_id, $product_id, $username, $rating, $comment));

    if (!$result) {
        echo "An error occurred with the query.";
        echo pg_last_error($conn);
    } else {
        echo "Comment added successfully!";
        header("Location: product.php?id=" . $product_id);
    }

    pg_close($conn);
} else {
    echo "Invalid request method.";
}
