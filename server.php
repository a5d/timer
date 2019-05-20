<?php
session_start();

if ($_GET['action'] === 'save') {
    $inputJSON = file_get_contents('php://input');
    file_put_contents('data.txt', $inputJSON);
}

if ($_GET['action'] === 'get') {
    $inputJSON = file_get_contents('data.txt');
    header('Content-Type: application/json');

    $json = json_decode($inputJSON, true);

    $json['countPages'] = ceil(count($json['tasks']) / 10);
    $json['currentPage'] = 1;
    $json['tasks'] = array_slice($json['tasks'], 0, 10, true);

    $outputJSON = json_encode($json);


    print $outputJSON;
}

if ($_GET['action'] === 'get_page') {
    $inputJSON = file_get_contents('data.txt');
    header('Content-Type: application/json');

    $json = json_decode($inputJSON, true);

    $json['countPages'] = ceil(count($json['tasks']) / 10);
    $json['currentPage'] = $_GET['page'];
    $json['tasks'] = array_slice($json['tasks'], ($_GET['page'] - 1) * 10, 10, false);

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

$my_login = '123';
$my_password = '123';

if ($_GET['action'] === 'check_auth') {
    if (!empty($_COOKIE['auth']) && $_COOKIE['auth'] === md5($my_login . $my_password)) {
        print 1; exit;
    }

    print 0;
}

if ($_GET['action'] === 'login') {
    $inputJSON = file_get_contents('php://input');
    $json = json_decode($inputJSON, true);

    if ($json['name'] === $my_login && $json['password'] === $my_password) {
        setcookie('auth', md5($my_login . $my_password), time() + 3600, '/');
        print 1; exit;
    }

    print 0;
}