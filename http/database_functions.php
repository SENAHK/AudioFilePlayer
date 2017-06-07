<?php

/*
 * Auteur    : Michael RAMUSI
 * Date      : Juin 2017
 * Copyright : TPI 2017 - RAMUSI Michael
 * Fichier   : database_access.inc
 * Fonction  : Contient les fonctions CRUD
 */

require 'database_access.inc';

/**
 * getConnexion lance une connexion vers la base de données
 * @staticvar null $dbc
 * @return \PDO
 */
function getConnexion() {
    static $dbc = null;
    try {
        if ($dbc === null) {
            $connectionString = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
            $dbc = new PDO($connectionString, DB_USER, DB_PASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
    } catch (PDOException $e) {
        die("Erreur; " . $e->getMessage());
    }
    return $dbc;
}

function userExists($user, $mdp) {
    $query = "SELECT idUtilisateur 
              FROM utilisateurs
              WHERE nomUtilisateur = :name
              AND mdpUtilisateur = :mdp";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":name", $user, PDO::PARAM_STR);
    $statement->bindParam(":mdp", $mdp, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchColumn();
}

function usernameExists($user) {
    $query = "SELECT idUtilisateur 
              FROM utilisateurs
              WHERE nomUtilisateur = :name";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":name", $user, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchColumn();
}

function insertUser($username, $password) {
    $query = "INSERT INTO utilisateurs "
            . "VALUES('',:user, :pass)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":user", $username, PDO::PARAM_STR);
    $statement->bindParam(":pass", $password, PDO::PARAM_STR);
    $statement->execute();
}

function albumExists($nameAlbum) {
    $query = "SELECT idAlbum FROM albums "
            . "WHERE nomAlbum = :albumName";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":albumName", $nameAlbum, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchColumn();
}

function artistExists($nameArtist) {
    $query = "SELECT idArtiste FROM artistes "
            . "WHERE nomArtiste = :artistName";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":artistName", $nameArtist, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchColumn();
}

function insertArtist($nameArtist) {
    $query = "INSERT INTO artistes VALUES('', :artistName)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":artistName", $nameArtist, PDO::PARAM_STR);
    $statement->execute();
    return getConnexion()->lastInsertId();
}

function insertAlbum($nameAlbum) {
    $query = "INSERT INTO albums VALUES('', :albumName)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":albumName", $nameAlbum, PDO::PARAM_STR);
    $statement->execute();
    return getConnexion()->lastInsertId();
}

function insertManyToManyAvoir($idArtist, $idAlbum) {
    $query = "INSERT INTO avoir VALUES(:idArtist, :idAlbum)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":idArtist", $idArtist, PDO::PARAM_INT);
    $statement->bindParam(":idAlbum", $idAlbum, PDO::PARAM_INT);
    $statement->execute();
}

function manyToManyAvoirExists($idArtist, $idAlbum) {
    $query = "SELECT EXISTS(SELECT * FROM avoir "
            . "WHERE idAlbum=:idAlbum "
            . "AND idArtiste=:idArtist)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":idArtist", $idArtist, PDO::PARAM_INT);
    $statement->bindParam(":idAlbum", $idAlbum, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetchColumn();
}

function insertTitle($nameTitle, $idAlbum, $idUser) {
    $query = "INSERT INTO titres VALUES('', :titleName, :albumId, :userId)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":titleName", $nameTitle, PDO::PARAM_STR);
    $statement->bindParam(":albumId", $idAlbum, PDO::PARAM_INT);
    $statement->bindParam(":userId", $idUser, PDO::PARAM_INT);
    $statement->execute();
}

/**
 * Insert the song's informations in the db with a sql transaction
 * @param string $artist name of the artist
 * @param string $album name of the album
 * @param string $song name of the song
 * @param int $idUser id of the user
 * @return string
 */
function insertNewSong($artist, $album, $song, $idUser) {
    try {
        $connection = getConnexion();
        $connection->beginTransaction();

        $idAlbum = albumExists($album);
        $idArtist = artistExists($artist);

        // add the new album in the eponymous table if doesn't exist
        if (!$idAlbum) {
            $idAlbum = insertAlbum($album);
        }
        // add the new artist in the eponymous table if doesn't exist
        if (!$idArtist) {
            $idArtist = insertArtist($artist);
        }
        // add the id of the album and artist in 'avoir' table if doesn't exist
        if (!manyToManyAvoirExists($idArtist, $idAlbum)) {
            insertManyToManyAvoir($idArtist, $idAlbum);
        }
        insertTitle($song, $idAlbum, $idUser);
        $connection->commit();
        return true;
    } catch (Exception $ex) {
        $connection->rollBack();
        return false;
    }
}
