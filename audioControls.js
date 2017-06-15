/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 14 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: audioControls
 * Fonction	:
 
 */


$(function () {

    var music = window.audioPlayer.audio; // audio element
    var readButton = $('#btn-play'); // play button
    var playhead = $('#playhead'); // playhead
    var timeline = $('#timeline'); // timeline

    var timelineWidth = timeline.width() - playhead.width();
    
    $('#btn-previous').on('click', function () {
        if (audioPlayer.songs.length > 0) {
            audioPlayer.Previous();
        }
    });

    $('#volume').val(audioPlayer.audio.volume * 100);
    $('#volume').change(function () {
        var vol = this.value;
        console.log(vol);
        audioPlayer.audio.volume = vol / 100;
    });

    $('#btn-next').on('click', function () {
        if (audioPlayer.songs.length > 0) {
            audioPlayer.Next();
        }
    });


    readButton.on('click', function () {
        // start music
        if (music.paused) {
            music.play();
            $('#total-time').html(music.duration);
            // remove play, add pause
            readButton.removeClass().addClass("pause");
        } else { // pause music
            music.pause();
            readButton.removeClass().addClass("play");
        }
    });

    $(music).bind('timeupdate', function () {
        if (!music.paused) {
            $('#audio-controls').show();
        }
        $('#total-time').html(secondsToMinutes(music.duration));
        $('#actual-time').html(secondsToMinutes(music.currentTime));

        var playPercent = timelineWidth * (music.currentTime / music.duration);
        playhead.css("margin-left", playPercent);
        if (music.currentTime == music.duration) {
            readButton.removeClass().addClass("play");
        }
    })
});

function secondsToMinutes(time) {
    var mins = Math.floor(time / 60);
    var secs = Math.floor(time % 60);

    return mins + ':' + (secs < 10 ? "0" + secs : secs);
}

