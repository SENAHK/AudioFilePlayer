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
        // if user tries to upload something else
        if (location.hash == "#upload/") {
            alert("Veuillez d'abord envoyer les fichiers en cours de dépot");
        }
    });
    // when the user has closed the modal box
    $('#modal-update').on('click', 'button', function (event) {
        // if all the input have values
        if (detectEmptyInputs("#modal-update input[type=text]")) {
            // get the updated songs datas
            var updatedSongs = updateMetadatas('#modal-update input[type=text]', incompleteSongs);
            // merge the updated songs with the ones that were already correct
            var mergedSongs = updatedSongs.concat(uploadedSongs);
            uploadFiles('#inputFile', mergedSongs);
        } else {
            window.alert('Des champs sont vides');
        }
    });
});


/**
 * replaces the old values of the array by the new ones 
 * @param {type} selector the selector to iterate into
 * @param {type} incompleteDatas the datas to process
 * @returns {unresolved}
 */
function updateMetadatas(selector, incompleteDatas) {
    var newMetas = [];
    // foreach html element
    $(selector).each(function (i) {
        // get the value of the element
        newMetas.push($(this).val());
    });
    var cpt = 0;
    // create an array the same type of the songs but with the new values
    for (var i = 0; i < incompleteDatas.length; i++) {

        var keys = Object.keys(incompleteDatas[i]);

        // length -1 to skip the 'filename' property
        for (var y = 0; y < keys.length -1; y++) {
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
        if (val === "" || !validateForbidden(val)) {
            formGroup.addClass('has-error');
            flag = false;
        } else {
            formGroup.removeClass('has-error');
        }
    });
    return flag;
}
/**
 * generate the forms of the incomplete files
 * @param {type} datas
 * @returns {String}
 */
function generateFormGroup(datas) {
    var html = '<div class="form-panel div-update">';
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