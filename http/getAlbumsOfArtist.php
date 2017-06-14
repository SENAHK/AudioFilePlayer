<?php

/*

 * Auteur	: Michael Ramusi
 * Date         : 12 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getArtistesInfos
 * Fonction	: Récupère infos des artistes
 */
session_start();
require './database_functions.php';
$idArtist = filter_input(INPUT_POST, 'getAlbumsOfArtist', FILTER_VALIDATE_INT);

if ($idArtist || $idArtist === 0) {
    $infos = getAlbumsOfArtist($idArtist, $_SESSION['idUser']);
    echo json_encode($infos);
} else {
    echo false;
}
