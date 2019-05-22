const tablabel =[];
const tabdatas =[];
//adding currency exchange rate after choosing currencies
const fun = "FX_INTRADAY";
const inter = "15min";



$( ".currencies-dropdown" ).change(function(){
  const f = document.getElementById("From");
  const from = f.options[f.selectedIndex].text;
  const t = document.getElementById("to");
  const to = t.options[t.selectedIndex].text;
  if(from == '--Select--' || to == '--Select--') {
    return;
  }
    document.getElementById("FromTo").innerHTML = "";

    $('#FromTo').append('<p>' + from + ' <=> ' + to + '</p>');

    console.log(from);
    console.log(to);

    const url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + from + '&to_currency=' + to + '&apikey=J3IPR8A064WO3OI9';
    console.log(url);
    $.getJSON(url, function (data) {
      setTimeout(function () {
      },2000)

      console.log(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
      const wart = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      document.getElementById("value").innerHTML = "";
      $('#value').append('<p>' + wart + '</p>');
    });
    const urlchart = 'https://www.alphavantage.co/query?function='+ fun +'&from_symbol=' + from + '&to_symbol=' + to + '&interval='+inter+'&apikey=J3IPR8A064WO3OI9';
  console.log(urlchart);

    $.getJSON(urlchart, function (data) {

      setTimeout(function () {
      },2000)
      tabdatas.length = 0;
      tablabel.length = 0;
      $.each(data["Time Series FX (Daily)"], function (key, value) {
        tablabel.push(key);
        tabdatas.push(value["1. open"]);
        console.log(value["1. open"]);
        console.log(key);

      });
      tabdatas.reverse();
      tablabel.reverse();

    })



    let lineChart = new Chart(CHART, {

      type: 'line',
      data: {

        labels: tablabel,

        datasets: [
          {

            label: "Historical exchange chart",
            //linia
            //borderDash: [3, 3], //jezeli ustawione to przerywana linia
            borderColor: 'rgba(8,72,134,0.5)',
            pointBorderColor: 'rgba(8,72,134,0.5)',
            borderWidth: 2,
            lineTension: 0.1,
            //kolor tla i legendy
            fill: true, //czy wypelnic zbior
            backgroundColor: 'rgba(114,207,220,0.1)', //wplywa tez na kolor w legendzie
            //ustawienia punktu
            pointRadius: 1,
            pointBorderWidth: 1,
            pointBackgroundColor: 'rgba(255,255,255,1)',
            //ustawienia punktu hover
            pointHoverRadius: 1,
            pointHoverBorderWidth: 5,
            pointHoverBackgroundColor: 'rgba(255,255,255,1)',
            pointHoverBorderColor: 'rgba(236,115,87, 1)',


            data: tabdatas,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              // beginAtZero: true
            }
          }]
        },
        legend: {
          position: "bottom"
        }
      }
    });

})


//chart element
const CHART = document.getElementById("lineChart");




//adding option in selectors
let dropdown = $('.currencies-dropdown');
dropdown.empty();
dropdown.append('<option selected="true" disabled>--Select--</option>');
dropdown.prop('selectedIndex', 0);
const url = 'https://openexchangerates.org/api/currencies.json';

$.getJSON(url, function (data) {
  $.each(data, function (key, value) {
    dropdown.append('<option value=' + value + '>' + key + '</option>');
  });

});




