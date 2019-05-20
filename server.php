<?php

if ($_GET['action'] === 'save') {
    $inputJSON = file_get_contents('php://input');
    file_put_contents('data.txt', $inputJSON);
}

if ($_GET['action'] === 'get') {
    $inputJSON = file_get_contents('data.txt');
    header('Content-Type: application/json');

    $json = json_decode($inputJSON, true);

    $json['countPages'] = ceil(count($json['tasks'])/10);
    $json['currentPage'] = 1;
    $json['tasks'] = array_slice($json['tasks'], 0, 10, true);

    $outputJSON = json_encode($json);


    print $outputJSON;
}

if ($_GET['action'] === 'get_page') {
    $inputJSON = file_get_contents('data.txt');
    header('Content-Type: application/json');

    $json = json_decode($inputJSON, true);

    $json['countPages'] = ceil(count($json['tasks'])/10);
    $json['currentPage'] = $_GET['page'];
    $json['tasks'] = array_slice($json['tasks'], ($_GET['page']-1)*10, 10, false);

    $outputJSON = json_encode($json);


    print $outputJSON;
}
if ($_GET['action'] === 'getTask') {
    $inputJSON = file_get_contents('data.txt');
    header('Content-Type: application/json');

    $json = json_decode($inputJSON, true);

    $outputJSON = json_encode($json['tasks'][$_GET['taskId']]);
    print $outputJSON;
}
