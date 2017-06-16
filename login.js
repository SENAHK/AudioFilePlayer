/*  
 * Auteur	: Michael Ramusi
 * Date         : 2017
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
                    //$('#sessionUser').val(user);
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
    });

    // Register
    $('#registerDiv').submit(function (e) {
        e.preventDefault();

        var user = $('#registerUser').val();
        var mdp = $('#registerMdp').val();
        var mdp2 = $('#registerMdp2').val();
        var usernameExists = getUsername(user);

        if (usernameExists) {
            writeErrors("#errorRegister", "Username already used");
        } else {
            if (mdp == mdp2) {
                alert(user);
                insertUser(user, mdp);
            } else {
                writeErrors("#errorRegister", "Passwords don't match");
            }

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

function insertUser(user, password) {
    $.ajax({
        type: 'get',
        url: './http/insertUser.php',
        data: {user: user, mdp: password},
        success: function (response) {
            if (response == 1) {
                connectedUser = user;                
                $('#title-user').html(user.toUpperCase());
                gotoRoute(routesEnum.HOME);
            } else {
                this.error(response);
            }
        }, error: function (response) {
            writeErrors("#errorRegister", response);
        }
    });
}

function writeErrors(selector, message) {
    $('input[type="password"]').val("");
    $(selector).html('<div class="alert alert-danger" id="errorMsg"><span id="helpBlock" class="help-block">' + message + '</span></div>');
}

