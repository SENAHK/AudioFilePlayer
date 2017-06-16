/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 15 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: updatePlaylist
 * Fonction	:
 
 */


$(function () {
    var modal = $('#modal-playlist');
    var playlists = getPlaylists();
    var idTrack = location.hash.split('#updatePlaylist/')[1].trim();
    modal.modal('show');
    console.log(playlists);

    if (Array.isArray(playlists)) {
        modal.find('select').html(generateOptions(playlists));
    } else {
        modal.find('modal-body').append('<p>You have no playlist. Create one with the button in the top menu.</p>')
    }

    modal.on('click', '#accept', function () {

        var idPlaylist = modal.find('select').find(":selected").val();
        var updateSucess = updatePlaylist(idPlaylist, idTrack);

        if (updateSucess) {
            alert('Track added to your playlist.');
            $('#close').click();
        } else {
            alert('This track already exists in this playlist.');
        }

    });

    modal.on('hidden.bs.modal', function (e) {
        parent.history.back();
        return false;
    })

});
function generateOptions(values) {
    var html = "";
    for (var i = 0, max = values.length; i < max; i++) {
        html += '<option value="' + values[i].idPlaylist + '">' + values[i].nomPlaylist + '</option>';

    }
    return html;
}
function getPlaylists() {
    var output = false;
    $.post({
        url: './http/getPlaylistsWithoutCount.php',
        async: false,
        data: {getPlaylistsWithoutCount: true},
        success: function (response) {

            var infos = $.parseJSON(response);
            output = infos;
            console.log(output);
        }
    });
    return output;
}

function updatePlaylist(idPlaylist, idTrack) {
    var output =
            $.post({
                url: './http/updatePlaylist.php',
                async: false,
                data: {idPlaylist: idPlaylist, idTrack: idTrack},
            }).responseText;
    return $.parseJSON(output);
}