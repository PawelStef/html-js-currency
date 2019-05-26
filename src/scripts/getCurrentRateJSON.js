import {DisplayCurrencyRate} from './displayCurrencyRate';

export class GetCurrentRateJSON{


    static getJSON(url) {

        $.getJSON(url, function (data) {
            console.log('data', data);
            let currencyRate;
            try {
                currencyRate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
            } catch (e) {
                console.log("Cannot read property exchange rate.");
            }
            DisplayCurrencyRate.display(currencyRate);

        });
    }
}