'use strict';

/************LISTENERS****************/

$('.buttonShowDetailsDebt').on('click',getJsonDetailsDebt);
$('.buttonShowDetailsCreance').on('click',getJsonDetailsCreance);


/*************FONCTIONS**************/

function createElementDebt(id){

    $('#detailsElement').attr('data-type','debts');
    $('#detailsElement').attr('data-id', id);
    $('#detailsElement_title').html('Détails de la dette');
    $('#detailsElement_thirdParty').html('Créancier :');   
}

function createElementCreance(id){

    $('#detailsElement').attr('data-type','creances');
    $('#detailsElement').attr('data-id', id);
    $('#detailsElement_title').html('Détails de la créance');
    $('#detailsElement_thirdParty').html('Débiteur :');
}

function showInfosFromDb(response){

    var creation_date = response['details']['creation_date'].split('-');
    var deadline_date = response['details']['deadline_date'].split('-');

    $('#detailsElement_name').html(encodeURI(response['details']['name']).replace('%20', ' '));
    $('#detailsElement_creation_date').html(creation_date[2]+'-'+creation_date[1]+'-'+creation_date[0]);
    $('#detailsElement_deadline_date').html(deadline_date[2]+'-'+deadline_date[1]+'-'+deadline_date[0]);
    $('#detailsElement_initial_amount').html(formatMoneyAmount(response['details']['initial_amount'],2,',',' ')+' €');

    if (response['remainingAmount']['remainingAmount'] != undefined){

        $('#detailsElement_remaining_amount').html(formatMoneyAmount(response['remainingAmount']['remainingAmount'],2,',',' ')+' €');
        $('#detailsElement_remaining_amount').attr('data-value',response['remainingAmount']['remainingAmount']);
    }
    else {
        $('#detailsElement_remaining_amount').html(formatMoneyAmount(response['details']['initial_amount'],2,',',' ')+' €');
        $('#detailsElement_remaining_amount').attr('data-value',response['details']['initial_amount']);
    }
}

function showAllReimbursements(response){

    if (response['detailsReimbursement'] != undefined){
        $('.ifReimbursement').removeClass('hidden');
        $('.ifReimbursement').remove();

        for (var i=0 ; i<response['detailsReimbursement'].length ; i++){

            var reimbursement_date = response['detailsReimbursement'][i].creation_date_remboursement.split('-');

            $('#detailsElement tbody').append('<tr class="ifReimbursement"><td>Remboursement du: '+reimbursement_date[2]+'-'+reimbursement_date[1]+'-'+reimbursement_date[0]+'</td><td class="right">'+formatMoneyAmount(response['detailsReimbursement'][i].amount,2,',',' ')+' €</td></tr>');
        }      
    }
    else {
        
        $('.ifReimbursement').empty();
    }
}


    //Affichage des détails de la dette ou de la créance au clic sur le chevron

    function getJsonDetailsDebt(){
        var id = this.dataset.id;
        createElementDebt(id);
        var type = $('#detailsElement').attr('data-type');

        
        $.getJSON(getRequestUrl()+"/session?type="+type+"&id="+id, callBack_GetJsonDetails); 
    }


    function getJsonDetailsCreance(){
        
        var id = this.dataset.id;
        createElementCreance(id);
        var type = $('#detailsElement').attr('data-type');

        $.getJSON(getRequestUrl()+"/session?type="+type+"&id="+id, callBack_GetJsonDetails);
    }

    function callBack_GetJsonDetails(response){

        showInfosFromDb(response)
        showAllReimbursements(response);

    }

