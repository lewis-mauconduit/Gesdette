'use strict';

$('#buttonDelete').on('click', deleteElement);

function deleteElement(){

    var type = $('#detailsElement').attr('data-type');
    var id= $('#detailsElement').attr('data-id');

    $('#confirmDelete').removeClass('hidden');

    $('#validateDelete').on('click', function(){
        window.location.href = getRequestUrl()+"/delete?type="+type+"&id="+id;
    });

    $('#cancelDelete').on('click', function(){
        $('#confirmDelete').addClass('hidden');
    });
        
}

