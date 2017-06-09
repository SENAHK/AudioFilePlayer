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
    $('#modal-meta-validation').modal('show');
    
    $('#btnModal').click(function () {
        $('#app').append(generateFormGroup(incompleteSongs));
        $('#app').hide();
        $('#app').show('slow');
    });
    
    $('#btnUpload').click(function () {
        if (location.hash == "#upload") {
            alert("Veuillez d'abord envoyer les fichiers en cours de dépot");
        }
    });
    
    $('#validate').click(function () {
        if (detectEmptyInputs("input[type=text]")) {
            uploadedSongs = updateMetadatas('input[type=text]', incompleteSongs);
            uploadFiles('#inputFile', 'files[]', 'id3[]');
            window.alert('Fichiers déposés');
        } else {
            window.alert('Des champs sont vides');
        }
    });
});



function updateMetadatas(selector, incompleteDatas) {
    var newMetas = [];

    $(selector).each(function (i) {
        newMetas.push($(this).val());
    });

    for (var i = 0; i < incompleteDatas.length; i++) {

        var keys = Object.keys(incompleteDatas[i]);

        for (var y = 0; y < keys.length; y++) {
            var newValue = newMetas[i + y];
            incompleteDatas[i][keys[y]] = newValue;
        }

    }
    return incompleteDatas;
}

function retrieveDatas(selector) {

}

/**
 * adds a bootstrap error highlight if the input is empty
 * @param {type} selector
 * @returns {Boolean}
 */
function detectEmptyInputs(selector) {
    var flag = true;
    $(selector).each(function (i) {
        var formGroup = $(this).parent().parent();
        if ($(this).val() === "") {
            formGroup.addClass('has-error');
            flag = false;
        } else {

            formGroup.removeClass('has-error');
        }
    });
    return flag;
}
function generateFormGroup(datas) {
    var html = '<div class="form-panel">';
    html += '<div class="row mt">';
    html += '<div class="col-lg-12">';
    $.each(datas, function (index, data) {
        console.log(data);
        html += "<div class='file-separation'>"
        html += '<h4 class="mb"><i class="fa fa-angle-right"></i>File: ' + data.filename + '</h4>';
        $.each(data, function (index, value) {
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
        html += '</div>';
    });
    html += '<button type="button" id="validate" class="btn btn-theme btn-lg btn-block">Valider</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}