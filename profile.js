/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 16 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: profile
 * Fonction	:
 
 */
$(function () {
    // User changes his nickname
    $('#frm-profile').submit(function (e) {
        e.preventDefault();
        console.log('ok');
        var newNickname = $('#nickname').val();

        if (validateString(newNickname)) {
            if (newNickname.length > 3) {
                updateNickname(newNickname);
            } else {
                alert('Nickname should be at least 4 characters');
            }
        } else {
            alert('Forbidden characters');
        }
    });

    // User changes his avatar
    $('#frm-avatar').submit(function (e) {
        e.preventDefault();
        if (checkNumberFiles('#upload-avatar', 1)) {
            alert('You can only upload 1 file');
        } else {
            if (filesAreTooBig($('#upload-avatar')[0].files, 5242880)) {
                alert('Your file can\'t be greather than 5MB');
            } else {
                uploadAvatar('#upload-avatar');
            }
        }
    });
});
function uploadAvatar(input) {
    var file = $(input)[0];
    var frmData = new FormData();
    frmData.append('avatar', file.files[0]);

    $.post({
        url: './http/uploadAvatar.php',
        data: frmData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);
            response = parseInt(response);
            $(input).val('');
            switch (response) {
                case -1:
                    alert('Your file is not an image !');
                    break;
                case -2:
                    alert('Your file is too big, max 5MB');
                    break;
                case 1:
                    {
                        alert('You just changed your avatar');
                        $('#profile-img').attr('src', getAvatar());
                    }
                    break;
                case 0:
                    alert('Upload error.')
                    break;
            }

        }
    });
}

function checkNumberFiles(input, maxNumber) {
    return (parseInt($(input).get(0).files.length) > maxNumber)
}
function updateNickname(name) {
    $.post({
        url: './http/updateName.php',
        data: {nickname: name},
        success: function (response) {
            console.log(response);
            if (response > 0) {
                alert('Nickname updated');
                $('#titleUser').html(name.toUpperCase());
            } else {
                if (response == 0) {
                    alert('connection error.');
                } else {
                    alert('nickname exists');
                }
            }
        }, error: function () {
            alert('connection error.');
        }
    });
}

