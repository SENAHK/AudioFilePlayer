/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 12 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: single_artists
 * Fonction	: Gestion de l'affichage des albums liés à un artiste
 
 */


$(function () {
    var infos = false;
    var idArtist = location.hash.split('#artiste/')[1].trim();

    if (isInteger(idArtist)) {
        infos = getAlbumsOfArtist(idArtist);
    }


    if (!infos) {
        alert('Connection error with the db.')
    } else {
        $('#title-single_artist').append(infos[0].nomArtiste + '\'s albums')
        for (var i = 0, max = infos.length; i < max; i++) {
            var tile = generateTileAlbum(infos[i].nomAlbum, infos[i].idAlbum, infos[i].nbTitres);
            $('#list-single_artist').append(tile);
        }
    }

    $('#list-tiles').on('click', 'button', function (event) {
        var id = $(this).data('idalbum');
        gotoRoute(routesEnum.SINGLE_ALBUM, id);
    });
});

function isInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}

function generateTileAlbum(nameAlbum, idAlbum, nbTitres) {
    var html = '<div class="col-lg-4 col-md-4 col-sm-4 mb">';
    html += '<div class="content-panel pn">';
    html += '<div class="album-tile">';
    html += '<div class="col-xs-4 col-xs-offset-8">';
    html += '<button class="btn btn-sm btn-clear-g" data-idalbum="' + idAlbum + '">SEE TRACKS</button>';
    html += '</div>';
    html += '<div class="sp-title">';
    html += '<h3>' + nameAlbum + '</h3>';
    html += '</div>';
    html += '</div>';
    if (nbTitres > 1)
        html += '<p class="followers">' + nbTitres + ' tracks</p>';
    else
        html += '<p class="followers">' + nbTitres + ' track</p>';
    html += '</div>';
    html += '</div>';
    return html;
}

function getAlbumsOfArtist(idArtist) {
    var output = false;
    $.post({
        url: './http/getAlbumsOfArtist.php',
        async: false,
        data: {getAlbumsOfArtist: idArtist},
        success: function (response) {
            var infos = $.parseJSON(response);
            output = infos;
        }
    });
    return output;
}