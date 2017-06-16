<?php

/*

 * Auteur	: Michael Ramusi
 * Date	: 16 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: addFriend
 * Fonction	:

 */

require './database_functions.php';
session_start();
$friend = filter_input(INPUT_POST, "friend", FILTER_SANITIZE_STRING);
echo "ok";
if ($friend) {
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
    var_dump($idUser);
    if ($idUser) {
        $exists = usernameExists($friend);
        if (!$exists) {
            echo -1;
        } else {
            if (addFriend($friend, $idUser )) {
                echo 1;
            } else {
                echo 2;
            }
        }
    } else {
        echo 0;
    }
} else {
    echo 0;
}