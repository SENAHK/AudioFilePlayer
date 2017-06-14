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

        var tBody = generateTBody(tracks);
        $('#tBody-single-album').html(tBody);
        $('#single_album h4').append(tracks[0].nomAlbum);




        $('#single_album').on('click', 'tr', function (event) {
            window.audioPlayer.Init(tracks);
            var id = $(this).data('id');
            window.audioPlayer.SetPos(id);
            window.audioPlayer.Play();
        });
//
//        $(window.audioPlayer.audio).on("ended", function () {
//            window.audioPlayer.Next();
//        });






    }
});

function generateTBody(tracks) {
    var nomArtiste, idTitre, nomTitre, fichierTitre, html = "";

    for (var i = 0, max = tracks.length; i < max; i++) {
        nomArtiste = tracks[i].nomArtiste;
        idTitre = tracks[i].idTitre;
        nomTitre = tracks[i].nomTitre;
        fichierTitre = tracks[i].fichierTitre;

        html += '<tr data-id="' + i + '">';
        html += "<td>" + (i + 1) + "</td>";
        html += '<td>' + nomTitre + '</td>';
        html += '<td>' + nomArtiste + '</td>';
        html += "</tr>";

    }
    return html;
}


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