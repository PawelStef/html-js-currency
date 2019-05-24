const operations = require('./operations.js')
const assert = require('chai').assert

it('should return true', () => {
  assert.equal(true, true)
})

it('correctly calculates the sum of 1 and 3', () => {
  assert.equal(operations.add(1, 3), 4)
})


describe('operators', () => {
  describe('#realTimeExcangeRate', () =>{
    it('should returns true', () =>{
      assert.isTrue(new operations.realTimeExcangeRate())
    })
  })
})



/*
it('correctly taking curent rate from JSON', () => {
  assert.equal(operations.realTimeExcangeRate(), true)
})
*/
