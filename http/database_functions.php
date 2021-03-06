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
 * getConnexion launch a connexion to specified database
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
/**
 * logs the user if his log infos are right
 * @param type $user user name
 * @param type $mdp user password
 * @return type
 */
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
/**
 * check if the user exists
 * @param type $user
 * @return boolean
 */
function usernameExists($user) {
    try {
        $query = "SELECT EXISTS(SELECT * 
              FROM utilisateurs
              WHERE nomUtilisateur = :name)";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":name", $user, PDO::PARAM_STR);
        $statement->execute();
        return $statement->fetchColumn();
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * insert a user in the db
 * @param type $username
 * @param type $password
 * @return type
 */
function insertUser($username, $password) {
    $query = "INSERT INTO `utilisateurs`( `nomUtilisateur`, `mdpUtilisateur`) "
            . "VALUES(:user, :pass)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":user", $username, PDO::PARAM_STR);
    $statement->bindParam(":pass", $password, PDO::PARAM_STR);
    $statement->execute();
    return getConnexion()->lastInsertId();
}
/**
 * check if the album exists
 * @param type $nameAlbum
 * @return type
 */
function albumExists($nameAlbum) {
    $query = "SELECT idAlbum FROM albums "
            . "WHERE nomAlbum = :albumName";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":albumName", $nameAlbum, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchColumn();
}
/**
 * check if the artists exists
 * @param type $nameArtist
 * @return type
 */
function artistExists($nameArtist) {
    $query = "SELECT idArtiste FROM artistes "
            . "WHERE nomArtiste = :artistName";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":artistName", $nameArtist, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchColumn();
}
/**
 * insert a new artist in the db
 * @param type $nameArtist
 * @return type
 */
function insertArtist($nameArtist) {
    $query = "INSERT INTO `artistes` (`nomArtiste`) VALUES ( :artistName)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":artistName", $nameArtist, PDO::PARAM_STR);
    $statement->execute();
    return getConnexion()->lastInsertId();
}
/**
 * insert a new album in the db
 * @param type $nameAlbum
 * @return type
 */
function insertAlbum($nameAlbum) {
    $query = "INSERT INTO `albums` (`nomAlbum`) VALUES(:albumName)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":albumName", $nameAlbum, PDO::PARAM_STR);
    $statement->execute();
    return getConnexion()->lastInsertId();
}
/**
 * insert a new entry in the avoir table to link albums and artists (N-N table)
 * @param type $idArtist
 * @param type $idAlbum
 */
function insertManyToManyAvoir($idArtist, $idAlbum) {
    $query = "INSERT INTO avoir VALUES(:idArtist, :idAlbum)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":idArtist", $idArtist, PDO::PARAM_INT);
    $statement->bindParam(":idAlbum", $idAlbum, PDO::PARAM_INT);
    $statement->execute();
}
/**
 * check if link between artist and album exists
 * @param type $idArtist
 * @param type $idAlbum
 * @return type
 */
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
/**
 * insert a title in the db
 * @param type $nameTitle
 * @param type $idAlbum
 * @param type $idUser
 * @param type $nameFile
 */
function insertTitle($nameTitle, $idAlbum, $idUser, $nameFile) {
    $query = "INSERT INTO `titres` (`nomTitre`, `fichierTitre`, `idAlbum`, `idUtilisateur`) VALUES(:titleName, :fileName, :albumId, :userId)";
    $statement = getConnexion()->prepare($query);
    $statement->bindParam(":titleName", $nameTitle, PDO::PARAM_STR);
    $statement->bindParam(":fileName", $nameFile, PDO::PARAM_STR);
    $statement->bindParam(":albumId", $idAlbum, PDO::PARAM_INT);
    $statement->bindParam(":userId", $idUser, PDO::PARAM_INT);
    $statement->execute();
}
/**
 * check if title exists in the db
 * @param type $nameTitle
 * @param type $idAlbum
 * @param type $idUser
 * @return type
 */
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
 * Insert the song's informations in the db (should be used in a transaction)
 * @param string $artist name of the artist
 * @param string $album name of the album
 * @param string $song name of the song
 * @param int $idUser id of the user
 * @return string
 */
function insertNewSong($artist, $album, $song, $idUser, $fileName) {
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
    } else {
        throw new Exception(-2);
    }
}
/**
 * retrieve the informations of an artist
 * @param type $idUser
 * @return boolean
 */
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
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * retrieve the albums of an artist
 * @param type $idArtist
 * @param type $idUser
 * @return boolean
 */
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
        $statement->bindParam(':idArtist', $idArtist, PDO::PARAM_INT);
        $statement->bindParam(':idUser', $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * retrieve the user's library informations
 * @param type $idUser
 * @return boolean
 */
function getUserLibrary($idUser) {
    try {
        $query = "SELECT count(distinct idTitre) as nbTitres, count(distinct a.idAlbum) as nbAlbums, t.idUtilisateur, count(distinct e.idAmi) as nbAmis "
                . "FROM titres t "
                . "INNER JOIN albums a ON t.idAlbum = a.idAlbum "
                . "INNER JOIN avoir v on a.idAlbum = v.idAlbum "
                . "INNER JOIN artistes art ON v.idArtiste = art.idArtiste "
                . "INNER JOIN etre_ami e ON t.idUtilisateur = e.idUtilisateur "
                . "WHERE t.idUtilisateur = :idUser";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(':idUser', $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * retrieve the tracks of an album
 * @param type $idAlbum
 * @param type $idUser
 * @return boolean
 */
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
        $statement->bindParam(":idAlbum", $idAlbum, PDO::PARAM_INT);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * retrieve the playlists of a user + the number of titles the playlist has
 * @param type $idUser
 * @return boolean
 */
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
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        echo $ex->getMessage();
        return false;
    }
}
/**
 * retrieve the user's playlists
 * @param type $idUser
 * @return boolean
 */
function getPlaylistsWithoutCount($idUser) {
    try {
        $query = "SELECT * "
                . "FROM `playlists` WHERE `idUtilisateur` = :idUser";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        echo $ex->getMessage();
        return false;
    }
}
/**
 * retrive the tracks of a playlist
 * @param type $idPlaylist
 * @param type $idUser
 * @return boolean
 */
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
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->bindParam(":idPlaylist", $idPlaylist, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        echo $ex->getMessage();
        return false;
    }
}
/**
 * insert a playlist
 * @param type $playlistName
 * @param type $idUser
 * @return boolean
 */
function insertPlaylist($playlistName, $idUser) {
    try {
        $query = "INSERT INTO `playlists`(`nomPlaylist`, `idUtilisateur`) "
                . "VALUES (:playlistName, :idUser)";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->bindParam(":playlistName", $playlistName, PDO::PARAM_STR);
        $statement->execute();
        return true;
    } catch (Exception $ex) {
        echo $ex->getMessage();
        return false;
    }
}
/**
 * update a playlist by adding a track in it
 * @param type $idPlaylist
 * @param type $idTrack
 * @return boolean
 */
function updatePlaylist($idPlaylist, $idTrack) {
    try {
        $query = "INSERT INTO `composer`(`idTitre`, `idPlaylist`) "
                . "VALUES (:idTrack, :idPlaylist)";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idPlaylist", $idPlaylist, PDO::PARAM_INT);
        $statement->bindParam(":idTrack", $idTrack, PDO::PARAM_INT);
        $statement->execute();
        return true;
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * update the name of the user
 * @param type $nickname
 * @param type $idUser
 * @return boolean
 */
function updateNickname($nickname, $idUser) {
    try {
        $query = "UPDATE `utilisateurs` SET `nomUtilisateur`= :nickname "
                . "WHERE `idUtilisateur` =:idUser";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":nickname", $nickname, PDO::PARAM_STR);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return true;
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * add a friend to the user
 * @param type $friend
 * @param type $idUser
 * @return boolean
 */
function addFriend($friend, $idUser) {
    try {
        $query = "INSERT INTO `etre_ami`(`idUtilisateur`, `idAmi`) 
            VALUES (:idUser,(SELECT idUtilisateur from utilisateurs where nomUtilisateur = :friendName));";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":friendName", $friend, PDO::PARAM_STR);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return true;
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * get all the friend of a user
 * @param type $idUser
 * @return boolean
 */
function getFriends($idUser) {
    try {
        $query = "SELECT  e.idAmi, u.nomUtilisateur nom,
                (
                    SELECT COUNT(*) 
                    FROM titres t
                    WHERE t.idUtilisateur = e.idAmi
                ) as nbTitres,
                (
                    SELECT  COUNT(DISTINCT idAlbum) 
                    FROM titres t    
                    WHERE t.idUtilisateur = e.idAmi
                ) as nbAlbums
                FROM etre_ami e
                INNER JOIN utilisateurs u
                ON e.idAmi = u.idUtilisateur
                where e.idUtilisateur = :idUser";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * retrieve the avatar of a user
 * @param type $idUser
 * @return boolean
 */
function getAvatar($idUser) {
    try {
        $query = "SELECT imageUtilisateur from utilisateurs "
                . "WHERE idUtilisateur = :idUser";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchColumn();
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * insert a new avatar to the user
 * @param type $avatar
 * @param type $idUser
 * @return boolean
 */
function insertAvatar($avatar, $idUser) {
    try {
        $connection = getConnexion();
        $connection->beginTransaction();

        $directory = "../uploads/" . $idUser;
        if (!is_dir($directory)) {
            mkdir($directory);
        }
        $ext = pathinfo($avatar["name"], PATHINFO_EXTENSION);
        $imageName = "avatar_$idUser.$ext";
        move_uploaded_file($avatar["tmp_name"], "../uploads/$idUser/$imageName");


        $query = "UPDATE `utilisateurs` SET `imageUtilisateur`= :imageName "
                . "WHERE idUtilisateur = :idUser";
        $statement = $connection->prepare($query);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->bindParam(":imageName", $imageName, PDO::PARAM_STR);
        $statement->execute();
        $connection->commit();
        return true;
    } catch (Exception $ex) {
        $connection->rollBack();
        return false;
    }
}
/**
 * get all the albums of a user
 * @param type $idUser
 * @return boolean
 */
function getAlbums($idUser) {
    try {
        $query = "SELECT a.nomAlbum, t.fichierTitre, a.idAlbum, c.nomArtiste, count(t.idTitre) as nbTitres, t.idUtilisateur "
                . "FROM albums a INNER JOIN avoir b ON a.idAlbum = b.idAlbum "
                . "INNER JOIN artistes c ON b.idArtiste = c.idArtiste "
                . "INNER JOIN titres t ON a.idAlbum = t.idAlbum "
                . "WHERE t.idUtilisateur = :idUser "
                . "GROUP BY a.nomAlbum ORDER BY a.nomAlbum";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}
/**
 * get all the albums of the user's friends
 * @param type $name
 * @param type $idUser
 * @return boolean
 */
function getFriendsAlbums($name, $idUser) {
    try {
        $query = "SELECT a.nomAlbum, art.nomArtiste "
                . "FROM etre_ami e "
                . "INNER JOIN utilisateurs u ON e.idAmi = u.idUtilisateur "
                . "INNER JOIN titres t ON e.idAmi = t.idUtilisateur "
                . "INNER JOIN avoir ON t.idAlbum = avoir.idAlbum "
                . "INNER JOIN albums a ON avoir.idAlbum = a.idAlbum "
                . "INNER JOIN artistes art ON avoir.idArtiste = art.idArtiste "
                . "WHERE e.idUtilisateur = :idUser AND u.nomUtilisateur = :friendName "
                . "GROUP BY a.nomAlbum";
        $statement = getConnexion()->prepare($query);
        $statement->bindParam(":friendName", $name, PDO::PARAM_STR);
        $statement->bindParam(":idUser", $idUser, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $ex) {
        return false;
    }
}
