var connectedUser = "";
connectedUser = getUserSession();

// Document is ready
$(function () {
    jQuery.ajaxSetup({cache: false});
    //connectedUser = $('#sessionUser').val();
    // Listen to query hash change
    // in order to be able to go to the right part of the app
    $(window).on('hashchange', function () {
        console.log('hash has changed');
        render(decodeURI(window.location.hash));
    });
    render(decodeURI(window.location.hash));
});

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
    LOGOUT: 'logout/'
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
            if (connectedUser != "") {
                $('#login-page').remove();
                $('#indexBody').show('slow');

                loadHtmlFile('views/upload.html', '#app');
            } else {
                // Go to the login/register page
                gotoRoute(routesEnum.LOGIN);
            }
        },
        '#artistes': function () {
            if (connectedUser != "") {
                setActiveLink('artistes');
            } else {
                // Go to the login/register page
                gotoRoute(routesEnum.LOGIN);
            }
        },
        '#playlists': function () {
            setActiveLink('playlists');
        },
        '#albums': function () {
            setActiveLink('albums');
        },
        '#login': function () {
            $('#indexBody').hide();
            loadHtmlFile('views/log.html', 'body');
        },
        '#logout': function () {
            destroySession();
            gotoRoute(routesEnum.LOGIN);
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