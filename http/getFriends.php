<?php

/*

 * Auteur	: Michael Ramusi
 * Date	: 16 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getFriends
 * Fonction	:

 */
require './database_functions.php';
session_start();

$flag = filter_input(INPUT_POST, "getFriends", FILTER_VALIDATE_BOOLEAN);

if ($flag) {
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : NULL;

    if ($idUser) {

        $friends = getFriends($idUser);
        if (!$friends) {
            echo -1;
        } else {
            echo json_encode($friends);
        }
    }
} else {
    echo -1;
}

