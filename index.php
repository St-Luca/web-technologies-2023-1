<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сайт</title>
</head>

<body>
    <p>Задание 5</p>
    <p>Текущий год: <?php echo date('Y'); ?> </p>

    <?php require('index2.php') ?>

    <?php
    $year = date('Y');
    $year_content = file_get_contents('index.html');
    $year_content = str_replace('{{ year }}', $year, $year_content);
    echo $year_content;
    ?>
</body>

</html>