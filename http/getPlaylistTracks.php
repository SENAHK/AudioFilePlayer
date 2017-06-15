<?php

/*

 * Auteur	: Michael Ramusi
 * Date	: 14 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getTracksOfAlbum
 * Fonction	:

 */

session_start();
require './database_functions.php';
$idPlaylist = filter_input(INPUT_POST, "playlistId", FILTER_VALIDATE_INT);
if ($idPlaylist) {
    try {
        $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
        if ($idUser) {
            $output = getPlaylistTracks($idPlaylist, $idUser);
            echo json_encode($output);
        } else {
            throw new Exception('User id error.');
        }
    } catch (Exception $ex) {
       echo false;
    }
}