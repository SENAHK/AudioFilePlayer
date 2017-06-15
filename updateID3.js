/* 
 
 * Auteur	: Michael Ramusi
 * Date         : 8 juin 2017 
 * Projet	: AudioFilePlayer
 * Copyright	: TPI 2017 - Michael RAMUSI
 * Fichier	: updateID3.js
 * Fonction	: Gère la modification des métadonnées par le biais du formulaire
 *                affiché sur modalUpdateMeta.html
 
 */

$(function () {
    $('#modal-meta-validation').modal('show');

    // When the modal is closed
    $("#modal-meta-validation").on("hidden.bs.modal", function () {
        // Generate the html used to update the id3 metadatas
        $('#modal-update').append(generateFormGroup(incompleteSongs));
        $('#app').hide();
        $('#app').show('slow');
    });

    $('#btnUpload').click(function (event) {
        if (location.hash == "#upload/") {
            alert("Veuillez d'abord envoyer les fichiers en cours de dépot");
        }
    });

    $('#modal-update').on('click', 'button', function (event) {
        if (detectEmptyInputs("#modal-update input[type=text]")) {
            var updatedSongs = updateMetadatas('#modal-update input[type=text]', incompleteSongs);
            var mergedSongs = updatedSongs.concat(uploadedSongs);
            uploadFiles('#inputFile', mergedSongs);
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
    var cpt = 0;
    for (var i = 0; i < incompleteDatas.length; i++) {

        var keys = Object.keys(incompleteDatas[i]);

        for (var y = 0; y < keys.length - 1; y++) {
            var newValue = newMetas[cpt];
            incompleteDatas[i][keys[y]] = newValue;
            cpt++;
        }
    }
    return incompleteDatas;
}

/**
 * adds a bootstrap error highlight if the input is empty
 * @param {type} selector
 * @returns {Boolean}
 */
function detectEmptyInputs(selector) {
    var flag = true;
    $(selector).each(function (i) {
        var val = $(this).val();
        var formGroup = $(this).parent().parent();
        if (val === "" || !validateString(val)) {
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
        html += "<div class='file-separation'>"
        html += '<h4 class="mb"><i class="fa fa-angle-right"></i>File: ' + data.filename + '</h4>';
        $.each(data, function (index, value) {
            if (index != 'filename') {
                if (value == null) {
                    value = "";
                    html += '<div class="form-group has-error">';
                    html += '<label class="col-sm-2 control-label col-lg-2">' + index.toUpperCase() + '</label>';
                    html += '<div class="col-lg-10"><input type="text" class="form-control" class="inputError" value="' + value + '"></div>';
                    html += '</div>';
                }
                else {
                    html += '<div class="form-group">';
                    html += '<label class="col-sm-2 control-label col-lg-2">' + index.toUpperCase() + '</label>';
                    html += '<div class="col-lg-10"><input type="text" class="form-control" class="inputError" value="' + value + '"></div>';
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