<?php
/*

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: checkUsername.php
 * Fonction	: Vérifie si l'utilisateur existe

 */
require './database_functions.php';
session_start();

$user = filter_input(INPUT_GET, "user", FILTER_SANITIZE_STRING);

if ($user) {
    try {
        $idUser = usernameExists($user);
        if ($idUser) {
            echo true;
        } else {
            echo false;
        }
    } catch (Exception $ex) {
        echo false;
    }
} 