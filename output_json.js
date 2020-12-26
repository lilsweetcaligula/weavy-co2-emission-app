const Assert = require('assert-plus')
const { prop, setProp, sliceExn } = require('./functools')

class OutputJson {
  static invoke(x, opts) {
    Assert.object(opts, 'opts')

    const cols = prop(opts, 'columns', Assert.array)
    
    if (Array.isArray(x)) {
      const out = x.map(item => {
        return sliceExn(item, cols)
      })

      console.log(JSON.stringify(out))

      return
    }

    console.log(JSON.stringify(x))
  }
}

module.exports = OutputJson
