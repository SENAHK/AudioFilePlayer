/* 
 
 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: single_artist.js
 * Fonction	: controleur de la page single_artist.html
 
 */


$(function () {
    var infos = false;
    // get the id in the hash
    var idArtist = location.hash.split('#artiste/')[1].trim();

    if (isInteger(idArtist)) {
        infos = getAlbumsOfArtist(idArtist);
    }


    if (!infos) {
        alert('Connection error with the db.');
    } else {
        $('#title-single_artist').append(infos[0].nomArtiste + '\'s albums');
        for (var i = 0, max = infos.length; i < max; i++) {
            var tile = generateTileAlbum(infos[i].nomAlbum, infos[i].idAlbum, infos[i].nbTitres);
            $('#list-single_artist').append(tile);
        }
    }
    // click on a album
    $('#list-tiles').on('click', '.album-tile', function (event) {
        var id = $(this).data('idalbum');
        // go to the page of the selected album
        gotoRoute(routesEnum.SINGLE_ALBUM, id);
    });
});


/**
 * show the album of the artist
 * @param {type} nameAlbum
 * @param {type} idAlbum
 * @param {type} nbTitres
 * @returns {String}
 */
function generateTileAlbum(nameAlbum, idAlbum, nbTitres) {
    var html = '<div class="col-lg-4 col-md-4 col-sm-4 mb">';
    html += '<div class="content-panel pn">';
    html += '<div class="album-tile" data-idalbum="' + idAlbum + '">';
    html += '<div class="col-xs-4 col-xs-offset-8">';
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
/**
 * AJAX to retrieve all the albums of an artist
 * @param {type} idArtist
 * @returns {Boolean|infos}
 */
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