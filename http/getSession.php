<?php

/*

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getSession
 * Fonction	: Récupérer la variable de la session contenant le nom 
 *                de l'utilisateur

 */

session_start();

$username = "";
if (isset($_SESSION['user'])) {
    $username = $_SESSION['user'];
}
echo $username;