//const axios = require('axios');
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
  myMainFunction();
});


//tab to fil the chart
let tablabel = [];
let tabdatas = [];


//basic button set on 12h
let typeOfApiFunction = "FX_INTRADAY";
let timeInterwalOfChartsData = "&interval=15min";
let rep = 48;
let queryForData = "Time Series FX (15min)";


let fromValue, toValue;
document.getElementById('fromValue').addEventListener('change', function(event) {
  fromValue = event.currentTarget.value;
  fillChartOnSelectedCurrencies();
});

document.getElementById('toValue').addEventListener('change', function(event) {
  toValue = event.currentTarget.value;
  fillChartOnSelectedCurrencies();
});

function fillChartOnSelectedCurrencies() {
  if (fromValue !== undefined && toValue !== undefined) {

    //setDataHistoricalRate(typeOfApiFunction, timeInterwalOfChartsData, rep, queryForData);
    myFunction12h();
    myMainFunction();
  }
}

function myMainFunction() {
  let f = document.getElementById("fromValue");
   fromValue = f.options[f.selectedIndex].text;
  let t = document.getElementById("toValue");
  toValue = t.options[t.selectedIndex].text;

  if (fromValue == '--Select--' || toValue == '--Select--') {
    return;
  }
  document.getElementById("FromToValue").innerHTML = "";
  $('#FromToValue').append('<p>' + fromValue + ' <=> ' + toValue + '</p>');

  realTimeExcangeRate(fromValue,toValue);
  console.log(typeOfApiFunction, fromValue, toValue, timeInterwalOfChartsData, rep, queryForData)
  historicalRate(typeOfApiFunction,fromValue,toValue,timeInterwalOfChartsData,rep,queryForData);
}


//historical rate
function historicalRate(fun, from, to, inter, rep, ask) {
  let urlchart = 'https://www.alphavantage.co/query?function=' + fun + '&from_symbol=' + from + '&to_symbol=' + to + inter + '&apikey=J3IPR8A064WO3OI9';

  $.getJSON(urlchart, function (data) {
    tabdatas.length = 0;
    tablabel.length = 0;
    //problem z dostarczeniem dobrego zapytania do JSON
    switch (ask) {
      case "Time Series FX (15min)":{
        let i=0;
        $.each(data["Time Series FX (15min)"], function (key, value) {
          tablabel.unshift(key);
          tabdatas.unshift(value["1. open"]);
          console.log(value["1. open"]);
          console.log(key);
          renderChart(tabdatas, tablabel)
          if(i==rep){
            return false;
          }
          i++;
        });
        break;
      }
      case "Time Series FX (30min)":{
        let i=0;
        $.each(data["Time Series FX (30min)"], function (key, value) {
          tablabel.unshift(key);
          tabdatas.unshift(value["1. open"]);
          console.log(value["1. open"]);
          console.log(key);
          renderChart(tabdatas, tablabel)
          if(i==rep){
            return false;
          }
          i++;
        });
        break;
      }
      case "Time Series FX (Daily)":{
        let i=0;
        $.each(data["Time Series FX (Daily)"], function (key, value) {
          tablabel.unshift(key);
          tabdatas.unshift(value["1. open"]);
          console.log(value["1. open"]);
          console.log(key);
          renderChart(tabdatas, tablabel)
          if(i==rep){
            return false;
          }
          i++;
        });
        break;
      }
      case "Time Series FX (Weekly)":{
        let i=0;
        $.each(data["Time Series FX (Weekly)"], function (key, value) {
          tablabel.unshift(key);
          tabdatas.unshift(value["1. open"]);
          console.log(value["1. open"]);
          console.log(key);
          renderChart(tabdatas, tablabel)
          if(i==rep){
            return false;
          }
          i++;
        });
        break;
      }
      case "Time Series FX (Monthly)":{
        let i=0;
        $.each(data["Time Series FX (Monthly)"], function (key, value) {
          tablabel.unshift(key);
          tabdatas.unshift(value["1. open"]);
          console.log(value["1. open"]);
          console.log(key);
          renderChart(tabdatas, tablabel)
          if(i==rep){
            return false;
          }
          i++;
        });
        break;
      }
    }

  });
  renderChart(tabdatas, tablabel)
}


//curent rate

function currencyUriProvider(from, to) {
  return 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + from + '&to_currency=' + to + '&apikey=J3IPR8A064WO3OI9';
}

