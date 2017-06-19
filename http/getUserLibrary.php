<?php

/*

 * Auteur	: Michael Ramusi
 * Date	: 19 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: getUserLibrary
 * Fonction	:

 */

session_start();
require './database_functions.php';

$flag = filter_input(INPUT_POST, "getUserLibrary", FILTER_VALIDATE_BOOLEAN);

$idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
if ($flag && $idUser) {    
    $libraryInfos = getUserLibrary($idUser);
    if (is_array($libraryInfos)) {
        echo json_encode($libraryInfos);
    }else{
        echo 0;
    }
}else{
    echo 0;
}