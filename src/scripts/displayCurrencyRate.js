export class DisplayCurrencyRate{


static display(currencyRate) {
    document.getElementById("value").innerHTML = "";
    $('#value').append('<p>' + currencyRate + '</p>');
}
}