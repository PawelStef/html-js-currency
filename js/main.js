
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
  let start=myMainFunction();
});


//tab to fil the chart
let tablabel = [];
let tabdatas = [];
//let from = "--Select--";
//let to = "--Select--";

//basic button set on 12h
let fun = "FX_INTRADAY";
let inter = "&interval=15min";
let rep = 48;
let ask = '"Time Series FX (15min)"';


function myMainFunction() {

  let f = document.getElementById("From");
  let from = f.options[f.selectedIndex].text;
  let t = document.getElementById("to");
  let to = t.options[t.selectedIndex].text;

  if (from == '--Select--' || to == '--Select--') {
    return;
  }
  document.getElementById("FromTo").innerHTML = "";
  $('#FromTo').append('<p>' + from + ' <=> ' + to + '</p>');

  console.log(from);
  console.log(to);
   realTimeExcangeRate(from,to);
   historicalRate(fun,from,to,inter,rep,ask);

}


//historical rate
function historicalRate(fun, from, to, inter, rep, ask) {
  let urlchart = 'https://www.alphavantage.co/query?function=' + fun + '&from_symbol=' + from + '&to_symbol=' + to + inter + '&apikey=J3IPR8A064WO3OI9';
  console.log(urlchart);

  $.getJSON(urlchart, function (data) {

    tabdatas.length = 0;
    tablabel.length = 0;
    //problem z dostarczeniem dobrego zapytania do JSON
    $.each(data[ask], function (key, value) {
      tablabel.push(key);
      tabdatas.push(value["1. open"]);
      console.log(value["1. open"]);
      console.log(key);

    });
    tabdatas.reverse();
    tablabel.reverse();

  })
  renderChart(tabdatas, tablabel)
}

//curent rate
function realTimeExcangeRate(from, to) {
  const url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + from + '&to_currency=' + to + '&apikey=J3IPR8A064WO3OI9';
  console.log(url);
  $.getJSON(url, function (data) {
    console.log(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
    let wart = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
    document.getElementById("value").innerHTML = "";
    $('#value').append('<p>' + wart + '</p>');
  });
}

//buton function
function myFunction12h() {
  fun = "FX_INTRADAY";
  inter = "&interval=15min";
  rep = 48;
  ask = '"Time Series FX (15min)"';
}

function myFunction1d() {
  fun = "FX_INTRADAY";
  inter = "&interval=30min";
  rep = 48;
  ask = '"Time Series FX (30min)"';
}

function myFunction1w() {
  fun = "FX_DAILY";
  inter = "";
  rep = 7;
  ask = '"Time Series FX (Daily)"';
}

function myFunction1m() {
  fun = "FX_DAILY";
  inter = "";
  rep = 31;
  ask = '"Time Series FX (Daily)"';
}

function myFunction1y() {
  fun = "FX_WEEKLY";
  inter = "";
  rep = 52;
  ask = '"Time Series FX (Weekly)"';
}

function myFunction2y() {
  fun = "FX_MONTHLY";
  inter = "";
  rep = 24;
  ask = '"Time Series FX (Monthly)"';
}

function myFunction5y() {
  fun = "FX_MONTHLY";
  inter = "";
  rep = 60;
  ask = '"Time Series FX (Monthly)"';
}

function myFunction10y() {
  fun = "FX_MONTHLY";
  inter = "";
  rep = 120;
  ask = '"Time Series FX (Monthly)"';
}

//adding event listener to buttons and selector
let a = document.getElementById("12h");
a.addEventListener("click", myFunction12h);
a.addEventListener("click", myMainFunction);
let b = document.getElementById("1d");
b.addEventListener("click", myFunction1d);
b.addEventListener("click", myMainFunction);
let c = document.getElementById("1w");
c.addEventListener("click", myFunction1w);
c.addEventListener("click", myMainFunction);
let d = document.getElementById("1m");
d.addEventListener("click", myFunction1m);
d.addEventListener("click", myMainFunction);
let e = document.getElementById("1y");
e.addEventListener("click", myFunction1y);
e.addEventListener("click", myMainFunction);
let f = document.getElementById("2y");
f.addEventListener("click", myFunction2y);
f.addEventListener("click", myMainFunction);
let g = document.getElementById("5y");
g.addEventListener("click", myFunction5y);
g.addEventListener("click", myMainFunction);
let h = document.getElementById("10y");
h.addEventListener("click", myFunction10y);
h.addEventListener("click", myMainFunction);
let i = document.getElementById("From");
i.addEventListener("click", myMainFunction);
let j = document.getElementById("to");
j.addEventListener("click", myMainFunction);
//generation of chart
function renderChart(data, labels) {
  //chart element
  const CHART = document.getElementById("lineChart").getContext('2d');
  let lineChart = new Chart(CHART, {
    type: 'line',
    data: {

      labels: labels,

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

          data: data,
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

}


