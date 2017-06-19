<?php

/*

 * Auteur	: Michael Ramusi
 * Date         : 17 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getAvatar
 * Fonction	: récupère l'avatar de l'utilisateur
 */
require './database_functions.php';
session_start();
$flag = filter_input(INPUT_POST, "getAvatar", FILTER_VALIDATE_BOOLEAN);

if ($flag) {
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
    $avatarFile = getAvatar($idUser);
    if ($avatarFile) {
        echo "uploads/$idUser/$avatarFile";
    } else {
        echo 0;
    }
} else {
    echo -1;
}

