/* eslint-env mocha */
describe('demo require-and-forget', () => {
  it('requires a module and gets same value', () => {
    const r1 = require('./random')
    const r2 = require('./random')
    console.assert(r1 === r2)
  })

  it('requires and forgets a module and gets new value', () => {
    const forget = require('..')
    const r1 = forget('./random')
    const r2 = forget('./random')
    console.assert(r1 !== r2)
  })
})
