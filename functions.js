/* 
 
 * Auteur	: Michael Ramusi
 * Date	: 15 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: functions
 * Fonction	:
 
 */


function validateString(input) {
    var expression = /^[^\\\/&<>" "]*$/;
    return input.match(expression);
}
function writeErrors(selector, message) {
    $(selector).parent().find('.alert').remove();
    $(selector).val("");
    $(selector).after('<div class="alert alert-danger" id="errorMsg"><span id="helpBlock" class="help-block">' + message + '</span></div>');
}