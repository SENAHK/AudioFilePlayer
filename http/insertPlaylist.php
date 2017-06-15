<?php

/*

 * Auteur	: Michael Ramusi
 * Date	: 15 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: insertPlaylist
 * Fonction	:

 */

require './database_functions.php';
session_start();

$playlistName = filter_input(INPUT_POST, "playlistName", FILTER_SANITIZE_STRING);

if ($playlistName) {
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
    if ($idUser) {
        if (insertPlaylist($playlistName, $idUser)) {
            echo true;
        }
    } else {
        echo FALSE;
    }
} else {
    echo false;
}