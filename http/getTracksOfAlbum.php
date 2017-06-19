<?php

/*

 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getTracksOfAlbum
 * Fonction	: récupère les musiques d'un album

 */

session_start();
require './database_functions.php';
$idAlbum = filter_input(INPUT_POST, "idAlbum", FILTER_VALIDATE_INT);
if ($idAlbum) {
    try {
        $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
        if ($idUser) {
            $output = getTracksOfAlbum($idAlbum, $idUser);
            echo json_encode($output);
        } else {
            throw new Exception('User id error.');
        }
    } catch (Exception $ex) {
       echo false;
    }
}