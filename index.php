<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>List Item</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="list-items" id="list-items">
        <?php
        include 'script.php';
        echo buildMenu();
        ?>
    </div>
    <script src="script.js"></script>
</body>

</html>