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
            . "VALUES(null,:user, :pass)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":user", $username, PDO::PARAM_STR);
    $statement->bindParam(":pass", $password, PDO::PARAM_STR);
    $statement->execute();
    return getConnexion()->lastInsertId();
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
    $query = "INSERT INTO artistes VALUES(null, :artistName)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":artistName", $nameArtist, PDO::PARAM_STR);
    $statement->execute();
    return getConnexion()->lastInsertId();
}

function insertAlbum($nameAlbum) {
    $query = "INSERT INTO albums VALUES(null, :albumName)";
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

function insertTitle($nameTitle, $idAlbum, $idUser, $nameFile) {

    $query = "INSERT INTO titres VALUES(null, :titleName, :fileName, :albumId, :userId)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":titleName", $nameTitle, PDO::PARAM_STR);
    $statement->bindParam(":fileName", $nameFile, PDO::PARAM_STR);
    $statement->bindParam(":albumId", $idAlbum, PDO::PARAM_INT);
    $statement->bindParam(":userId", $idUser, PDO::PARAM_INT);
    $statement->execute();
}

function titleExists($nameTitle, $idAlbum, $idUser) {
    $query = "SELECT EXISTS(SELECT * "
            . "FROM titres "
            . "WHERE idAlbum=:albumId "
            . "AND nomTitre=:titreName "
            . "AND idUtilisateur=:userId)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":titreName", $nameTitle, PDO::PARAM_STR);
    $statement->bindParam(":albumId", $idAlbum, PDO::PARAM_INT);
    $statement->bindParam(":userId", $idUser, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetchColumn();
}

/**
 * Insert the song's informations in the db with a sql transaction
 * @param string $artist name of the artist
 * @param string $album name of the album
 * @param string $song name of the song
 * @param int $idUser id of the user
 * @return string
 */
function insertNewSong($artist, $album, $song, $idUser, $fileName) {
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
        // prevent duplicate entries
        if (!titleExists($song, $idAlbum, $idUser)) {
            insertTitle($song, $idAlbum, $idUser, $fileName);
        }
        $connection->commit();
        return true;
    } catch (Exception $ex) {
        $connection->rollBack();
        return false;
    }
}

function getArtistesInfos($idUser) {
    try {
        $query = "
                SELECT  a.nomArtiste, a.idArtiste, COUNT(*) nbAlbums
                FROM    artistes a
                        INNER JOIN avoir b
                            ON a.idArtiste = b.idArtiste
                        INNER JOIN albums c
                            ON b.idAlbum = c.idAlbum
                        INNER JOIN
                        (
                            SELECT  idAlbum
                            FROM    albums
                            natural join titres
                            natural join utilisateurs
                            WHERE idUtilisateur = :idUser
                            GROUP   BY idAlbum
                        ) d ON c.idAlbum = d.idAlbum
                GROUP   BY a.nomArtiste
                ORDER BY a.nomArtiste";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}

function getAlbumsOfArtist($idArtist, $idUser) {
    try {
        $query = "SELECT a.nomAlbum, a.idAlbum, c.nomArtiste, count(t.idTitre) as nbTitres
                  FROM albums a
                  INNER JOIN avoir b ON a.idAlbum = b.idAlbum
                  INNER JOIN artistes c ON b.idArtiste = c.idArtiste
                  INNER JOIN titres t ON a.idAlbum = t.idAlbum
                  WHERE t.idUtilisateur = :idUser
                  AND c.idArtiste = :idArtist
                  GROUP BY a.nomAlbum";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(':idArtist', $idArtist);
        $statement->bindParam(':idUser', $idUser);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}

function getTracksOfAlbum($idAlbum, $idUser) {
    try {
        $query = "SELECT `idTitre`, `nomTitre`, `fichierTitre`, a.nomAlbum, art.nomArtiste, idUtilisateur 
                  FROM `titres` t
                  INNER JOIN albums a
                    ON t.idAlbum = a.idAlbum
                  INNER JOIN avoir v
                    on a.idAlbum = v.idAlbum
                  INNER JOIN artistes art
                    ON v.idArtiste = art.idArtiste
                  WHERE idUtilisateur = :idUser
                  AND t.idAlbum = :idAlbum";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idAlbum", $idAlbum);
        $statement->bindParam(":idUser", $idUser);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}

function getPlaylists($idUser) {
    try {
        $query = "SELECT p.idPlaylist, p.nomPlaylist, COUNT(t.idTitre) nbTitres
                  FROM playlists p
                  INNER JOIN composer c
	                ON p.idPlaylist = c.idPlaylist
                  INNER JOIN titres t
                        ON c.idTitre = t.idTitre
                  WHERE t.idUtilisateur = :idUser
                  group by nomPlaylist";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        echo $ex->getMessage();
        return false;
    }
}

function getPlaylistsWithoutCount($idUser) {
    try {
        $query = "SELECT * "
                . "FROM `playlists` WHERE `idUtilisateur` = :idUser";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        echo $ex->getMessage();
        return false;
    }
}

function getPlaylistTracks($idPlaylist, $idUser) {
    try {
        $query = "SELECT art.nomArtiste, t.nomTitre, t.idTitre, t.fichierTitre, p.nomPlaylist, t.idUtilisateur, a.nomAlbum
              FROM playlists p
              INNER JOIN composer c
                      ON p.idPlaylist = c.idPlaylist
              INNER JOIN titres t
                      ON c.idTitre = t.idTitre
              INNER JOIN albums a
                      ON t.idAlbum = a.idAlbum
              INNER JOIN avoir av
                      ON a.idAlbum = av.idAlbum
              INNER JOIN artistes art
                      ON av.idArtiste = art.idArtiste
              WHERE t.idUtilisateur = :idUser
              AND p.idPlaylist = :idPlaylist";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser);
        $statement->bindParam(":idPlaylist", $idPlaylist);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        echo $ex->getMessage();
        return false;
    }
}

function insertPlaylist($playlistName, $idUser) {
    try {
        $query = "INSERT INTO `playlists`(`nomPlaylist`, `idUtilisateur`) "
                . "VALUES (:playlistName, :idUser)";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser);
        $statement->bindParam(":playlistName", $playlistName);
        $statement->execute();
        return true;
    } catch (Exception $ex) {
        echo $ex->getMessage();
        return false;
    }
}

function updatePlaylist($idPlaylist, $idTrack) {
    try {
        $query = "INSERT INTO `composer`(`idTitre`, `idPlaylist`) "
                . "VALUES (:idTrack, :idPlaylist)";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idPlaylist", $idPlaylist);
        $statement->bindParam(":idTrack", $idTrack);
        $statement->execute();
        return true;
    } catch (Exception $ex) {
        return false;
    }
}
