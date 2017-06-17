<?php

/*

 * Auteur	: Michael Ramusi
 * Date	: 17 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getFriendsAlbums
 * Fonction	:

 */

require './database_functions.php';
session_start();

$name = filter_input(INPUT_POST, "friendsName", FILTER_SANITIZE_STRING);
$idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;

if ($name && $idUser) {
    $albums = getFriendsAlbums($name, $idUser);
    if ($albums) {
        echo json_encode($albums);
    } else {
        echo 0;
    }
} else {
    echo 0;
}
