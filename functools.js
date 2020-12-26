const Assert = require('assert-plus')
const { AssertionError } = Assert

class Functools {
  static prop(o, name, assertType = x => x) {
    if (!(name in o)) {
      throw new AssertionError(`o["${name}"]`)
    }

    const x = o[name]

    assertType(x)

    return x
  }

  static setProp(o, name, value) {
    return Object.defineProperty(o, name, {
      value,
      writable: true
    })
  }
}

module.exports = Functools
