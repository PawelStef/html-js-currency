//const Main = require('./js/main.js')
const assert = require('chai').assert

describe('Component', () => {
  describe('#method', () => {
    it('should returns true', () => {
      assert.isTrue(true)
    })
  })
})



describe('Main', () => {
  describe('#currencyUriProvider', () =>{
    it('should returns url', () =>{
      assert.equal(new operations.currencyUriProvider('test1', 'test1') ,'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=test1&to_currency=test1&apikey=J3IPR8A064WO3OI9')

    })
  })
})



/*
it('correctly taking curent rate from JSON', () => {
  assert.equal(operations.realTimeExcangeRate(), true)
})
*/
