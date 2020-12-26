const Assert = require('assert-plus')
const { AssertionError } = Assert

class Functools {
  static prop(o, name, assertType = x => x) {
    Assert.object(o, 'o')

    if (!(name in o)) {
      throw new AssertionError(`o["${name}"]`)
    }

    const x = o[name]

    assertType(x)

    return x
  }

  static setProp(o, name, value) {
    Assert.object(o, 'o')
    return { ...o, [name]: value }
  }
}

module.exports = Functools
