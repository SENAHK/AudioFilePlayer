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
        var maxSize = 52428800;
        if (filesAreTooBig(files, maxSize)) {
            $(e.target).val('');
            alert('You can\'t upload more than 50MB of files');
        } else {
            readMeta(files, 0);
        }
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
function filesAreTooBig(files, maxSize) {
    var sum = 0;
    for (var i = 0; i < files.length; i++) {
        sum += files[i].size; //bytes
    }
    return (sum >= maxSize);
}

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
            response = parseInt(response);
            if (response == -1) {
                alert('You can\'t upload more than 50MB of files !');
            }
            if (response == -3) {
                alert('Files must be .mp3');
            }
            if (response == 1) {
                $(fileInput).val('');
                alert('Upload succeed');
                gotoRoute(routesEnum.HOME);
            }
            if (response == -2) {                
                alert('You already have this file in your library.');
            }
            if (response == -1) {
                alert('Upload failed, contact administrator.');
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            alert('Connection to the server failed, contact administrator.');
        }
    });
}
