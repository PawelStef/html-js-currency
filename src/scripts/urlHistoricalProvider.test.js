import {UrlHistoricalProvider} from './urlHistoricalProvider';

test('add from and to to equal URI', () => {
    expect(UrlHistoricalProvider.provide('111', '222', '333', '333')).toBe('https://www.alphavantage.co/query?function=111&from_symbol=222&to_symbol=333333&apikey=J3IPR8A064WO3OI9');
});
