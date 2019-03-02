'use strict';

/***********AFFICHAGE DU FORMULAIRE************/

$('#loginButton').on('click', function(){
    
    removeClass($('#sectionLogin'),'hidden');
    addClass($('#sectionLogin'),'appear');
});

$('#buttonCancelLogin').on('click', function(){

    addClass($('#sectionLogin'),'hidden');
    removeClass($('#sectionLogin'),'appear');
    this.form.reset();
});

/************VERIFICATION FORMULAIRE**********/

var buttonValidateLogin = document.getElementById('buttonValidateLogin');
var mail = document.getElementById('mail');
var missMail = document.getElementById('missMail');
var password = document.getElementById('password');
var missPassword = document.getElementById('missPassword');

buttonValidateLogin.addEventListener('click',verifFormLogin);

function verifFormLogin(event){
    if (mail.validity.valueMissing){

        event.preventDefault();
        missMail.textContent = 'Merci de saisir une adresse mail.';
        missMail.style.color = 'red';
        mail.style.backgroundColor = 'pink';
    }
    else if (password.validity.valueMissing){

        event.preventDefault();
        missPassword.textContent = 'Merci de saisir un mot de passe.';
        missPassword.style.color = 'red';
        password.style.backgroundColor = 'pink';
    }
   if (mail.validity.valueMissing == false ) {
        missMail.textContent = '';
        mail.style.backgroundColor = 'white';
    }
    if ( password.validity.valueMissing == false ) {
        missPassword.textContent = '';
        password.style.backgroundColor = 'white';
    }

}







