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
    url : 'localhost:9000',
    realm: 'realm1'
    });
    
    connection.onopen = function (session) {
    
    console.log('websocket is connected ...')
    
    session.subscribe('com.test.both', function(message) {
    
    console.log(message);


    var now = new moment();
    var time = now.format("HH:mm:ss");
    //  var dt = new Date();
    //  var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    //Display current temperature
    currentTemp(message[0]);
    currentHumi(message[1]);

    //Check High and Low data
    if (message[0] > 40) {
      $("#btn-temp").css("background-color", "red");
    } else if (message[0] < -20) {
      $("#btn-temp").css("background-color", "blue");
    } else {
      $("#btn-temp").css("background-color", "green");
    }

    if (message[1] > 40) {
      $("#btn-humi").css("background-color", "red");
    } else if (message[1] < -20) {
      $("#btn-humi").css("background-color", "blue");
    } else {
      $("#btn-humi").css("background-color", "green");
    }

    //Push proper data in the array
    tempInfo.push(message[0]);
    humidInfo.push(message[1]);
    tArray.push(message[0]);
    hArray.push(message[1]);
    currentTime.push(time);

    // Fix range
    if (tempInfo.length == 9) {
      tempInfo.shift();
      humidInfo.shift();
      tArray.shift();
      hArray.shift();
      avgTemp.shift();
      avgHumi.shift();
      currentTime.shift();
      // var month = MONTHS.shift();
      // MONTHS.push(month);
    }


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

// Humi Chart config
var Hconfig = {
  type: "line",
  data: {
    labels: currentTime,
    datasets: [
      {
        label: "HUMIDITY",
        fill: false,
        backgroundColor: chartColors.blue,
        borderColor: chartColors.blue,
        data: humidInfo
      },
      {
        label: "AVG",
        //type: "line",
        fill: false,
        backgroundColor: chartColors.yellow,
        borderColor: chartColors.yellow,
        data: avgHumi // AVG Humi array
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "HUMIDITY",
      fontColor: chartColors.blue
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
            labelString: "TIME",
            fontColor: chartColors.orange
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "VALUE",
            fontColor: chartColors.purple
          }
        }
      ]
    } //End scales
  } //End option
};

window.myLine2 = new Chart(ctx2, Hconfig);
    
    
    
    connection.open();

}); // End ready function
