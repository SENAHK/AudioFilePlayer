///* 
// 
// * Auteur	: Michael Ramusi
// * Date	: juin 2017 
// * Projet	: AudioFilePlayer
// * Copyright	: TPI 2017 - Michael RAMUSI
// * Fichier	: Player
// * Fonction	: Cette classe s'occupe de gérer la lecture des fichiers audio
//
// */
//
"use strict";
class Player {
    constructor(audio) {
        this.audio = audio;
        this.songs = [];
        this.position = 0;
        $(this.audio).prop('loop', false);
    }
    /**
     * Play the next song in the songs array
     */
    Next() {
        var pos = this.position + 1;
        if (pos < this.songs.length) {
            this.SetPos(pos);
        } else {
            this.SetPos(0);
        }
        this.audio.play();
    }
    /**
     * Init defines the songs that will be proccessed
     */
    Init(songArray) {
        this.songs = songArray;

    }

    Play() {
        this.audio.play();
    }

    Pause() {
        this.audio.pause();
    }
    
    /**
     * SetPos defines the src of the audio
     */
    SetPos(pos) {
        this.position = pos;
        var song = this.songs[this.position];
        var filename = song.fichierTitre;
        var idUSer = song.idUtilisateur;
        var artist = song.nomArtiste;
        var album = song.nomAlbum;

        this.audio.src = "uploads/" + idUSer + '/' + artist + '/' + album + '/' + filename;
    }

    Previous() {
        var pos = this.position - 1;
        if (pos >= 0) {
            this.SetPos(pos);
        } else {
            this.SetPos(0);
        }
        this.audio.play();
    }
    /**
     * Returns the tags of the song currently playing
     */
    GetTags() {
        var playing = this.songs[this.position];
        return {artist: playing.nomArtiste, title: playing.nomTitre, album: playing.nomAlbum};
    }
    /**
     * Returns the current source of the playing file
     */
    GetFileSrc(){
        return this.audio.src;
    }
}