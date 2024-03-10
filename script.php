<?php

try {
    $pdo = new PDO("mysql:host=localhost;dbname=webdb", "root", "2509");
    //echo "Database connection established";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

function buildMenu($parent_id = NULL)
{
    global $pdo;
    $output = '';

    if ($parent_id == null) {
        $query = $pdo->prepare("SELECT * FROM webdb.menu WHERE parent_id is ?");
    } else {
        $query = $pdo->prepare("SELECT * FROM webdb.menu WHERE parent_id = ?");
    }

    $query->execute([$parent_id]);

    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $row) {
        $hasChildren = hasChildren($row['id']);

        $output .= '<div class="list-item list-item_open" data-parent>';
        $output .= '<div class="list-item__inner">';

        if ($hasChildren) {
            $output .= '<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>';
        } else {
            $output .= '<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open style="visibility: hidden;"> ';
        }

        $output .= '<img class="list-item__folder" src="img/folder.png" alt="folder">';
        $output .= '<span>' . $row['name'] . '</span>';
        $output .= '</div>';
        $output .= '<div class="list-item__items">';
        $output .= buildMenu($row['id']);
        $output .= '</div>';
        $output .= '</div>';
    }

    return $output;
}

function hasChildren($parent_id)
{
    global $pdo;

    $query = $pdo->prepare("SELECT COUNT(*) FROM webdb.menu WHERE parent_id = ?");
    $query->execute([$parent_id]);
    $count = $query->fetchColumn();

    return $count > 0;
}
