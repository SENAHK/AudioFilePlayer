<?php

/*

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: addFriend.php
 * Fonction	: Insertion d'un ami dans la BD

 */

require './database_functions.php';
session_start();
$friend = filter_input(INPUT_POST, "friend", FILTER_SANITIZE_STRING);
if ($friend) {
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
    // Session problem
    if ($idUser) {
        // The user put his own name
        if ($friend == $_SESSION['user']) {
            echo -2;
        } else {
            $exists = usernameExists($friend);
            // Friend doesn't exist
            if (!$exists) {
                echo -1;
            } else {
                if (addFriend($friend, $idUser)) {
                    echo 1;
                } else {
                    echo 2;
                }
            }
        }
    } else {
        echo 0;
    }
} else {
    echo 0;
}