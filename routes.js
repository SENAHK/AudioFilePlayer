/* 
 
 * Auteur	: Michael Ramusi
 * Date         : 8 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: routes.js
 * Fonction	: Gestion du routage des différentes pages du site
 */
initialize();
// Document is ready
$(function () {
    jQuery.ajaxSetup({cache: false});

    // Listen to query hash change
    // in order to be able to go to the right part of the app
    $(window).on('hashchange', function () {
        render(decodeURI(window.location.hash));
    });
    render(decodeURI(window.location.hash));
});
function initialize() {
    window.audioPlayer = new Player(document.createElement('audio'));
    window.connectedUser = "";
    window.connectedUser = getUserSession();
    window.incompleteSongs = [];
    window.uploadedSongs = [];
}
/**
 * Enum for routes
 */
var routesEnum = {
    HOME: 'home/',
    ARTISTES: 'artistes/',
    ALBUMS: 'albums/',
    SINGLE_ALBUM: 'album/',
    SINGLE_ARTISTE: 'artiste/',
    ABOUT: 'about/',
    LOGIN: 'login/',
    LOGOUT: 'logout/',
    UPLOAD: 'upload/',
    PLAYLISTS: 'playlists/',
    SINGLE_PLAYLIST: 'playlist/',
    UPDATE_PLAYLIST: 'updatePlaylist/'
}

/**
 * Change the anchor part of the url (=hash)
 * @param {type} route
 * @param {type} params
 * @returns {undefined}
 */
function gotoRoute(route, params) {
    var myHash = route;
    if (params) {
        myHash += params;
    }
    window.location.hash = myHash;
}

/**
 * This function manages which part of app to show in the single page.
 * @param {string} url decoded url coming from the hashchange event
 * @returns nothing
 */
function render(url) {

    // Get the "anchor"  from the url.
    var anchor = url.split('/')[0];
    if (anchor === "") {
        anchor = "#home";
    }

    // Manage all possibles "routes"
    var routes = {
        '#home': function () {
            // If the user is connected
            if (getUserSession() != "") {
                $('#login-page').remove();
                $('#indexBody').show('slow');

                setActiveLink('');
                $('#app').html('');
                loadHtmlFile('views/upload.html', '#app');
                $('.sub').css('display', 'none');
            } else {
                // Go to the login/register page
                gotoRoute(routesEnum.LOGIN);
            }
        },
        '#artistes': function () {
            if (getUserSession() != "") {
                $('#app').html('');
                loadHtmlFile('views/artists.html', '#app');
                setActiveLink('artistes');
            } else {
                // Go to the login/register page
                gotoRoute(routesEnum.LOGIN);
            }
        },
        '#artiste': function () {
            if (getUserSession() != "") {
                $('#app').html('');
                setActiveLink('artistes');
                loadHtmlFile('views/single_artist.html', '#app');
            } else {
                gotoRoute(routesEnum.HOME);
            }
        },
        '#playlists': function () {
            $('#app').html('');
            setActiveLink('playlists');
            loadHtmlFile('views/playlists.html', '#app');
        },
        '#playlist': function () {
            $('#app').html('');
            loadHtmlFile('views/single_playlist.html', '#app');
        },
        '#updatePlaylist': function () {
            loadHtmlFile('views/modal_update_playlist.html', '#app');
        },
        '#albums': function () {
            setActiveLink('albums');
        },
        '#album': function () {
            if (getUserSession() != "") {
                $('#app').html('');
                loadHtmlFile('views/single_album.html', '#app');
            }
        }
        ,
        '#login': function () {
            $('#indexBody').hide();
            loadHtmlFile('views/log.html', 'body');
        },
        '#logout': function () {
            destroySession();
            gotoRoute(routesEnum.LOGIN);
        },
        '#upload': function () {
            if (getUserSession() != "") {
                if (incompleteSongs.length > 0) {
                    $('#app').html('');
                    loadHtmlFile('views/modalUpdateMeta.html', '#app');
                } else {
                    gotoRoute(routesEnum.HOME);
                }
            } else {
                gotoRoute(routesEnum.LOGIN);
            }
        },
        '#profile': function () {
            if (getUserSession() != "") {
                $('#app').html('');
                loadHtmlFile('views/profile.html', '#app');
            } else {
                gotoRoute(routesEnum.LOGIN);
            }
        },
        '#friends': function () {
            if (getUserSession() != "") {
                $('#app').html('');
                loadHtmlFile('views/friends.html', '#app');
            } else {
                gotoRoute(routesEnum.LOGIN);
            }
        }
    };
    // Execute the needed function depending on the anchor in the url, go to the right route in fact.
    if (routes[anchor]) {
        routes[anchor]();
    }

}
/**
 * append an html file after a DOM element
 * @param {type} file: the html file
 * @param {type} context: the DOM element
 * @returns {undefined}
 */
function loadHtmlFile(file, context) {
    jQuery.ajaxSetup({async: false});
    $.get(file, '', function (data) {
        $(context).append(data);
    });

    jQuery.ajaxSetup({async: true});
}

function setActiveLink(name) {
    var ul = $('ul');
    ul.children().removeClass('active');
    var a = $('a[href="#' + name + '"]');
    a.parent().addClass('active');
    a.removeClass('active');
}

function getUserSession() {
    return $.get({
        url: './http/getSession.php',
        async: false
    }).responseText;
}

function destroySession() {
    $.get({
        url: './http/destroySession.php',
        async: false
    });
}