<?php
/*

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: insertUser
 * Fonction	: insère un utilisateur dans la BD

 */
require './database_functions.php';
session_start();

// Valeurs filtrées des inputs que le serveur a reçu du call ajax
$user = filter_input(INPUT_GET, "user", FILTER_SANITIZE_STRING);
$password = sha1(filter_input(INPUT_GET, "mdp", FILTER_SANITIZE_STRING));

if (($user) && ($password)) {
    try {
        $idUser = insertUser($user, $password);
        $_SESSION['user'] = $user;
        $_SESSION['idUser'] = $idUser;
        echo 1;
    } catch (Exception $ex) {
        echo $ex->getMessage();
        
    }
} 