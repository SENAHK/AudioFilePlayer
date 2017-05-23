<?php

require './db.php';
session_start();

// Valeurs filtrées des inputs que le serveur a reçu du call ajax
$user = filter_input(INPUT_POST, "user", FILTER_SANITIZE_STRING);
$password = sha1(filter_input(INPUT_POST, "mdp", FILTER_SANITIZE_STRING));

if (($user) && ($password)) {
    try {
        $idUser = userExists($user, $password);
        if (is_numeric($idUser)) {
            $_SESSION['user'] = array("user" => $user, "password" => $password);
            echo $idUser;
        } else {
            echo 0;
        }
    } catch (Exception $ex) {
        echo -1;
        ;
    }
} 