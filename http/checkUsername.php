<?php

require './database_functions.php';
session_start();

$user = filter_input(INPUT_GET, "user", FILTER_SANITIZE_STRING);

if ($user) {
    try {
        $idUser = usernameExists($user);
        if ($idUser) {
            echo true;
        } else {
            echo false;
        }
    } catch (Exception $ex) {
        echo false;
    }
} 