/* 
 
 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: home.js
 * Fonction	: Gestion de la page d'accueil (#home)
 
 */

$(function () {
    var libraryInfos = getUserLibrary();
    if (Array.isArray(libraryInfos)) {
        console.log(libraryInfos);
        $('#nbFriends').html(libraryInfos[0].nbAmis);
        $('#nbTracks').html(libraryInfos[0].nbTitres);
        $('#nbAlbums').html(libraryInfos[0].nbAlbums);
    }
});

function getUserLibrary() {
    var output = false;
    $.post({
        url: './http/getUserLibrary.php',
        async: false,
        data: {getUserLibrary: true},
        success: function (response) {
            var infos = $.parseJSON(response);
            output = infos;
        }
    });
    return output;
}
