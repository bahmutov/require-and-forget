const r1 = require('./random')
const r2 = require('./random')

console.log(`loading ./random twice produces the same values
r1 ${r1} r2 ${r2}
because the module was loaded once, but then the value was cached`)

const requireAndForget = require('..')
const r3 = requireAndForget('./random')
const r4 = requireAndForget('./random')

console.log(`loading and removing ./random from cache
returns new random values, because the module is removed
from the module.cache after loading.
r3 ${r3} r4 ${r4}`)
