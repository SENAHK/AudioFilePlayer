<?php

/*

 * Auteur	: Michael Ramusi
 * Date	: 17 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getAlbums
 * Fonction	:

 */
require './database_functions.php';
session_start();

$flag = filter_input(INPUT_POST, "getAlbums", FILTER_VALIDATE_BOOLEAN);

if ($flag) {
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
    if ($idUser) {
        $albums = getAlbums($idUser);
        if ($albums) {
            echo json_encode($albums);
        } else {
            echo 0;
        }
    }else{
        echo 0;
    }
}else{
    echo 0;
}