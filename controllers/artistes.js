/* 
 
 * Auteur	: Michael Ramusi
 * Date         : 12 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: tiles.js
 * Fonction	: Gestion de la page artistes (route #artistes)
 */

$(function () {
    var infos = getArtistesInfos();

    if (!infos) {
        alert('Connection error with the db.')
    } else {
        $('#list-artists').append(generateTile(infos));
    }
    
    // click of a tile
    $('#list-tiles').on('click', '.band-tile', function (event) {
        var id = $(this).data('id');
        // get the id of the artist, and change the route
        gotoRoute(routesEnum.SINGLE_ARTISTE, id);
    });
});
/**
 * generate the tiles of the artits
 * @param {array} artists array of the artists
 * @returns {String}
 */
function generateTile(artists) {
    var html = "";
    var artist = "";
    for (var i = 0; i < artists.length; i++) {
        artist = artists[i];
        html += '<div class="col-lg-4 col-md-4 col-sm-4 mb">';
        html += '<div class="content-panel pn">';
        html += '<div class="album-tile band-tile" data-id="' + artist.idArtiste + '">';
        html += '<div class="col-xs-4 col-xs-offset-8">';
        html += '</div>';
        html += '<div class="sp-title">';
        html += '<h3>' + artist.nomArtiste + '</h3>';
        html += '</div>';
        html += '</div>';
        if (artist.nbAlbums > 1)
            html += '<p class="followers">' + artist.nbAlbums + ' albums</p>';
        else
            html += '<p class="followers">' + artist.nbAlbums + ' album</p>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}
/**
 * AJAX call to retrieve all the informations of the artists
 * @returns {Boolean|infos}
 */
function getArtistesInfos() {
    var output = false;
    $.post({
        url: './http/getArtistesInfos.php',
        async: false,
        data: {getArtistesInfos: true},
        success: function (response) {
            var infos = $.parseJSON(response);
            output = infos;
        }
    });
    return output;
}
