<?php

header('Content-Type: application/json');

$ret = [
    'result' => 'OK',
];
print json_encode($ret);