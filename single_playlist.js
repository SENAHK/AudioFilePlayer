/* 
 
 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: single_artists
 * Fonction	: Gestion de l'affichage des albums liés à un artiste
 
 */


$(function () {
    var tracks = false;
    // get the id of the playlist in the hash
    var idPlaylist = location.hash.split('#playlist/')[1].trim();
    var table = $('#table-playlist');

    if (isInteger(idPlaylist)) {
        tracks = getPlaylistTracks(idPlaylist);
        if (!tracks) {
            alert('Connection error with the db.');
        } else {
            if (tracks.length > 0) {
                $('#title-playlist').append(tracks[0].nomPlaylist);
                table.find('tbody').html(generateTBodyPlaylist(tracks));
            } else {
                alert('playlist vide');
            }
        }
    }


    // click on a button of the table
    table.on('click', 'button', function (event) {
        // play the song
        window.audioPlayer.Init(tracks);
        var id = $(this).data('id');
        window.audioPlayer.SetPos(id);
        window.audioPlayer.Play();
    });
});


/**
 * show the playlist
 * @param {type} playlist
 * @returns {String}
 */
function generateTBodyPlaylist(playlist) {
    var nomArtiste, nomTitre, idTitre, fichierTitre, html = "";

    for (var i = 0, max = playlist.length; i < max; i++) {
        idTitre = playlist[i].idTitre;
        nomArtiste = playlist[i].nomArtiste;
        nomTitre = playlist[i].nomTitre;
        fichierTitre = playlist[i].fichierTitre;

        html += '<tr data-id="' + i + '">';
        html += "<td>" + (i + 1) + "</td>";
        html += '<td>' + nomTitre + '</td>';
        html += '<td>' + nomArtiste + '</td>';
        html += '<td><button type="button" class="btn btn-theme03 play-song" data-id="' + i + '"><i class="fa fa-play"></i> Play</button></td>';

        html += "</tr>";

    }
    return html;
}
/**
 * AJAX call to retrieve the tracks of the playlist
 * @param {type} id
 * @returns {Boolean|infos}
 */
function getPlaylistTracks(id) {
    var output = false;
    $.post({
        url: './http/getPlaylistTracks.php',
        async: false,
        data: {playlistId: id},
        success: function (response) {
            var infos = $.parseJSON(response);
            output = infos;
        }
    });
    return output;
}