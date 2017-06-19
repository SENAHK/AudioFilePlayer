/* 
 
 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: audioControls
 * Fonction	: Gère les controleurs de la musique
 
 */


$(function () {

    var music = window.audioPlayer.audio; // audio element
    var readButton = $('#btn-play'); // play button
    var playhead = $('#playhead'); // playhead
    var timeline = $('#timeline'); // timeline

    var timelineWidth = timeline.width() - playhead.width();
    console.log(timelineWidth);
    // Click of the previous button
    $('#btn-previous').on('click', function () {
        if (audioPlayer.songs.length > 0) {
            audioPlayer.Previous();
        }
    });
    
    // Volume controls
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

    // Play button
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
    
    // adds a listener when song has ended
    $(this.audio).bind("ended", function (e) {
        audioPlayer.Next();
    });
    // adds a listener when song has begun to play
    $(music).bind('play', function () {
        $('#audio-controls').height($('#sidebar').height());
        var tags = audioPlayer.GetTags();
        $('#song-title').html('<strong>' + tags.title + '</strong> by ' + tags.artist);
        var audioSrc = audioPlayer.GetFileSrc();
        showSongImage(audioSrc, '#song-image');
    });
    // adds a listener when time of song is updating
    $(music).bind('timeupdate', function () {
        if (!music.paused) {
            $('#audio-controls').show();
        }
        $('#total-time').html(secondsToMinutes(music.duration));
        $('#actual-time').html(secondsToMinutes(music.currentTime));
        // move the playhead 
        var playPercent = timelineWidth * (music.currentTime / music.duration);
        playhead.css("margin-left", playPercent);
        if (music.currentTime == music.duration) {
            readButton.removeClass().addClass("play");
        }
    });
});
/**
 * read and show the image of the file if it exists
 * @param {type} fileSrc the path to the file
 * @param {type} imgSelector the jquery selector to the image tag to update
 * @returns {undefined}
 */
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
/**
 * convert seconds to mins:secs
 * @param {type} time
 * @returns {String}
 */
function secondsToMinutes(time) {
    var mins = Math.floor(time / 60);
    var secs = Math.floor(time % 60);

    return mins + ':' + (secs < 10 ? "0" + secs : secs);
}

