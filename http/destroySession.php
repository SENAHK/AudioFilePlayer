<?php

/*

 * Auteur	: Michael Ramusi
 * Date         : 6 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: destroySession
 * Fonction	: Détruire le contenu de $_SESSION

 */

session_start();

$_SESSION = array();
session_destroy();
echo TRUE;