/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 16 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: friends
 * Fonction	:
 
 */


$(function () {
    $('#frm-friend').submit(function (e) {
        e.preventDefault();
        var friendToAdd = $('#friendName').val();

        if (validateString(friendToAdd)) {
            addFriend(friendToAdd);
        } else {
            alert('Forbidden characters');
        }
    });
    var friends = getFriends();
    if (Array.isArray(friends)) {
        $('#list-friends').html(generateTilesFriends(friends));
    }

});
function addFriend(name) {
    $.post({
        url: './http/addFriend.php',
        data: {friend: name},
        success: function (response) {
            response = Number(response);
            if (response == 0) {
                alert('connection error.');
            }
            if (response == -1) {
                alert('this person doesnt exist');
            }
            if (response == 2) {
                alert('your are already friend with this person');
            }
            if (response == 1) {
                alert('your are now friends with ' + name);
            }
        }, error: function () {
            alert('connection error.');
        }
    });
}


function getFriends() {
    var output = false;
    $.post({
        url: './http/getFriends.php',
        async: false,
        data: {getFriends: true},
        success: function (response) {
            var infos = $.parseJSON(response);
            output = infos;
        }
    });
    return output;
}
function generateTilesFriends(friends) {
    var html = "";
    console.log(friends);
    for (var i = 0, max = friends.length; i < max; i++) {
        html += '<div class="col-lg-4 col-md-4 col-sm-4 mb">';
        html += '<div class="white-panel pn">';
        html += '<div class="white-header">';
        html += '<h5>' + friends[i].nom.toUpperCase() + '</h5>';
        html += '</div>';
        html += '<p><img src="assets/img/ui-zac.jpg" class="img-circle" width="50"></p>';
        html += '<div class="row">';
        html += '<div class="col-md-6">';
        html += '<p class="small mt">member since</p>';
        html += '<p>2012</p>';
        html += '</div>';
        html += '<div class="col-md-6">';
        html += '<p class="small mt">total spend</p>';
        html += '<p>2012</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}