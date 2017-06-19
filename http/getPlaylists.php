<?php

/*

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getPlaylists
 * Fonction	: récupère les playlists de l'utilisateur

 */

session_start();
require './database_functions.php';

$flag = filter_input(INPUT_POST, "getPlaylists", FILTER_VALIDATE_BOOLEAN);

if ($flag) {
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : NULL;
    if ($idUser) {
        $playlists = getPlaylists($idUser);
        if (is_array($playlists)) {
            echo json_encode($playlists);
        } else {
            echo false;
        }
    } else {
        echo false;
    }
} else {
    echo false;
}