function realTimeExcangeRate(url) {

  console.log(url);
  $.getJSON(url, function (data) {
    console.log('data', data);
    return  data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
  });
}

function displayCurrencyRate(currencyRate) {
  document.getElementById("value").innerHTML = "";
  $('#value').append('<p>' + currenncyRate + '</p>');
}



//buton function
function myFunction12h() {
  typeOfApiFunction = "FX_INTRADAY";
  timeInterwalOfChartsData = "&interval=15min";
  rep = 48;
  queryForData = "Time Series FX (15min)";
}

function myFunction1d() {
  typeOfApiFunction = "FX_INTRADAY";
  timeInterwalOfChartsData = "&interval=30min";
  rep = 48;
  queryForData = "Time Series FX (30min)";
}

function myFunction2w() {
  typeOfApiFunction = "FX_DAILY";
  timeInterwalOfChartsData = "";
  rep = 14;
  queryForData = "Time Series FX (Daily)";
}

function myFunction1m() {
  typeOfApiFunction = "FX_DAILY";
  timeInterwalOfChartsData = "";
  rep = 31;
  queryForData = "Time Series FX (Daily)";
}

function myFunction1y() {
  typeOfApiFunction = "FX_WEEKLY";
  timeInterwalOfChartsData = "";
  rep = 52;
  queryForData = "Time Series FX (Weekly)";
}

function myFunction2y() {
  typeOfApiFunction = "FX_MONTHLY";
  timeInterwalOfChartsData = "";
  rep = 24;
  queryForData = "Time Series FX (Monthly)";
}

function myFunction5y() {
  typeOfApiFunction = "FX_MONTHLY";
  timeInterwalOfChartsData = "";
  rep = 60;
  queryForData = "Time Series FX (Monthly)";
}

function myFunction10y() {
  typeOfApiFunction = "FX_MONTHLY";
  timeInterwalOfChartsData = "";
  rep = 120;
  queryForData = "Time Series FX (Monthly)";
}

//adding event listener to buttons and selector
let a = document.getElementById("12h");
a.addEventListener("click", myFunction12h);
a.addEventListener("click", myMainFunction);
let b = document.getElementById("1d");
b.addEventListener("click", myFunction1d);
b.addEventListener("click", myMainFunction);
let c = document.getElementById("2w");
c.addEventListener("click", myFunction2w);
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

module.exports = {  realTimeExcangeRate, currencyUriProvider }

/*

//button function
function setDataHistoricalRate(typeOfApiF, timeInterwalOfChartsD, repe, queryForD) {
  typeOfApiFunction = typeOfApiF;
  timeInterwalOfChartsData = timeInterwalOfChartsD;
  rep = repe;
  queryForData = queryForD;
}

//adding event listener to buttons and selector
let a = document.getElementById("12h");
a.addEventListener("click", setDataHistoricalRate("FX_INTRADAY", "&interval=15min", 48, "Time Series FX (15min)"));
a.addEventListener("click", myMainFunction);
let b = document.getElementById("1d");
b.addEventListener("click", setDataHistoricalRate("FX_INTRADAY", "&interval=30min", 48, "Time Series FX (30min)"));
b.addEventListener("click", myMainFunction);
let c = document.getElementById("2w");
c.addEventListener("click", setDataHistoricalRate("FX_DAILY", "", 14, "Time Series FX (Daily)"));
c.addEventListener("click", myMainFunction);
let d = document.getElementById("1m");
d.addEventListener("click", setDataHistoricalRate("FX_DAILY", "", 31, "Time Series FX (Daily)"));
d.addEventListener("click", myMainFunction);
let e = document.getElementById("1y");
e.addEventListener("click", setDataHistoricalRate("FX_WEEKLY", "", 52, "Time Series FX (Weekly)"));
e.addEventListener("click", myMainFunction);
let f = document.getElementById("2y");
f.addEventListener("click", setDataHistoricalRate("FX_MONTHLY", "", 24, "Time Series FX (Monthly)"));
f.addEventListener("click", myMainFunction);
let g = document.getElementById("5y");
g.addEventListener("click", setDataHistoricalRate("FX_MONTHLY", "", 60, "Time Series FX (Monthly)"));
g.addEventListener("click", myMainFunction);
let h = document.getElementById("10y");
h.addEventListener("click", setDataHistoricalRate("FX_MONTHLY", "", 120, "Time Series FX (Monthly)"));
h.addEventListener("click", myMainFunction);
*/
