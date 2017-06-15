/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 12 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: single_artists
 * Fonction	: Gestion de l'affichage des albums liés à un artiste
 
 */


$(function () {
    var tracks = false;
    var idPlaylist = location.hash.split('#playlist/')[1].trim();
    var table = $('#table-playlist');

    if (isInteger(idPlaylist)) {
        tracks = getPlaylistTracks(idPlaylist);
        if (!tracks) {
            alert('Connection error with the db.')
        } else {
            if (tracks.length > 0) {
                $('#title-playlist').append(tracks[0].nomPlaylist);
                table.find('tbody').html(generateTBodyPlaylist(tracks));
            } else {
                alert('playlist vide');
            }
        }
    }



    table.on('click', 'button', function (event) {
        window.audioPlayer.Init(tracks);
        var id = $(this).data('id');
        window.audioPlayer.SetPos(id);
        window.audioPlayer.Play();
    });
});

function isInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}

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