import {Urlprovider} from './urlprovider';

test('add from and to to equal URI', () => {
    expect(Urlprovider.provide('fromCurrency', 'toCurrency')).toBe('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=fromCurrency&to_currency=toCurrency&apikey=J3IPR8A064WO3OI9');
});
