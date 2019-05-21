const CHART = document.getElementById("lineChart");
console.log(CHART);

let lineChart = new Chart(CHART, {

  type: 'line',
  data: {

    labels: [ "2019-05-22", "2019-05-21", "2019-05-20", "2019-05-19", "2019-05-17", "2019-05-16", "2019-05-15","2019-05-14"],

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


        data: [4.57, 4.15, 3.87, 3.74, 4.06, 4.09, 4.28, 4.12],
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




/*
let currency = $('.currencyExchange');
currency.empty();
currency.append('<p>--0.00--</p>');
const f = document.getElementById("From");
const from = f.options[f.selectedIndex].text;
const t = document.getElementById("to");
const to = t.options[t.selectedIndex].text;
*/
/*
$.getJSON('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=PLN&apikey=J3IPR8A064WO3OI9', function (data) {

  console.log(data);

});
*/

/*

$.getJSON('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + from + '&to_currency=' + to + '&apikey=demo', function (data) {

  console.log(data);

  const json = JSON.parse(data);
  const jsonex = alter(json["5. Exchange Rate"])
  currency.append('<p>'+jsonex+'</p>')

});

*/

