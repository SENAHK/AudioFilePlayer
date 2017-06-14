<?php

require './database_functions.php';
session_start();
//print_r($_FILES);

$id3_datas = array();

$id3 = $_REQUEST['id3'];
$idUser = $_SESSION['idUser'];
$songsAreInserted = false;
// decode the json values received by home.js
foreach ($id3 as $value) {
    // if parameter of json_decode is true: returns an array instead
    // of object
    array_push($id3_datas, json_decode($value, true));
}
foreach ($id3_datas as $title_datas) {
    print_r($title_datas);
    
    // TODO: filter/sanitize the var
    $title = $title_datas["title"];
    $artist = $title_datas["artist"];
    $album = $title_datas["album"];
    $filename = $title_datas["filename"];
    //$year = $title_datas["year"];

    try {
        $songsAreInserted = insertNewSong($artist, $album, $title, $idUser, $filename);
    } catch (Exception $ex) {
        echo $ex->getMessage();
        echo false;
    }
}
if ($songsAreInserted) {
    $directories = createFolders($idUser, $id3_datas);
    moveFiles($directories);
    echo true;
} else {
    echo false;
}

function createFolders($idUser, $songDatas) {
    $uploadDirectories = array();
    $userDirectory = "../uploads/" . $idUser;
    if (!is_dir($userDirectory)) {
        mkdir($userDirectory);
    }
    foreach ($songDatas as $songData) {
        $artistDirectory = $userDirectory . '/' . $songData['artist'];
        if (!is_dir($artistDirectory)) {
            mkdir($artistDirectory);
        }

        $albumDirectory = $artistDirectory . '/' . $songData['album'];
        if (!is_dir($albumDirectory)) {
            mkdir($albumDirectory);
        }
        array_push($uploadDirectories, $albumDirectory);
    }
    return $uploadDirectories;
}

function moveFiles($directories) {
    foreach ($_FILES["files"]["error"] as $key => $error) {
        if ($error == UPLOAD_ERR_OK) {
            $tmp_name = $_FILES["files"]["tmp_name"][$key];
            $name = $_FILES["files"]["name"][$key];
            move_uploaded_file($tmp_name, $directories[$key] . '/' . $name);
        }
    }
}







