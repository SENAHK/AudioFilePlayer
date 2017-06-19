/*  
 * Auteur	: Michael Ramusi
 * Date         : juin 2017
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: login.js
 * Fonction	: Gestion des fonctions de login ET d'inscription
 */
$(function () {
    if (getUserSession() != "") {
        gotoRoute(routesEnum.HOME);
    }

    // Login
    $('#login').submit(function (e) {
        e.preventDefault();
        var user = $('#user').val();
        var mdp = $('#mdp').val();
        if (validateString(user)) {


            // Call ajax to check login on server-side
            $.ajax({
                type: 'post',
                url: 'http/logUser.php',
                data: {
                    user: user,
                    mdp: mdp
                },
                success: function (response) {
                    // The server accepted the user connection
                    if (response > 0) {
                        connectedUser = user;
                        $('#profile-image').attr('src', getAvatar());
                        gotoRoute(routesEnum.HOME);
                    }
                    if (response == 0) {
                        writeErrors("#error", "Wrong username or password");
                    }
                    if (response < 0) {
                        writeErrors("#error", "Connection error");
                    }
                }, error: function (response) {
                    writeErrors("#error", "Connection error");
                }

            });
        } else {
            alert('caractères interdits');
        }
    });

    // Register
    $('#registerDiv').submit(function (e) {
        e.preventDefault();

        var user = $('#registerUser').val();
        var mdp = $('#registerMdp').val();
        var mdp2 = $('#registerMdp2').val();
        var usernameExists = getUsername(user);
        if (validateString(user)) {
            if (usernameExists) {
                writeErrors("#errorRegister", "Username already used");
            } else {
                if (mdp == mdp2) {
                    insertUser(user, mdp);
                } else {
                    writeErrors("#errorRegister", "Passwords don't match");
                }

            }
        } else {
            alert('username contains forbidden caracters');
        }

    });

    $('#createAccount').click(function () {
        $('#login').hide();
        $('#registerDiv').show("slow");
    });
    $('#loginPage').click(function () {
        $('#registerDiv').hide();
        $('#login').show("slow");
    });
});

/**
 * ajax call to check if user exists
 * @param {type} user
 * @returns {jqXHR.responseText}
 */
function getUsername(user) {
    return $.ajax({
        cache: false,
        type: 'get',
        url: './http/checkUsername.php',
        async: false,
        data: {
            user: user
        }
    }).responseText;
}
/**
 * ajax call to insert a user in the db
 * @param {type} user
 * @param {type} password
 * @returns {undefined}
 */
function insertUser(user, password) {
    $.ajax({
        type: 'get',
        url: './http/insertUser.php',
        data: {user: user, mdp: password},
        success: function (response) {
            if (response == 1) {
                alert("inscription reussie, connecté en tant que: " + user);
                connectedUser = getUserSession();
                $('#titleUser').html(user.toUpperCase());
                gotoRoute(routesEnum.HOME);
            } else {
                this.error(response);
            }
        }, error: function (response) {
            writeErrors("#errorRegister", response);
        }
    });
}
/**
 * write a bootstrap error
 * @param {type} selector
 * @param {type} message
 * @returns {undefined}
 */
function writeErrors(selector, message) {
    $('input[type="password"]').val("");
    $(selector).html('<div class="alert alert-danger" id="errorMsg"><span id="helpBlock" class="help-block">' + message + '</span></div>');
}

