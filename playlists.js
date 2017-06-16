/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 15 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: playlists
 * Fonction	:
 
 */

$(function () {
    var infos = getPlaylists();

    if (!infos) {
        alert('Connection error with the db.');
    } else {
        if (infos.length > 0) {
            $('#tBody-playlists').html(generateTBodyPlaylists(infos));
        }
    }
    $('#tBody-playlists').on('click', 'tr', function (event) {
        var id = $(this).data('id');
        gotoRoute(routesEnum.SINGLE_PLAYLIST, id);
    });
});

function generateTBodyPlaylists(playlists) {
    var idPlaylist, nomPlaylist, nbTitres, html = "";

    for (var i = 0, max = playlists.length; i < max; i++) {
        idPlaylist = playlists[i].idPlaylist;
        nomPlaylist = playlists[i].nomPlaylist;
        nbTitres = playlists[i].nbTitres;

        html += '<tr data-id="' + idPlaylist + '">';
        html += "<td>" + (i + 1) + "</td>";
        html += '<td>' + nomPlaylist + '</td>';
        html += '<td>' + nbTitres + '</td>';
        html += "</tr>";

    }
    return html;
}

function getPlaylists() {
    var output = false;
    $.post({
        url: './http/getPlaylists.php',
        async: false,
        data: {getPlaylists: true},
        success: function (response) {
            console.log(response);
            var infos = $.parseJSON(response);
            output = infos;
            console.log(output);
        }
    });
    return output;
}

