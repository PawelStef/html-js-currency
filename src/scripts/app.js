import '../styles/index.scss';
import {Urlprovider} from './urlprovider';
import {UrlHistoricalProvider} from './urlHistoricalProvider';
import {DisplayCurrencyRate} from './displayCurrencyRate';
import {RenderChart} from './renderChart';
import {GetCurrentRateJSON} from './getCurrentRateJSON';

//console.log('webpack starterkit');
//console.log(Urlprovider.provide("dd", "aa"));

//adding option in selectorsb
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
document.getElementById('fromValue').addEventListener('change', function (event) {
    fromValue = event.currentTarget.value;
    fillChartOnSelectedCurrencies();
});

document.getElementById('toValue').addEventListener('change', function (event) {
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

    realTimeExcangeRate(fromValue, toValue);

    historicalRate(typeOfApiFunction, fromValue, toValue, timeInterwalOfChartsData, rep, queryForData);
    DisplayCurrencyRate.display();
}

function getDataForTable(data, rep, value) {
    let i = 0;
    $.each(data["Time Series FX (" + value + ")"], function (key, value) {
        tablabel.unshift(key);
        tabdatas.unshift(value["1. open"]);

        RenderChart.render(tabdatas, tablabel);
        if (i == rep) {
            return false;
        }
        i++;
    });
}


//historical rat
function historicalRate(fun, from, to, inter, rep, ask) {
    const urlchart = UrlHistoricalProvider.provide(fun, from, to, inter);
    $.getJSON(urlchart, function (data) {
        tabdatas.length = 0;
        tablabel.length = 0;

        switch (ask) {
            case "Time Series FX (15min)": {
                getDataForTable(data, rep, "15min");
                break;
            }
            case "Time Series FX (30min)": {
                getDataForTable(data, rep, "30min");
                break;
            }
            case "Time Series FX (Daily)": {
                getDataForTable(data, rep, "Daily");
                break;
            }
            case "Time Series FX (Weekly)": {
                getDataForTable(data, rep, "Weekly");
                break;
            }
            case "Time Series FX (Monthly)": {
                getDataForTable(data, rep, "Monthly");
                break;
            }
        }

    });
    RenderChart.render(tabdatas, tablabel);
}

//curent rateas


function realTimeExcangeRate(from, to) {
    const url = Urlprovider.provide(from, to);

    console.log(url);

    const currencyRate = GetCurrentRateJSON.getJSON(url);

    DisplayCurrencyRate.display(currencyRate);
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


