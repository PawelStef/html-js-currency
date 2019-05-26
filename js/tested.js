

function currencyUrlProvider(from, to) {
  return 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=' + from + '&to_currency=' + to + '&apikey=J3IPR8A064WO3OI9';
}

module.exports = { currencyUrlProvider }
