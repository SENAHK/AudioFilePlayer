<?php

/*

 * Auteur	: Michael Ramusi
 * Date	: 15 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: updatePlaylist
 * Fonction	:
 */
require './database_functions.php';
session_start();

$idPlaylist = filter_input(INPUT_POST, "idPlaylist", FILTER_VALIDATE_INT);
$idTrack = filter_input(INPUT_POST, "idTrack", FILTER_VALIDATE_INT);

if ($idPlaylist && $idTrack) {
    $query = updatePlaylist($idPlaylist, $idTrack);
    if ($query) {
        echo 1;
    } else {
        echo 0;
    }
} else {
    echo 0;
}