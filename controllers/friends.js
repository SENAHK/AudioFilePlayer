/* 
 
 * Auteur	: Michael Ramusi
 * Date         : juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: friends.js
 * Fonction	: Gère la récupération et l'affichage  des amis
 
 */


$(function () {

    showFriends();
    $('#frm-friend').submit(function (e) {
        e.preventDefault();
        var friendToAdd = $('#friendName').val();

        if (validateString(friendToAdd)) {
            addFriend(friendToAdd);
            showFriends();
        } else {
            alert('Forbidden characters');
        }
    });

    // on tile click
    $('.list-user').on('click', function () {
        var username = $(this).data('name');
        // go to the route of the user
        gotoRoute(routesEnum.USER_ALBUMS, username);
    });

});
/**
 * show the friends
 * @returns {undefined}
 */
function showFriends() {
    var friends = getFriends();
    if (Array.isArray(friends)) {
        $('#list-friends').append(generateTilesFriends(friends));

    }
}
function addFriend(name) {
    $.post({
        url: './http/addFriend.php',
        data: {friend: name},
        success: function (response) {
            response = Number(response);
            if (response == 0) {
                alert('Invalid data');
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
            if (response == -2) {
                alert('You can\'t be friend with yourself');
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
        html += '<div class="white-panel pn list-user"  data-name="' + friends[i].nom + '">';
        html += '<div class="white-header">';
        html += '<h5>' + friends[i].nom.toUpperCase() + '</h5>';
        html += '</div>';
        html += '<p><img src="assets/img/ui-zac.jpg" class="img-circle" width="50"></p>';
        html += '<div class="row">';
        html += '<div class="col-md-6">';
        html += '<p class="small mt"># of titles</p>';
        html += '<p>' + friends[i].nbTitres + '</p>';
        html += '</div>';
        html += '<div class="col-md-6">';
        html += '<p class="small mt"># of albums</p>';
        html += '<p>' + friends[i].nbAlbums + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    return html;
}
