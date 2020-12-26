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

  static sliceExn(obj, cols) {
    Assert.object(obj, 'obj')
    Assert.array(cols, 'cols')

    const { prop, setProp } = Functools

    return cols.reduce((o, col) => setProp(o, col, prop(obj, col)), {})
  }
}

module.exports = Functools
