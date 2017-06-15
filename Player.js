///* 
// 
// * Auteur	: Michael Ramusi
// * Date	: 14 juin 2017 
// * Projet	: AudioFilePlayer
// * Copyright	: TPI 2017 - Michael RAMUSI
// * Fichier	: Player
// * Fonction	:
//
// */
//
"use strict";
class Player{
    constructor(audio){
        this.audio = audio;
	this.songs = [];
	this.position = 0;
        $(this.audio).prop('loop', false);
    }
    
    Next(){
       var pos = this.position +1;
       if (pos < this.songs.length){			
            this.SetPos(pos);            
        }
       else{
            this.SetPos(0);
        }
        this.audio.play();
    }
    
    Init(songArray){
        this.songs = songArray;
        // adds a listener when song has ended
        $(this.audio).bind("ended", function (e) {
            audioPlayer.Next();
        });
    }

    Play(){
         this.audio.play();
    }


    Pause(){
        this.audio.pause();
    }
    SetPos(pos){
        this.position = pos;
        var song = this.songs[this.position];
        var filename = song.fichierTitre;
        var idUSer = song.idUtilisateur;
        var artist = song.nomArtiste;
        var album = song.nomAlbum;

        this.audio.src = "uploads/" + idUSer +'/' + artist + '/' + album + '/' + filename;
    
    }

    Previous(){
        var pos = this.position -1;
        if (pos >= 0){			
            this.SetPos(pos);
        }
        else{
            this.SetPos(0);
        }
        this.audio.play();
    }

}