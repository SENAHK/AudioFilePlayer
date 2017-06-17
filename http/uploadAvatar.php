<?php

/*
 * Auteur	: Michael Ramusi
 * Date	: 17 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: uploadAvatar
 * Fonction	:
 */

// Maximum size accepted: 5 MegaBytes
define("MAX_FILE_SIZE", 5242880);

require './database_functions.php';
session_start();

if (isset($_FILES['avatar']) && !empty($_FILES['avatar'])) {
    $avatar = $_FILES['avatar'];
    if (!fileIsImage($avatar["tmp_name"])) {
        echo -1;
        exit();
    }
    if (fileIsTooBig($avatar["tmp_name"], MAX_FILE_SIZE)) {
        echo -2;
        exit();
    }
    $idUser = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : false;
    if ($idUser) {
        if (insertAvatar($avatar, $idUser)) {
            echo 1;
        } else {
            echo 0;
        }
    }
} else {
    echo 0;
}

function fileIsImage($path) {
    return exif_imagetype($path);
}

function fileIsTooBig($path, $maxSizeInBytes) {
    return filesize($path) > $maxSizeInBytes;
}
