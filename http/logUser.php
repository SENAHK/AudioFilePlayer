<?php
/*

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: logUser
 * Fonction	: log un utilisateur en le mettant dans la session

 */
require './database_functions.php';
session_start();

// Valeurs filtrées des inputs que le serveur a reçu du call ajax
$user = filter_input(INPUT_POST, "user", FILTER_SANITIZE_STRING);
$password = sha1(filter_input(INPUT_POST, "mdp", FILTER_SANITIZE_STRING));

if (($user) && ($password)) {
    try {
        $idUser = userExists($user, $password);
        if (is_numeric($idUser)) {
            $_SESSION['user'] = $user;
            $_SESSION['idUser'] = $idUser;
            echo $idUser;
        } else {
            echo 0;
        }
    } catch (Exception $ex) {
        echo -1;
        ;
    }
} 