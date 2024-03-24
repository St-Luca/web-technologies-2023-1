<?php

//Задание 1
$a = rand(-10, 10);
$b = rand(-10, 10);

if ($a >= 0 && $b >= 0) {
    $result = $a - $b;
    echo "Разность $a и $b равна $result";
} elseif ($a < 0 && $b < 0) {
    $result = $a * $b;
    echo "Произведение $a и $b равно $result";
} else {
    $result = $a + $b;
    echo "Сумма $a и $b равна $result";
}

echo "<br>";
echo "<br>";


//Задание 2
$a = rand(0, 15);

echo "Значение переменной \"a\": $a<br>";

switch ($a) {
    case 0:
        echo "0<br>";
    case 1:
        echo "1<br>";
    case 2:
        echo "2<br>";
    case 3:
        echo "3<br>";
    case 4:
        echo "4<br>";
    case 5:
        echo "5<br>";
    case 6:
        echo "6<br>";
    case 7:
        echo "7<br>";
    case 8:
        echo "8<br>";
    case 9:
        echo "9<br>";
    case 10:
        echo "10<br>";
    case 11:
        echo "11<br>";
    case 12:
        echo "12<br>";
    case 13:
        echo "13<br>";
    case 14:
        echo "14<br>";
    case 15:
        echo "15<br>";
        break;
    default:
        echo "Некорректное значение<br>";
}

echo "<br>";
echo "<br>";


//Задание 3
function addition($a, $b)
{
    return $a + $b;
}

function subtraction($a, $b)
{
    return $a - $b;
}

function multiplication($a, $b)
{
    return $a * $b;
}

function division($a, $b)
{
    if ($b == 0) {
        return "Ошибка: деление на ноль";
    } else {
        return $a / $b;
    }
}

$a = 3;
$b = 7;

echo "Операции для чисел $a и $b: " . "<br>";
echo "Сумма: " . addition($a, $b) . "<br>";
echo "Разность: " . subtraction($a, $b) . "<br>";
echo "Произведение: " . multiplication($a, $b) . "<br>";
echo "Частное: " . division($a, $b) . "<br>";

echo "<br>";
echo "<br>";


//Задание 4
function mathOperation($arg1, $arg2, $operation)
{
    switch ($operation) {
        case 'addition':
            return addition($arg1, $arg2);
            break;
        case 'subtraction':
            return subtraction($arg1, $arg2);
            break;
        case 'multiplication':
            return multiplication($arg1, $arg2);
            break;
        case 'division':
            return division($arg1, $arg2);
            break;
        default:
            return "Ошибка: неверная операция";
            break;
    }
}

$a = 3;
$b = 7;

echo "Операции для чисел $a и $b: " . "<br>";
echo "Сумма: " . mathOperation($a, $b, 'addition') . "<br>";
echo "Разность: " . mathOperation($a, $b, 'subtraction') . "<br>";
echo "Произведение: " . mathOperation($a, $b, 'multiplication') . "<br>";
echo "Частное: " . mathOperation($a, $b, 'division') . "<br>";

echo "<br>";
echo "<br>";


//Задание 5 в файле index.php


//Задание 6
function power($val, $pow)
{
    if ($pow === 0) {
        return 1;
    }
    if ($pow > 0) {
        return $val * power($val, $pow - 1);
    } else {
        return 1 / ($val * power($val, abs($pow) - 1));
    }
}

$val = 2;
$pow = 10;
echo "$val в степени $pow равно: " . power($val, $pow);
