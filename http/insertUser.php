<?php

require './database_functions.php';
session_start();

// Valeurs filtrées des inputs que le serveur a reçu du call ajax
$user = filter_input(INPUT_GET, "user", FILTER_SANITIZE_STRING);
$password = sha1(filter_input(INPUT_GET, "mdp", FILTER_SANITIZE_STRING));

if (($user) && ($password)) {
    try {
        $idUser = insertUser($user, $password);
        $_SESSION['user'] = $user;
        $_SESSION['idUser'] = $idUser;
        echo 1;
    } catch (Exception $ex) {
        echo $ex->getMessage();
        
    }
} 