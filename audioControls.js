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
    console.log(timelineWidth);
    $('#btn-previous').on('click', function () {
        if (audioPlayer.songs.length > 0) {
            audioPlayer.Previous();
        }
    });
    music.volume = 0.5;
    $('#volume').val(music.volume * 100);
    $('#volume').change(function () {
        var vol = this.value;
        console.log(vol);
        music.volume = vol / 100;
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

    $(music).bind('play', function () {
        $('#audio-controls').height($('#sidebar').height());
        var tags = audioPlayer.GetTags();
        $('#song-title').html('<strong>' + tags.title + '</strong> by ' + tags.artist);
        var audioSrc = audioPlayer.GetFileSrc();
        showSongImage(audioSrc, '#song-image');
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
    });
});
function showSongImage(fileSrc, imgSelector) {
    jsmediatags.read(fileSrc, {
        onSuccess: function (tag) {
            var tags = tag.tags;
            var image = tags.picture;
            if (image) {
                var base64String = "";
                for (var i = 0; i < image.data.length; i++) {
                    base64String += String.fromCharCode(image.data[i]);
                }
                var base64 = "data:image/jpeg;base64," +
                        window.btoa(base64String);
                $(imgSelector).attr('src', base64);
            } else {
                $(imgSelector).attr('src', './assets/img/no-image.png')
            }

        }
    });
}
function secondsToMinutes(time) {
    var mins = Math.floor(time / 60);
    var secs = Math.floor(time % 60);

    return mins + ':' + (secs < 10 ? "0" + secs : secs);
}

