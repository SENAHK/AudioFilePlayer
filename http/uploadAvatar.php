<?php

/*
 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: uploadAvatar
 * Fonction	: upload l'avatar de l'utilisateur
 */

// Maximum size accepted: 5 MegaBytes
define("MAX_FILE_SIZE", 5242880);

require './database_functions.php';
session_start();

if (isset($_FILES['avatar']) && !empty($_FILES['avatar'])) {
    $avatar = $_FILES['avatar'];
    if (!get_image_type($avatar["tmp_name"])) {
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


function fileIsTooBig($path, $maxSizeInBytes) {
    return filesize($path) > $maxSizeInBytes;
}

// Not working with version of php used in easyphp 14
//function fileIsImage($path) {
//    return exif_imagetype($path);
//}
function get_image_type($filename) {
    $img = getimagesize($filename);
    if (!empty($img[2]))
        return image_type_to_mime_type($img[2]);
    return false;
}
