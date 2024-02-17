<?php
$php_ini_path = php_ini_loaded_file();
echo $php_ini_path;

//Задание 1
function printNumbersWithMessages()
{
    $number = 0;

    do {
        if ($number === 0) {
            echo $number . " - это ноль. <br>";
        } elseif ($number % 2 === 0) {
            echo $number . " - чётное число.<br>";
        } else {
            echo $number . " - нечётное число.<br>";
        }

        $number++;
    } while ($number <= 10);
}

echo printNumbersWithMessages();

echo "<br>";
echo "<br>";


//Задание 2
$regions = array(
    "Московская область" => array("Москва", "Зеленоград", "Клин"),
    "Ленинградская область" => array("Санкт-Петербург", "Всеволожск", "Павловск", "Кронштадт"),
    "Рязанская область" => array("Рязань", "Касимов", "Рыбное"),
    "Самарская область" => array("Самара", "Тольятти", "Новокуйбышевск"),
    "Тюменская область" => array("Тюмень", "Тобольск", "Ишим"),
    "Краснодарский край" => array("Краснодар", "Сочи", "Анапа", "Ейск"),
    "Свердловская область" => array("Екатеринбург", "Нижний Тагил", "Каменск-Уральский")
);

foreach ($regions as $region => $cities) {
    echo $region . ":<br>";
    echo implode(", ", $cities) . ".<br>";
}

echo "<br>";
echo "<br>";


//Задание 3
$alphabet = array(
    'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'yo', 'ж' => 'zh',
    'з' => 'z', 'и' => 'i', 'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n', 'о' => 'o',
    'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts',
    'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
);

function transliterate($string, $alphabet)
{
    $transliterated = '';
    $string = mb_strtolower($string, 'UTF-8');
    $length = mb_strlen($string, 'UTF-8');

    for ($i = 0; $i < $length; $i++) {
        $char = mb_substr($string, $i, 1, 'UTF-8');

        if (isset($alphabet[$char])) {
            $transliterated .= $alphabet[$char];
        } else {
            $transliterated .= $char;
        }
    }

    return $transliterated;
}

$string = "Транслитерация завершена успешно";
echo transliterate($string, $alphabet);

echo "<br>";
echo "<br>";


//Задание 4



//Задание 6
foreach ($regions as $region => $cities) {
    echo $region . ":<br>";
    foreach ($cities as $city) {
        if (mb_substr($city, 0, 1, 'UTF-8') === 'К') {
            echo $city . "<br>";
        }
    }
    echo "<br>";
}
