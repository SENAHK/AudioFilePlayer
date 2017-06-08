var jsmediatags = window.jsmediatags;
var uploadedSongs = [];
var songNames = [];
var songTags = {};
$(function () {

    $('#titleUser').html(connectedUser);

    $('#logout').click(function () {
        connectedUser = "";
    });
    $('#inputFile').change(function (e) {
        uploadedSongs = [];
        for (var i = 0; i < e.target.files.length; i++) {
            songNames.push({filename: e.target.files[i].name});
            jsmediatags.read(e.target.files[i], {
                onSuccess: function (tag) {
                    songTags = {
                        title: tag.tags.title,
                        artist: tag.tags.artist,
                        album: tag.tags.album,
                        year: tag.tags.year
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
        if (incompleteFiles.length > 0) {
            window.incompleteSongs = incompleteFiles;
            gotoRoute(routesEnum.UPLOAD);
        } else {
            var fileInput = $('#inputFile')[0];
            var frmData = new FormData();

            for (var i = 0; i < fileInput.files.length; i++) {
                frmData.append('files[]', fileInput.files[i]);
                frmData.append('id3[]', JSON.stringify(uploadedSongs[i]));
            }

            //uploadFiles(frmData);
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




function uploadFiles(form) {
    $.ajax({
        url: './http/uploadFiles.php',
        data: form,
        type: 'post',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        success: function (response) {
            response = $.parseJSON(response);
            console.log(response);
            //alert(response);
        }, error: function (jqXHR, textStatus, errorThrown) {
            alert('error');
        }
    });
}

function mergeArray(songs, names) {
    for (var i = 0; i < names.length; i++) {
        $.extend(songs[i], names[i]);
    }
}