<?php
/* 

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getArtistesInfos
 * Fonction	: Récupère infos des artistes
 */
session_start();
require './database_functions.php';
if (isset($_POST['getArtistesInfos'])) {
    if ($_POST['getArtistesInfos']) {
        $infos = getArtistesInfos($_SESSION['idUser']);
        echo json_encode($infos);
    }else{
        echo false;
    }
}else{
    echo false;
}