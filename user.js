/* 
 
 * Auteur	: Michael Ramusi
 * Date         : 17 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: user.js
 * Fonction	: Gestion de la page d'un utilisateur ami 
 */

$(function () {

    var nameFriend = location.hash.split('#user/')[1].trim();
    var albums = getFriendsAlbums(nameFriend);
    $('#title-userProfile').html(nameFriend.toUpperCase());
    if (Array.isArray(albums)) {
        if (albums.length > 0) {
            $('#list-albums-user').show('slow');
            $('#list-albums-user tbody').append(generateAlbums(albums));
        }
    }


});

function generateAlbums(albums) {
    var album = "";
    var html = "";
    for (var i = 0, max = albums.length; i < max; i++) {
        album = albums[i];
        html += '<tr>';
        html += "<td>" + (i + 1) + "</td>";
        html += '<td>' + album.nomAlbum + '</td>';
        html += '<td>' + album.nomArtiste + '</td>';
        html += "</tr>";
    }
    return html;
}

function getFriendsAlbums(nameFriend) {
    var output = false;
    $.post({
        url: './http/getFriendsAlbums.php',
        async: false,
        data: {friendsName: nameFriend},
        success: function (response) {
            var infos = $.parseJSON(response);
            output = infos;
        }
    });
    return output;
}