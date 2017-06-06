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
    $c = getConnexion()->prepare($query);
    $c->bindParam(":name", $user, PDO::PARAM_STR);
    $c->bindParam(":mdp", $mdp, PDO::PARAM_STR);
    $c->execute();
    return $c->fetchColumn();
}

function usernameExists($user) {
    $query = "SELECT idUtilisateur 
              FROM utilisateurs
              WHERE nomUtilisateur = :name";
    $c = getConnexion()->prepare($query);
    $c->bindParam(":name", $user, PDO::PARAM_STR);
    $c->execute();
    return $c->fetchColumn();
}

function insertUser($username, $password) {
    $query = "INSERT INTO utilisateurs "
            . "VALUES('',:user, :pass)";
    $c = getConnexion()->prepare($query);
    $c->bindParam(":user", $username, PDO::PARAM_STR);
    $c->bindParam(":pass", $password, PDO::PARAM_STR);
    $c->execute();
}
