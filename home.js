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
                    console.log(songTags);
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

        var form = $('form')[0]; // You need to use standard javascript object here
        var formData = new FormData(form);
        uploadFiles(formData);
    });
    $('#btnUpload').click(function () {
        mergeArray(uploadedSongs, songNames);

        var form = $('form')[0]; // You need to use standard javascript object here
        var formData = new FormData(form);
        uploadFiles(formData);
    });
});
function uploadFiles(form) {
    console.log(form);
    $.post({
        url: './http/uploadFiles.php',
        //type: 'post',
        data: {data: form},
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        success: function (response) {
            alert(response);
        }, error: function (jqXHR, textStatus, errorThrown) {
            alert('error');
        }
    });
}

function mergeArray(songs, names) {
    for (var i = 0; i < names.length; i++) {
        $.extend(songs[i], names[i]);
    }
    console.log(uploadedSongs);
}