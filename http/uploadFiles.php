<?php

require './database_functions.php';
session_start();

$id3_datas = array();

$id3 = $_REQUEST['id3'];
$idUser = $_SESSION['idUser'];
$songsAreInserted = true;

array_multisort(
// Array used to sort + optional parameters
        $_FILES['files']['name'], SORT_ASC, SORT_STRING, $_FILES['files']['type'], $_FILES['files']['tmp_name'], $_FILES['files']['error'], $_FILES['files']['size']
);


// decode the json values received by home.js
foreach ($id3 as $value) {
// if parameter of json_decode is true: returns an array instead
// of object
    array_push($id3_datas, json_decode($value, true));
}
try {
    $connection = getConnexion();
    $connection->beginTransaction();
    foreach ($id3_datas as $title_datas) {
        $title = $title_datas["title"];
        $artist = $title_datas["artist"];
        $album = $title_datas["album"];
        $filename = $title_datas["filename"];
        insertNewSong($artist, $album, $title, $idUser, $filename);
    }
    $directories = createFolders($idUser, $id3_datas);

    $movedFiles = moveFiles($directories);

    // is_array = the move has failed
    if (is_array($movedFiles)) {
        unlinkFiles($movedFiles);
        throw new Exception("Upload error");
    }
    $connection->commit();
    echo 1;
} catch (Exception $ex) {
    $connection->rollBack();
    echo 0;
}

function unlinkFiles($files) {
    foreach ($files as $file) {
        if (file_exists($file)) {
            unlink($file);
        }
    }
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
    $files = [];
    foreach ($_FILES["files"]["error"] as $key => $error) {
        if ($error == UPLOAD_ERR_OK) {
            $tmp_name = $_FILES["files"]["tmp_name"][$key];
            $name = $_FILES["files"]["name"][$key];
            $dir = $directories[$key] . '/' . $name;
            $moveSucceed = move_uploaded_file($tmp_name, $dir);
            array_push($files, $dir);
            if (!$moveSucceed) {
                return $files;
            }
        }
    }
    return true;
}
