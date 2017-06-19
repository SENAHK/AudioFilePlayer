<?php

/*

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: updateName
 * Fonction	: met à jour le nom d'un utilisateur

 */

require './database_functions.php';
session_start();
$nickname = filter_input(INPUT_POST, "nickname", FILTER_SANITIZE_STRING);

if ($nickname) {
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
    if ($idUser) {
        $exists = usernameExists($nickname);
        if ($exists) {
            echo -1;
        }else{
            updateNickname($nickname, $idUser);
            echo 1;
        }
    } else {
        echo 0;
    }
} else {
    echo 0;
}