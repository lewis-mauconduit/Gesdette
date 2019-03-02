'use strict';

$('header').css('font-size','1em');
/****Afficher formulaire d'ajout de dette ou créance********/

        //ne pas afficher les deux forms en même temps

$('#showFormAddCreance').on('click', function(){
    
    if ($('#showFormAddDebt').attr('clicked') == 'false'){
        if($(this).attr('clicked') == 'false'){
            $('#addCreance').removeClass('hidden');
            $(this).attr('clicked', 'true');
        }
        else {
            $('#addCreance').addClass('hidden');
            $(this).attr('clicked', 'false');
        }
    }
    else {
        $('#addDebt').addClass('hidden');
        $('#showFormAddDebt').attr('clicked', 'false');
        $('#addCreance').removeClass('hidden');
        $(this).attr('clicked', 'true');
    }
});

$('#showFormAddDebt').on('click', function(){
    
    if ($('#showFormAddCreance').attr('clicked') == 'false'){
        if($(this).attr('clicked') == 'false'){
            $('#addDebt').removeClass('hidden');
            $(this).attr('clicked', 'true');
        }
        else {
            $('#addDebt').addClass('hidden');
            $(this).attr('clicked', 'false');
        }
    }
    else {
        $('#addCreance').addClass('hidden');
        $('#showFormAddCreance').attr('clicked', 'false');
        $('#addDebt').removeClass('hidden');
        $(this).attr('clicked', 'true');
    }
});


/****Masquer formulaire d'ajout de dette ou créance********/

$('#buttonCancelAddDebt').on('click', function(){
    $('#addDebt').addClass('hidden');
    $('#showFormAddDebt').attr('clicked', 'false');
    this.form.reset();
});
$('#buttonCancelAddCreance').on('click', function(){
    $('#addCreance').addClass('hidden');
    $('#showFormAddCreance').attr('clicked', 'false');
    this.form.reset();
});

/****Afficher la rubrique détails********/

var boxs = $('#showBoth, #chart, #detailsElement');
var small = $('.infosDates');

$('.buttonShowDetailsDebt').on('click', function(){

    $('#detailsElement_formReimbursement').addClass('hidden');
    $('#confirmDelete').addClass('hidden');

    if($(this).attr('clicked') == 'false'){
        $('#detailsElement').removeClass('hidden');
        boxs.removeClass('grid2');
        boxs.addClass('grid3');
        small.addClass('hidden');
        $(this).attr('clicked', 'true');
    }
    else {
        $('#detailsElement').addClass('hidden');
        boxs.removeClass('grid3');
        small.removeClass('hidden');
        boxs.addClass('grid2');
        $(this).attr('clicked', 'false');
    }

});

$('.buttonShowDetailsCreance').on('click', function(){

    $('#detailsElement_formReimbursement').addClass('hidden');
    $('#confirmDelete').addClass('hidden');

    if($(this).attr('clicked') == 'false'){
        $('#detailsElement').removeClass('hidden');
        boxs.removeClass('grid2');
        boxs.addClass('grid3');
        small.addClass('hidden');
        $(this).attr('clicked', 'true');
    }
    else {
        $('#detailsElement').addClass('hidden');
        boxs.removeClass('grid3');
        small.removeClass('hidden');
        boxs.addClass('grid2');
        $(this).attr('clicked', 'false');
    }

});