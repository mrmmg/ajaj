<?php

print_r($_SERVER);

print_r($_GET);

print_r($_POST);

print_r(file_get_contents("php://input"), $post_vars);
