<?php

/*

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: updatePlaylist
 * Fonction	: met à jour la playlist d'un utilisateur
 */
require './database_functions.php';
session_start();

$idPlaylist = filter_input(INPUT_POST, "idPlaylist", FILTER_VALIDATE_INT);
$idTrack = filter_input(INPUT_POST, "idTrack", FILTER_VALIDATE_INT);

if ($idPlaylist && $idTrack) {
    $query = updatePlaylist($idPlaylist, $idTrack);
    if ($query != false) {
        echo 1;
    } else {
        echo 0;
    }
} else {
    echo 0;
}