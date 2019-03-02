'use strict';


//https://medium.com/javascript-in-plain-english/exploring-chart-js-e3ba70b07aa4

function createGraph(){

    if ($('#total_amount_debts').html() != undefined || $('#total_amount_creances').html() != undefined){

        $('#chart').removeClass('hidden');
        var totalDebts = parseFloat($('#total_amount_debts').attr('value'));
        var totalCreances = parseFloat($('#total_amount_creances').attr('value'));
        
        renderChart(totalDebts,totalCreances);
    }
    else{
        $('#chart').addClass('hidden');
    }
}

function renderChart(totalDebts,totalCreances) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [{
                label: ['Dette'],
                data: [totalDebts],
                backgroundColor: ['rgba(168, 47, 54, 0.7)']
                },
                {
                label: ['Créances'],
                data: [totalCreances],
                backgroundColor: ['rgba(245, 233, 63, 0.7)']
                }]
        },
        options: {            
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            } 
        }
    });
}


createGraph();