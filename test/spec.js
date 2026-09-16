/* eslint-env mocha */
const assert = require('better-assert')

describe('demo require-and-forget', () => {
  beforeEach(() => {
    delete global.__require_fn
  })

  it('requires a module and gets same value', () => {
    const r1 = require('./random')
    const r2 = require('./random')
    assert(r1 === r2)
  })

  it('requires and forgets a module and gets new value', () => {
    const forget = require('..')
    const r1 = forget('./random')
    const r2 = forget('./random')
    assert(r1 !== r2)
  })

  it('calls the provided require function', () => {
    let wasCalled = false
    const myRequire = (module) => {
      assert(typeof module === 'string', 'loading module by name')
      wasCalled = true
      return require(module)
    }

    global.__require_fn = myRequire
    const forget = require('..')
    const r1 = forget('./random')
    const r2 = forget('./random')
    assert(r1 !== r2)
    assert(wasCalled, 'custom require was called')
  })
})
