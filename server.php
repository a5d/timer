<?php

if ($_GET['action'] === 'save') {
    $inputJSON = file_get_contents('php://input');
    file_put_contents('data.txt', $inputJSON);
}

if ($_GET['action'] === 'get') {
    $inputJSON = file_get_contents('data.txt', $inputJSON);
    header('Content-Type: application/json');
    print $inputJSON;
}
