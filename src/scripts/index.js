import '../styles/index.scss';
import {Urlprovider} from './urlprovider';

console.log('webpack starterkit');
console.log(Urlprovider.provide("dd","aa"));

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
    mainFunction();
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
        setingDataToChart12h();
        mainFunction();
    }
}

function mainFunction() {
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
    console.log(typeOfApiFunction, fromValue, toValue, timeInterwalOfChartsData, rep, queryForData);
    historicalRate(typeOfApiFunction,fromValue,toValue,timeInterwalOfChartsData,rep,queryForData);
}

function getDataForTable(data, rep, value) {
    let i = 0;
    $.each(data["Time Series FX (" + value+")"], function (key, value) {
        tablabel.unshift(key);
        tabdatas.unshift(value["1. open"]);
        console.log(value["1. open"]);
        console.log(key);
        renderChart(tabdatas, tablabel);
        if (i == rep) {
            return false;
        }
        i++;
    });
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
                getDataForTable(data, rep, "15min");
                break;
            }
            case "Time Series FX (30min)":{
                getDataForTable(data, rep, "30min");
                break;
            }
            case "Time Series FX (Daily)":{
                getDataForTable(data, rep, "Daily");
                break;
            }
            case "Time Series FX (Weekly)":{
                getDataForTable(data, rep, "Weekly");
                break;
            }
            case "Time Series FX (Monthly)":{
                getDataForTable(data, rep, "Monthly");
                break;
            }
        }

    });
    renderChart(tabdatas, tablabel);
}

//curent rate

function displayCurrencyRate(currencyRate) {
    document.getElementById("value").innerHTML = "";
    $('#value').append('<p>' + currencyRate + '</p>');
}



function realTimeExcangeRate(from, to) {
    const url = Urlprovider.provide(from, to);
    console.log('dupa: ' + url);
    // const url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + from + '&to_currency=' + to + '&apikey=J3IPR8A064WO3OI9';
    console.log(url);
    $.getJSON(url, function (data) {
        console.log('data', data);
        let currencyRate;
        try {
            currencyRate= data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        }catch (e) {
            console.log("Cannot read property exchange rate.");
        }

    });
    displayCurrencyRate(currencyRate);
}

//buton function
function setingDataToChart12h() {
    typeOfApiFunction = "FX_INTRADAY";
    timeInterwalOfChartsData = "&interval=15min";
    rep = 48;
    queryForData = "Time Series FX (15min)";
}

function setingDataToChart1d() {
    typeOfApiFunction = "FX_INTRADAY";
    timeInterwalOfChartsData = "&interval=30min";
    rep = 48;
    queryForData = "Time Series FX (30min)";
}

function setingDataToChart2w() {
    typeOfApiFunction = "FX_DAILY";
    timeInterwalOfChartsData = "";
    rep = 14;
    queryForData = "Time Series FX (Daily)";
}

function setingDataToChart1m() {
    typeOfApiFunction = "FX_DAILY";
    timeInterwalOfChartsData = "";
    rep = 31;
    queryForData = "Time Series FX (Daily)";
}

function setingDataToChart1y() {
    typeOfApiFunction = "FX_WEEKLY";
    timeInterwalOfChartsData = "";
    rep = 52;
    queryForData = "Time Series FX (Weekly)";
}

function setingDataToChart2y() {
    typeOfApiFunction = "FX_MONTHLY";
    timeInterwalOfChartsData = "";
    rep = 24;
    queryForData = "Time Series FX (Monthly)";
}

function setingDataToChart5y() {
    typeOfApiFunction = "FX_MONTHLY";
    timeInterwalOfChartsData = "";
    rep = 60;
    queryForData = "Time Series FX (Monthly)";
}

function setingDataToChart10y() {
    typeOfApiFunction = "FX_MONTHLY";
    timeInterwalOfChartsData = "";
    rep = 120;
    queryForData = "Time Series FX (Monthly)";
}

//adding event listener to buttons and selector
let a = document.getElementById("12h");
a.addEventListener("click", setingDataToChart12h);
a.addEventListener("click", mainFunction);
let b = document.getElementById("1d");
b.addEventListener("click", setingDataToChart1d);
b.addEventListener("click", mainFunction);
let c = document.getElementById("2w");
c.addEventListener("click", setingDataToChart2w);
c.addEventListener("click", mainFunction);
let d = document.getElementById("1m");
d.addEventListener("click", setingDataToChart1m);
d.addEventListener("click", mainFunction);
let e = document.getElementById("1y");
e.addEventListener("click", setingDataToChart1y);
e.addEventListener("click", mainFunction);
let f = document.getElementById("2y");
f.addEventListener("click", setingDataToChart2y);
f.addEventListener("click", mainFunction);
let g = document.getElementById("5y");
g.addEventListener("click", setingDataToChart5y);
g.addEventListener("click", mainFunction);
let h = document.getElementById("10y");
h.addEventListener("click", setingDataToChart10y);
h.addEventListener("click", mainFunction);


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