/* 
 
 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: albums.js
 * Fonction	: Gestion de la page des albums
 
 */

$(function () {

    var infos = getAlbums();
    console.log(infos);
    if (Array.isArray(infos)) {
        $('#list-albums').append(generateTilesAlbums(infos));
    }
    // click of a tile
    $('#list-albums').on('click', '.album-tile', function (event) {
        var id = $(this).data('id');
        // get the id of the album, and change the route
        gotoRoute(routesEnum.SINGLE_ALBUM, id);
    });
});


/**
 * Create the albums tiles
 * @param {type} albums the albums to show
 * @returns {String}
 */
function generateTilesAlbums(albums) {
    var html = "";
    var album = "";
    for (var i = 0; i < albums.length; i++) {
        album = albums[i];
        html += '<div class="col-lg-4 col-md-4 col-sm-4 mb">';
        html += '<div class="content-panel pn">';
        html += '<div class="album-tile" data-id="' + album.idAlbum + '">';
        html += '<div class="col-xs-4 col-xs-offset-8">';
        html += '</div>';
        html += '<div class="sp-title">';
        html += '<h3>' + album.nomAlbum + '</h3>';        
        html += '<h4>by ' + album.nomArtiste + '</h4>';
        html += '</div>';
        html += '</div>';
        if (album.nbTitres > 1)
            html += '<p class="followers">' + album.nbTitres + ' tracks</p>';
        else
            html += '<p class="followers">' + album.nbTitres + ' track</p>';
        html += '</div>';
        html += '</div>';
    }
    
    return html;
}
/**
 * AJAX call to retrieve the albums of the user
 * @returns {Boolean|infos}
 */
function getAlbums() {
    var output = false;
    $.post({
        url: './http/getAlbums.php',
        async: false,
        data: {getAlbums: true},
        success: function (response) {
            var infos = $.parseJSON(response);
            output = infos;
        }
    });
    return output;
}
