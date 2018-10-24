var addData;
(function(){
    var chart = new Chart(document.getElementById('c1').getContext('2d'), {
        type: 'scatter',

        data: {
            datasets: [{
                data: [],
                borderColor:'black',
                fill:false,
                lineTension:0,
                label:"Generation Score",
                showLine:true,
            }]
        },

        // Configuration options go here
        options: {
            scales:{
                yAxes:[{
                    scaleLabel:{
                        display:true,
                        labelString:"Score"
                    }
                }],
                xAxes:[{
                    scaleLabel:{
                        display:true,
                        labelString:"Gen",
                        
                    },
                    ticks:{
                        min:0,
                        suggestedMax:10,
                        stepSize:1
                    }
                }]
            }
        }
    });

    addData = function (gen, score){
        chart.data.datasets[0].data.push({x:gen, y:score});
        chart.update();
    }    
})()
