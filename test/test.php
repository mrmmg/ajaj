<?php
$server = $_SERVER;

$get = $_GET;
$post = $_POST;

$data = file_get_contents("php://input");

$final  = array(
    'server' => $server,
    'get' => $get,
    'post' => $post,
    'other' => $data,
);

print_r(json_encode($final));
