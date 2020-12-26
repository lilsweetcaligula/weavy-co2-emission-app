const Assert = require('assert-plus')
const { prop, setProp } = require('./functools')

class OutputCsv {
  static invoke(x, opts) {
    Assert.object(opts, 'opts')

    const cols = prop(opts, 'columns', Assert.array)

    if (cols.length === 0) {
      return
    }

    const header = cols.join(',')
    const items = Array.isArray(x) ? x : [x]

    console.log(header)

    for (const item of items) {
      const values = cols.map(col => {
        return prop(item, col)
      })
      
      const row = values.join(',')

      console.log(row)
    }
  }
}

module.exports = OutputCsv
