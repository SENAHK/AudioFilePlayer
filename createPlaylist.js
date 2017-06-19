/* 
 
 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: createPlaylist.js
 * Fonction	: controleur de la création des playlists
 
 */
$(function () {
    $('#profile-img').attr('src', getAvatar());
    
    $('#playlist-frm').submit(function (e) {
        e.preventDefault();
        var playlistName = $('#playlist-input').val();
        if (validateString(playlistName)) {
            if (insertPlaylist(playlistName)) {
                alert('Playlist added, you can add tracks by clicking + near tracks from your library');
            }
        } else {
            writeError('#playlist-input', "Your name contains prohibited characters");
        }
    });


});


/**
 * AJAX call to insert the playlist
 * @param {type} name
 * @returns {jqXHR.responseText}
 */
function insertPlaylist(name) {
    var output =
            $.post({
                url: './http/insertPlaylist.php',
                async: false,
                data: {playlistName: name}
            }).responseText;
    return output;
}