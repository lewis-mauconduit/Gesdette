'use strict';

var buttonCancelRegister = document.getElementById('buttonCancelRegister');

buttonCancelRegister.addEventListener('click', function(){
    this.form.reset();
    window.location.href = getRequestUrl();
});

/************VERIFICATION FORMULAIRE**********/

var buttonValidateRegister = document.getElementById('buttonValidateRegister');
var pseudo = document.getElementById('pseudo');
var missPseudo = document.getElementById('missPseudo');
var mail = document.getElementById('mail');
var missMail = document.getElementById('missMail');
var password = document.getElementById('password');
var missPassword = document.getElementById('missPassword');

buttonValidateRegister.addEventListener('click',verifFormRegister);

function verifFormRegister(event){

    if (pseudo.validity.valueMissing){

        event.preventDefault();
        missPseudo.textContent = 'Merci de saisir un pseudo.';
        missPseudo.style.color = 'red';
        pseudo.style.backgroundColor = 'pink';
    }
    else if (mail.validity.valueMissing){

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
    else {
        $('#congratulations').removeClass('hidden');
    }
    
    if (pseudo.validity.valueMissing == false ) {
        missPseudo.textContent = '';
        pseudo.style.backgroundColor = 'white';
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