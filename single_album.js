/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 13 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: single_album.js
 * Fonction	:
 
 */

$(function () {
    var tracks = false;
    var idAlbum = location.hash.split('#album/')[1].trim();
    
    if (isInteger(idAlbum)) {        
        tracks = getTracks(idAlbum);
        console.log(tracks);
        
        //generateTable(tracks);
    }




});



function isInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}

function getTracks(id) {
    var output = false;
    $.post({
        url: './http/getTracksOfAlbum.php',
        async: false,
        data: {idAlbum: id},
        success: function (response) {
            var infos = $.parseJSON(response);
            output = infos;
        }
    });
    return output;

}