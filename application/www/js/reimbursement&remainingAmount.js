'use strict';


$('#buttonAddReimbursement').on('click',showFormReimbursement);
$('#validateAddReimbursement').on('click',updateDbReimbursement);


function showFormReimbursement(){

    //ne pas ajouter de remboursement si montant = 0
    if (parseFloat($('#detailsElement_remaining_amount').attr('data-value')) > 0){
        $('#detailsElement_formReimbursement').toggleClass('hidden');
    }
}

//Ajouter un remboursement en Ajax Post
function updateDbReimbursement(event){

    event.preventDefault();
         
if (isNaN(parseFloat($('#valueReimbursement').val())) == false){

    //condition si montant restant < remboursement saisi

    if (parseFloat($('#detailsElement_remaining_amount').attr('data-value')) <= parseFloat($('#valueReimbursement').val())) {
        var value = parseFloat($('#detailsElement_remaining_amount').attr('data-value'));
    }
    else{
        var value = parseFloat($('#valueReimbursement').val());
    }

    var obj = {'value': value ,
            'id': $('#detailsElement').attr('data-id'),
            'type': $('#detailsElement').attr('data-type')
            } 

    $.ajax({
        url: getRequestUrl()+"/session?target=reimbursement",
        type: "POST",
        data: obj,
    })
    .done(callBack_UpdateDb)
    .fail(function (error){
        console.log(error);
    });

    $('#valueReimbursement').val('');
    $('#detailsElement_formReimbursement').addClass('hidden');

    $.getJSON(getRequestUrl()+"/session?type="+obj['type']+"&id="+obj['id'], getRemainingAmount);//récupère le montant restant
        
    }
}

function callBack_UpdateDb(res) {

    var value = parseFloat(JSON.parse(res));
    var now = new Date().toISOString().substring(0, 10).split('-');

    $('#detailsElement tbody').append('<tr style="font-weight:bold;" class="ifReimbursement"><td>Remboursement du: '+now[2]+'-'+now[1]+'-'+now[0]+'</td><td class="right">'+formatMoneyAmount(value,2,',',' ')+' €</td></tr>');
}
    

//Calcul du montant restant en sql et ajout de celui-ci dans la BDD en Ajax Post
function getRemainingAmount(response){
   
    var remainingAmount = parseFloat(response['remainingAmount']['remainingAmount']);

    $('#detailsElement_remaining_amount').html(formatMoneyAmount(remainingAmount,2,',',' ')+' €');
    $('#detailsElement_remaining_amount').attr('data-value',remainingAmount);
;
    addRemainingamountInAjax(remainingAmount);

    //proposer suppression si montant = 0
    if (parseFloat($('#detailsElement_remaining_amount').attr('data-value')) == 0){
        deleteElement();
    }

}

function addRemainingamountInAjax(remainingAmount){
    
    var obj = {'remainingAmount': remainingAmount,
                            'id': $('#detailsElement').attr('data-id'),
                            'type': $('#detailsElement').attr('data-type') };
    
    $.ajax({
        url: getRequestUrl()+"/session?target=remaining_amount",
        type: "POST",
        data: obj,
    })
	.done(callBack_AddRemainingamountInAjax)
	.fail(function (error){
        console.log(error);
    });
}

//Mise à jour du montant restant dans les rubriques "Je dois" et "On me doit"
function callBack_AddRemainingamountInAjax(response){

    var res = JSON.parse(response);
    var remainingAmount = parseFloat(res['remainingAmount'])
    var id = res['id'];
    var total = 0;

    var spans = $('.remaining_amount');

    for (var i=0 ; i<spans.length ; i++)
    {
        
        if ($('#detailsElement').attr('data-type') == spans[i].dataset.type && spans[i].dataset.id == id ){ //condition qui permet de sélectionner la rubrique dette ou créance avec l'hypothèse ou id dette = id créance
        
            spans[i].innerHTML = formatMoneyAmount(remainingAmount,'2',',',' ');
            spans[i].setAttribute('value',remainingAmount);
        }  
        if ($('#detailsElement').attr('data-type') == spans[i].dataset.type) {

            total += parseFloat(spans[i].getAttribute('value')); 
        }  
    }
    
    //Afficher le montant total dans la bonne rubrique
    if ($('#detailsElement').attr('data-type') == 'debts') {

        $('#total_amount_debts').html(formatMoneyAmount(total,2,',',' '));  
        $('#total_amount_debts').attr('value',total);
    }
    else if ($('#detailsElement').attr('data-type') == 'creances'){

        $('#total_amount_creances').html(formatMoneyAmount(total,2,',',' '));
        $('#total_amount_creances').attr('value',total);
    }

    createGraph();
}


