/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 15 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: createPlaylist
 * Fonction	:
 
 */
$(function () {

    $('#playlist-frm').submit(function (e) {
        e.preventDefault();
        var playlistName = $('#playlist-input').val();
        if (validateString(playlistName)) {
            if (insertPlaylist(playlistName)) {
                alert('Playlist added, you can add tracks by clicking + near tracks from your library');
            }
        } else {
            writeErrors('#playlist-input', "Your name contains prohibited characters");
        }
    });


});

function validateString(input) {
    var expression = /^[^\\\/&<>]*$/;
    return input.match(expression);
}
function writeErrors(selector, message) {
    $(selector).parent().find('.alert').remove();
    $(selector).val("");
    $(selector).after('<div class="alert alert-danger" id="errorMsg"><span id="helpBlock" class="help-block">' + message + '</span></div>');
}

function insertPlaylist(name) {
    var output =
            $.post({
                url: './http/insertPlaylist.php',
                async: false,
                data: {playlistName: name}
            }).responseText;
    return output;
}