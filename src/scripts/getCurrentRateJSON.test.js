import {GetCurrentRateJSON} from './getCurrentRateJSON';
//const $ =require('jquery-3.3.1.min');

test('get data from JSON', () => {
    expect(GetCurrentRateJSON.getJSON('.curentJSON')).toBe("109.30000000");
});
