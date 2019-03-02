'use strict';

/************VERIFICATION FORMULAIRE AJOUT DETTE OU CREANCE**********/

var buttonValidateAddDebt = document.getElementById('buttonValidateAddDebt');
var buttonValidateAddCreance = document.getElementById('buttonValidateAddCreance');

var nameDebt = document.getElementById('creancier');
var missNameDebt = document.getElementById('missNameDebt');
var amountDebt = document.getElementById('amount_debt');
var missAmountDebt = document.getElementById('missAmountDebt');

var nameCreance = document.getElementById('debiteur');
var missNameCreance = document.getElementById('missNameCreance');
var amountCreance = document.getElementById('amount_creance');
var missAmountCreance = document.getElementById('missAmountCreance');


buttonValidateAddDebt.addEventListener('click',function(){
    verifForm(event,nameDebt,missNameDebt,amountDebt,missAmountDebt)
});

buttonValidateAddCreance.addEventListener('click',function(){
    verifForm(event,nameCreance,missNameCreance,amountCreance,missAmountCreance)
});

 /********FONCTION COMMUNE********/

function verifForm(event,name,missName,amount,missAmount){
    if (name.validity.valueMissing){

        event.preventDefault();
        missName.textContent = 'Merci de saisir un nom.';
        missName.style.color = 'red';
        name.style.backgroundColor = 'pink';
    }
    else if (amount.validity.valueMissing){

        event.preventDefault();
        missAmount.textContent = 'Merci de saisir un montant.';
        missAmount.style.color = 'red';
        amount.style.backgroundColor = 'pink';
    }
    if (name.validity.valueMissing == false ) {
        missName.textContent = '';
        name.style.backgroundColor = 'white';
    }
    if ( amount.validity.valueMissing == false ) {
        missAmount.textContent = '';
        amount.style.backgroundColor = 'white';
    }

}
