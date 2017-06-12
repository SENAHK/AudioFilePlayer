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
        for (var i = 0, max = infos.length; i < max; i++) {
            var tile = generateTile(infos[i].nomArtiste, infos[i].nbAlbums, infos[i].idArtiste);
            $('#list-tiles').append(tile);
        }
    }




    $('#list-tiles').on('click', '.artist-tile', function (event) {
        var id = $(this).data('idartist');
        console.log(id);
        gotoRoute(routesEnum.SINGLE_ARTISTE, id);
    });
});

function generateTile(nameArtist, nbAlbums, idArtist) {
    var html = '<div class="col-lg-4 col-md-4 col-sm-4 mb artist-tile" data-idartist="' + idArtist + '">';
    html += '<div class="white-panel pn">';
    html += '<div class="white-header">';
    html += '<h5>' + nameArtist + '</h5>';
    html += '</div>';
    html += '<div class="row>"';
    html += '<div class="col-md-12">';
    html += '<p class="small mt"># d\'albums</p>';
    html += '<p>' + nbAlbums + '</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}

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
