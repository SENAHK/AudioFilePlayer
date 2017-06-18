-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Dim 18 Juin 2017 à 18:04
-- Version du serveur :  5.6.15-log
-- Version de PHP :  5.5.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `audiofileplayer`
--
CREATE DATABASE IF NOT EXISTS `audiofileplayer` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `audiofileplayer`;

-- --------------------------------------------------------

--
-- Structure de la table `albums`
--

CREATE TABLE IF NOT EXISTS `albums` (
  `idAlbum` int(11) NOT NULL AUTO_INCREMENT,
  `nomAlbum` varchar(100) NOT NULL,
  PRIMARY KEY (`idAlbum`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=49 ;

--
-- Contenu de la table `albums`
--

INSERT INTO `albums` (`idAlbum`, `nomAlbum`) VALUES
(39, 'Ratatat'),
(40, 'Just for a day'),
(41, 'Classics'),
(42, 'Split'),
(43, 'Visions'),
(44, 'Lonerism'),
(45, 'On Fire'),
(46, 'salut'),
(47, 'Random Access Memories'),
(48, 'Bloom');

-- --------------------------------------------------------

--
-- Structure de la table `artistes`
--

CREATE TABLE IF NOT EXISTS `artistes` (
  `idArtiste` int(11) NOT NULL AUTO_INCREMENT,
  `nomArtiste` varchar(100) NOT NULL,
  PRIMARY KEY (`idArtiste`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=46 ;

--
-- Contenu de la table `artistes`
--

INSERT INTO `artistes` (`idArtiste`, `nomArtiste`) VALUES
(38, 'Ratatat'),
(39, 'Slowdive'),
(40, 'Lush'),
(41, 'Grimes'),
(42, 'Tame Impala'),
(43, 'Galaxie 500'),
(44, 'Daft Punk'),
(45, 'Beach House');

-- --------------------------------------------------------

--
-- Structure de la table `avoir`
--

CREATE TABLE IF NOT EXISTS `avoir` (
  `idArtiste` int(11) NOT NULL,
  `idAlbum` int(11) NOT NULL,
  PRIMARY KEY (`idArtiste`,`idAlbum`),
  KEY `FK_avoir_idAlbum` (`idAlbum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `avoir`
--

INSERT INTO `avoir` (`idArtiste`, `idAlbum`) VALUES
(38, 39),
(39, 40),
(38, 41),
(40, 42),
(41, 43),
(42, 44),
(43, 45),
(44, 47),
(45, 48);

-- --------------------------------------------------------

--
-- Structure de la table `composer`
--

CREATE TABLE IF NOT EXISTS `composer` (
  `idTitre` int(11) NOT NULL,
  `idPlaylist` int(11) NOT NULL,
  PRIMARY KEY (`idTitre`,`idPlaylist`),
  KEY `FK_composer_idPlaylist` (`idPlaylist`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `etre_ami`
--

CREATE TABLE IF NOT EXISTS `etre_ami` (
  `idUtilisateur` int(11) NOT NULL,
  `idAmi` int(11) NOT NULL,
  PRIMARY KEY (`idUtilisateur`,`idAmi`),
  KEY `FK_ETRE_AMI_idUtilisateur_utilisateurs` (`idAmi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `etre_ami`
--

INSERT INTO `etre_ami` (`idUtilisateur`, `idAmi`) VALUES
(2, 1),
(1, 2),
(1, 4),
(2, 4);

-- --------------------------------------------------------

--
-- Structure de la table `playlists`
--

CREATE TABLE IF NOT EXISTS `playlists` (
  `idPlaylist` int(11) NOT NULL AUTO_INCREMENT,
  `nomPlaylist` varchar(50) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`idPlaylist`),
  UNIQUE KEY `nomPlaylist` (`nomPlaylist`),
  KEY `idUtilisateur` (`idUtilisateur`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `playlists`
--

INSERT INTO `playlists` (`idPlaylist`, `nomPlaylist`, `idUtilisateur`) VALUES
(5, 'Sleep music', 2);

-- --------------------------------------------------------

--
-- Structure de la table `titres`
--

CREATE TABLE IF NOT EXISTS `titres` (
  `idTitre` int(11) NOT NULL AUTO_INCREMENT,
  `nomTitre` varchar(50) NOT NULL,
  `fichierTitre` varchar(100) NOT NULL,
  `idAlbum` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`idTitre`),
  KEY `FK_titres_idAlbum` (`idAlbum`),
  KEY `FK_titres_idUtilisateur` (`idUtilisateur`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- Contenu de la table `titres`
--

INSERT INTO `titres` (`idTitre`, `nomTitre`, `fichierTitre`, `idAlbum`, `idUtilisateur`) VALUES
(6, 'Blue Thunder', '01 Blue Thunder.mp3', 45, 2),
(25, 'Isn''t It A Pity', '10 Isn''t It A Pity.mp3', 45, 2),
(26, 'Sun''s Coming Up', '12 Sun''s Coming Up.mp3', 44, 2),
(27, 'When I Die', '12. When I Die.mp3', 42, 2),
(29, 'The Hours', '05 The Hours.mp3', 48, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nomUtilisateur` varchar(50) NOT NULL,
  `mdpUtilisateur` varchar(256) NOT NULL,
  PRIMARY KEY (`idUtilisateur`),
  UNIQUE KEY `nomUtilisateur` (`nomUtilisateur`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`idUtilisateur`, `nomUtilisateur`, `mdpUtilisateur`) VALUES
(1, 'admin', '8185c8ac4656219f4aa5541915079f7b3743e1b5f48bacfcc3386af016b55320'),
(2, 'adminne', 'f6889fc97e14b42dec11a8c183ea791c5465b658'),
(4, 'jeanne', 'f6889fc97e14b42dec11a8c183ea791c5465b658'),
(5, 'Mike', 'a0c6737f2dad4a8001153af2b82660b2b170fd28'),
(6, 'Mica', 'f6889fc97e14b42dec11a8c183ea791c5465b658');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `avoir`
--
ALTER TABLE `avoir`
  ADD CONSTRAINT `FK_avoir_idAlbum` FOREIGN KEY (`idAlbum`) REFERENCES `albums` (`idAlbum`),
  ADD CONSTRAINT `FK_avoir_idArtiste` FOREIGN KEY (`idArtiste`) REFERENCES `artistes` (`idArtiste`);

--
-- Contraintes pour la table `composer`
--
ALTER TABLE `composer`
  ADD CONSTRAINT `FK_composer_idPlaylist` FOREIGN KEY (`idPlaylist`) REFERENCES `playlists` (`idPlaylist`),
  ADD CONSTRAINT `FK_composer_idTitre` FOREIGN KEY (`idTitre`) REFERENCES `titres` (`idTitre`);

--
-- Contraintes pour la table `etre_ami`
--
ALTER TABLE `etre_ami`
  ADD CONSTRAINT `FK_ETRE_AMI_idUtilisateur` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateurs` (`idUtilisateur`),
  ADD CONSTRAINT `FK_ETRE_AMI_idUtilisateur_utilisateurs` FOREIGN KEY (`idAmi`) REFERENCES `utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `titres`
--
ALTER TABLE `titres`
  ADD CONSTRAINT `FK_titres_idAlbum` FOREIGN KEY (`idAlbum`) REFERENCES `albums` (`idAlbum`),
  ADD CONSTRAINT `FK_titres_idUtilisateur` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateurs` (`idUtilisateur`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
