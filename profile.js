/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 16 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: profile
 * Fonction	:
 
 */
$(function () {
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
});

function updateNickname(name) {
    $.post({
        url: './http/updateName.php',
        data: {nickname: name},
        success: function (response) {
            console.log(response);
            if (response > 0) {
                alert('Nickname updated');
                $('#title-user').html(name.toUpperCase());
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

