/* 
 
 * Auteur	: Michael Ramusi
 * Date         : 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: upload.js
 * Fonction	: Gère l'envoi au serveur des fichiers .mp3 déposés par l'utilisateur
 
 */


$(function () {
    uploadedSongs = [];
    $('#titleUser').html(connectedUser.toUpperCase());

    $('#logout').click(function () {
        connectedUser = "";
    });

    $('#inputFile').change(function (e) {
        uploadedSongs = [];
        var files = e.target.files;
        readMeta(files, 0);
    });

    $('#formUpload').submit(function (e) {
        e.preventDefault();
        console.log(uploadedSongs);

        var incompleteFiles = getIncompleteFiles(uploadedSongs);
        // Si des fichiers sont incomplets
        if (incompleteFiles.length > 0) {
            window.incompleteSongs = incompleteFiles;
            gotoRoute(routesEnum.UPLOAD);
        } else {
            uploadFiles('#inputFile', uploadedSongs);
        }
    });
});


function readMeta(array, index)
{
    window.jsmediatags.read(array[index], {
        onSuccess: function (tag) {
            var songTags = {
                title: tag.tags.title,
                artist: tag.tags.artist,
                album: tag.tags.album,
                filename: array[index].name
            };
            uploadedSongs.push(songTags);
            if (index < array.length - 1) {
                var newIndex = index + 1;
                readMeta(array, newIndex);
            }
        }
    });
}

function getIncompleteFiles(files) {
    var incompleteFiles = [];
    $.each(files, function (index, file) {
        $.each(file, function (ind, value) {
            if (value == null) {
                incompleteFiles.push(file);
                files.splice(index, 1);
                return false;
            }
        });
    });
    return incompleteFiles;
}

function uploadFiles(fileInput, id3Array) {
    fileInput = $(fileInput)[0];
    var frmData = new FormData();

    for (var i = 0; i < fileInput.files.length; i++) {
        frmData.append('files[]', fileInput.files[i]);
        frmData.append('id3[]', JSON.stringify(id3Array[i]));
    }

    console.log(id3Array);
    $.ajax({
        url: './http/uploadFiles.php',
        data: frmData,
        type: 'post',
        contentType: false,
        processData: false,
        success: function (response) {
            if (!response) {
                alert('Upload failed. Try again or contact administrator.')
            } else {
                $(fileInput).val('');
                alert('Upload succeed');
                gotoRoute(routesEnum.HOME);
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            alert('Connection to the server failed, contact administrator.');
        }
    });
}
