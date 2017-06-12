/* 
 
 * Auteur	: Michael Ramusi
 * Date         : 12 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: artistes
 * Fonction	: Gestion de la page artistes (route #artistes)
 */

$(function () {
    $('#list-artistes').on('click', '.artist-tile', function (event) {

    });
});

function generateTile(nameArtist, idArtist, context, nbAlbums, nbTitres) {
    var html = '<div class="col-lg-4 col-md-4 col-sm-4 mb artist-tile>"';
    html += '<div class="white-panel pn">';
    html += '<div class="white-header">'
    html += '<h5>' + nameArtist + '</h5>'
    html += '</div>';
    html += '<div class="row>"';
    html += '<div class="col-md-6">';
    html += '<p class="small mt"># d\'albums</p>';
    html += '<p>' + nbAlbums + '</p>';
    html += '</div>';
    html += '<div class="col-md-6">';
    html += '<p class="small mt"># de titres</p>';
    html += '<p>' + nbTitres + '</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
}

function getArtistesInfos() {
    $.post({
        cache: false,
        url: './http/getArtistesInfos.php',
        async: false,
        data: {
            user: user
        }
    }).responseText;
}