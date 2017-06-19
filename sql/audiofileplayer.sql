-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 19 Juin 2017 à 16:53
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
(43, 'Lonerism'),
(44, 'Random Access Memories'),
(45, 'Under the Pipal Tree'),
(46, 'Just'),
(47, 'Bloom'),
(48, 'Hymn to the Immortal Wind');

-- --------------------------------------------------------

--
-- Structure de la table `artistes`
--

CREATE TABLE IF NOT EXISTS `artistes` (
  `idArtiste` int(11) NOT NULL AUTO_INCREMENT,
  `nomArtiste` varchar(100) NOT NULL,
  PRIMARY KEY (`idArtiste`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=45 ;

--
-- Contenu de la table `artistes`
--

INSERT INTO `artistes` (`idArtiste`, `nomArtiste`) VALUES
(38, 'Ratatat'),
(39, 'Slowdive'),
(40, 'Lush'),
(41, 'Tame Impala'),
(42, 'Daft Punk'),
(43, 'Mono'),
(44, 'Beach House');

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
(39, 46),
(44, 47),
(43, 48);

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

--
-- Contenu de la table `composer`
--

INSERT INTO `composer` (`idTitre`, `idPlaylist`) VALUES
(102, 8);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `playlists`
--

INSERT INTO `playlists` (`idPlaylist`, `nomPlaylist`, `idUtilisateur`) VALUES
(5, 'Sleep music', 2),
(6, 'Ma magnifique playlist', 2),
(7, 'GoodPlaylist', 2),
(8, 'salut mec', 2);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=103 ;

--
-- Contenu de la table `titres`
--

INSERT INTO `titres` (`idTitre`, `nomTitre`, `fichierTitre`, `idAlbum`, `idUtilisateur`) VALUES
(102, 'L'' America', '07 - Mono - L'' America.mp3', 45, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nomUtilisateur` varchar(50) NOT NULL,
  `mdpUtilisateur` varchar(256) NOT NULL,
  `imageUtilisateur` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idUtilisateur`),
  UNIQUE KEY `nomUtilisateur` (`nomUtilisateur`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`idUtilisateur`, `nomUtilisateur`, `mdpUtilisateur`, `imageUtilisateur`) VALUES
(1, 'admin', 'f6889fc97e14b42dec11a8c183ea791c5465b658', NULL),
(2, 'adminne', 'f6889fc97e14b42dec11a8c183ea791c5465b658', NULL),
(4, 'jeanne', 'f6889fc97e14b42dec11a8c183ea791c5465b658', NULL),
(5, 'Mike', 'a0c6737f2dad4a8001153af2b82660b2b170fd28', NULL),
(6, 'Mica', 'f6889fc97e14b42dec11a8c183ea791c5465b658', NULL);

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
