/* 
 
 * Auteur	: Michael Ramusi
 * Date         : 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: upload.js
 * Fonction	: Gère l'envoi au serveur des fichiers .mp3 déposés par l'utilisateur
 
 */

var jsmediatags = window.jsmediatags;
var songNames = [];
var songTags = {};
$(function () {
    uploadedSongs = [];
    $('#titleUser').html(connectedUser.toUpperCase());

    $('#logout').click(function () {
        connectedUser = "";
    });

    $('#inputFile').change(function (e) {
        uploadedSongs = [];
        songNames = [];
        for (var i = 0; i < e.target.files.length; i++) {
            songNames.push({filename: e.target.files[i].name});
            jsmediatags.read(e.target.files[i], {
                onSuccess: function (tag) {
                    songTags = {
                        title: tag.tags.title,
                        artist: tag.tags.artist,
                        album: tag.tags.album
                    };
                    uploadedSongs.push(songTags);
                },
                onError: function (error) {
                    console.log(error);
                }
            });
        }
    });

    $('#formUpload').submit(function (e) {
        e.preventDefault();
        mergeArray(uploadedSongs, songNames);

        var incompleteFiles = getIncompleteFiles(uploadedSongs);
        // Si des fichiers sont incomplets
        console.log(incompleteFiles.length);
        if (incompleteFiles.length > 0) {
            window.incompleteSongs = incompleteFiles;
            gotoRoute(routesEnum.UPLOAD);
        } else {
            uploadFiles('#inputFile', 'files[]', 'id3[]');
        }
    });
});

function getIncompleteFiles(files) {
    var incompleteFiles = [];

    $.each(files, function (index, file) {
        $.each(file, function (index, value) {
            if (value == null) {
                incompleteFiles.push(file);
                return false;
            }
        });
    });
    return incompleteFiles;
}

function uploadFiles(fileInput, filesArray, id3Array) {
    fileInput = $(fileInput)[0];
    var frmData = new FormData();

    for (var i = 0; i < fileInput.files.length; i++) {
        frmData.append(filesArray, fileInput.files[i]);
        frmData.append(id3Array, JSON.stringify(uploadedSongs[i]));
    }
    $.ajax({
        url: './http/uploadFiles.php',
        data: frmData,
        type: 'post',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            if (!response) {
                alert('Upload failed. Try again or contact administrator.')
            } else {
                $(fileInput).val('');
                alert('Upload succeed');
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            alert('Connection to the server failed, contact administrator.');
        }
    });
}


function mergeArray(songs, names) {
    for (var i = 0; i < names.length; i++) {
        $.extend(songs[i], names[i]);
    }
}