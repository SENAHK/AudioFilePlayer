/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 14 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: audioControls
 * Fonction	:
 
 */


$(function () {
//    $('#volume').val(audioPlayer.audio.volume * 100)
//    $('#volume').change(function () {
//        var vol = this.value;
//        console.log(vol);
//        audioPlayer.audio.volume = vol / 100;
//    });
    $('#button-previous').bind('click', function () {
        if (audioPlayer.songs.length > 0) {
            audioPlayer.Previous();
        }
    });

    $('#button-next').bind('click', function () {
        if (audioPlayer.songs.length > 0) {
            audioPlayer.Next();
        }
    });

//    $('#button-play').click(function () {
//        if (audioPlayer.songs.length > 0) {
//            if (audioPlayer.audio.paused) {
//                audioPlayer.Play();
//                console.log($(this).children());
//                $(this).children().removeClass().addClass('fa fa-play');
//            } else {
//                audioPlayer.Pause();
//                $(this).children().removeClass().addClass('fa fa-pause');
//            }
//        }
//
//    });
});