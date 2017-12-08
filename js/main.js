$(document).ready(function() {
//console.log(_.partition([1, 2, 3, 4], n => n % 2));

 // Chart color
 var chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(231,233,237)"
  };

    // Set months
    var MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];


      var ctx1 = $("#myChart1");

var connection = new autobahn.Connection({
    url : 'ws://138.197.146.172:8080/ws',
    realm: 'realm1'
    });
    
    connection.onopen = function (session) {
    
    console.log('websocket is connected ...')
    
    session.subscribe('com.test.both', function(message) {
    
    console.log(message);

    // Temp chart config
    var Tconfig = {
      type: "line",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: "Temperature",
            fill: false,
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
            data: tempInfo //temp array
          }, // End temp data
          {
            label: "AVG",
            fill: false,
            backgroundColor: chartColors.yellow,
            borderColor: chartColors.yellow,
            data: avgTemp //Temp avg array
          }
        ] //End data Set
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Temperture"
        },
        tooltips: {
          mode: "label"
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Month"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Value"
              }
            }
          ]
        }
      }
    };

    window.myLine = new Chart(ctx1, Tconfig);



         });
    }
    
    connection.open();

}); // End ready function