<?php
date_default_timezone_set('Asia/Yekaterinburg');

function getCurrentTime()
{
    $hour = date('H');
    $minute = date('i');

    $hour_str = '';
    if ($hour == 1 || $hour == 21) {
        $hour_str = 'час';
    } elseif (($hour >= 2 && $hour <= 4) || ($hour >= 22 && $hour <= 24)) {
        $hour_str = 'часа';
    } else {
        $hour_str = 'часов';
    }

    $minute_str = '';
    if ($minute == 1 || $minute == 21 || $minute == 31 || $minute == 41 || $minute == 51) {
        $minute_str = 'минута';
    } elseif (($minute >= 2 && $minute <= 4) || ($minute >= 22 && $minute <= 24) || ($minute >= 32 && $minute <= 34) || ($minute >= 42 && $minute <= 44) || ($minute >= 52 && $minute <= 54)) {
        $minute_str = 'минуты';
    } else {
        $minute_str = 'минут';
    }

    return $hour . ' ' . $hour_str . ' ' . $minute . ' ' . $minute_str;
}


$title = "Добро пожаловать на сайт!";
$header = "Добро пожаловать!";
$current_year = date('Y');

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
</head>

<body>
    <div class="container">
        <header>
            <h1><?php echo $header; ?></h1>
        </header>
        <main>
            <p>Текущее время: <?php echo getCurrentTime(); ?></p>
        </main>
        <footer>
            <p>Текущий год: <?php echo $current_year; ?></p>
        </footer>
    </div>
</body>

</html>