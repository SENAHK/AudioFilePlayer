/* 
 
 * Auteur	: Michael Ramusi
 * Date         : 8 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: metadatasUpdate.js
 * Fonction	: Gère la modification des métadonnées par le biais du formulaire
 *                affiché sur modalUpdateMeta.html
 
 */
$(function () {

    $('#app').append(generateFormGroup(incompleteSongs))


    $('#validate').click(function () {
        if (detectEmptyInputs("input[type=text]")) {
            window.alert('ok');
        } else {
            window.alert('nok');
        }
    });
});

function detectEmptyInputs(selector) {
    var flag = true;
    $(selector).each(function (i) {
        if ($(this).val() === "") {
            flag = false;
            return false;
        }else{            
            $(this).parent().parent().removeClass('has-error');
        }
    });
    return flag;
}
function generateFormGroup(datas) {
    var html = '<div class="form-panel">';
    html += '<div class="row mt">';
    html += '<div class="col-lg-12">';
    $.each(datas, function (index, data) {
        html += '<h4 class="mb"><i class="fa fa-angle-right"></i>File: ' + data.filename + '</h4>';
        $.each(data, function (index, value) {
            console.log(index);
            if (index != 'filename') {
                if (value == null) {
                    value = "";
                    html += '<div class="form-group has-error">';
                    html += '<label class="col-sm-2 control-label col-lg-2">' + index.toUpperCase() + '</label>';
                    html += '<div class="col-lg-10"><input type="text" class="form-control" id="inputError" value="' + value + '"></div>';
                    html += '</div>';
                }
                else {
                    html += '<div class="form-group">';
                    html += '<label class="col-sm-2 control-label col-lg-2">' + index.toUpperCase() + '</label>';
                    html += '<div class="col-lg-10"><input type="text" class="form-control" id="inputError" value="' + value + '"></div>';
                    html += '</div>';
                }
            }
        });
        html += '<p>&nbsp</p>';
    });
    html += '<button type="button" id="validate" class="btn btn-theme btn-lg btn-block">Valider</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}