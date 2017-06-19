/* 
 
 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: single_album.js
 * Fonction	: controleur de la page single_album.html
 
 */

$(function () {
    var tracks = false;
    // retrieve the id of the album in the hash
    var idAlbum = location.hash.split('#album/')[1].trim();
    if (isInteger(idAlbum)) {

        tracks = getTracks(idAlbum);

        var tBody = generateTBody(tracks);
        $('#tBody-single-album').html(tBody);
        $('#single_album h4').append(tracks[0].nomAlbum);
        
        // click on button play
        $('#single_album').on('click', '.play-song', function (event) {
            // play the song 
            window.audioPlayer.Init(tracks);
            var id = $(this).data('id');
            window.audioPlayer.SetPos(id);
            window.audioPlayer.Play();
        });
        // click on button add playlist
        $('#single_album').on('click', '.add-playlist', function (event) {
            var id = $(this).data('id');
            // go to the page of playlist update
            gotoRoute(routesEnum.UPDATE_PLAYLIST, id);
        });
    }
});
/**
 * generate the table to show the tracks
 * @param {type} tracks
 * @returns {String}
 */
function generateTBody(tracks) {
    var nomArtiste, idTitre, nomTitre, fichierTitre, html = "";

    for (var i = 0, max = tracks.length; i < max; i++) {
        nomArtiste = tracks[i].nomArtiste;
        idTitre = tracks[i].idTitre;
        nomTitre = tracks[i].nomTitre;
        fichierTitre = tracks[i].fichierTitre;

        html += '<tr>';
        html += "<td>" + (i + 1) + "</td>";
        html += '<td>' + nomTitre + '</td>';
        html += '<td>' + nomArtiste + '</td>';
        html += '<td><button type="button" class="btn btn-theme03 add-playlist" data-id="' + idTitre + '"><i class="fa fa-plus"></i> to playlist</button>';
        html += "<span>   </span>";
        html += '<button type="button" class="btn btn-theme03 play-song" data-id="' + i + '"><i class="fa fa-play"></i> Play</button></td>';
        html += "</tr>";

    }
    return html;
}


/**
 * AJAX call to retrieve the tracks of an album
 * @param {type} id
 * @returns {Boolean|infos}
 */
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