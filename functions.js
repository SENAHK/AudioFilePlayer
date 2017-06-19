/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 15 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: functions
 * Fonction	:
 
 */

function initialize() {
    window.audioPlayer = new Player(document.createElement('audio'));
    window.connectedUser = "";
    window.connectedUser = getUserSession();
    window.incompleteSongs = [];
    window.uploadedSongs = [];
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
        $(context).hide();
        $(context).show('slow');
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

function validateString(input) {
    var expression = /^[a-zA-Z0-9]+$/;
    return input.match(expression);
}
function writeError(selector, message) {
    $(selector).parent().find('.alert').remove();
    $(selector).val("");
    $(selector).after('<div class="alert alert-danger" id="errorMsg"><span id="helpBlock" class="help-block">' + message + '</span></div>');
}
function getAvatar() {
    $.post({
        url: './http/getAvatar.php',
        data: {getAvatar: true},
        cache: false,
        async: false,
        success: function (response) {
//            console.log(response);
            if (response != 0) {
                console.log(response);
                $('#profile-img').attr('src', response);
            }
        }
    });
}