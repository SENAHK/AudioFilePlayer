<?php

/* 

 * Auteur	: Michael Ramusi
 * Date	: 15 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getPlaylistWithoutCount
 * Fonction	:

 */

require './database_functions.php';
session_start();

$flag = filter_input(INPUT_POST, "getPlaylistsWithoutCount", FILTER_VALIDATE_BOOLEAN);

if ($flag) {
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
    if ($idUser) {
        $output =getPlaylistsWithoutCount($idUser);
        if ($output) {
            echo json_encode($output);
        }
    } else {
        echo 0;
    }
} else {
    echo 0;
}