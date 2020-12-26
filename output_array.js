const Assert = require('assert-plus')
const { prop, setProp } = require('./functools')

// WARNING: All ary in the array to be output must have
// the same structure.
//
class OutputArray {
  static async invoke(ary, opts) {
    Assert.array(ary, 'ary')
    Assert.object(opts, 'opts')

    const out = prop(opts, 'output', Array.string)

    if (out === 'json') {
      return OutputArray.json(ary)
    }

    if (out === 'csv') {
      return OutputArray.csv(ary)
    }

    throw new Error(`The "${out}" format is not supported.`)
  }

  static json(ary) {
    Assert.array(ary, 'ary')

    for (const item of ary) {
      console.log(JSON.stringify(item))
    }
  }

  static csv(ary) {
    Assert.array(ary, 'ary')

    if (ary.length === 0) {
      return
    }

    const [item,] = ary
    const cols = Object.keys(item)
    const header = cols.join(',')

    console.log(header)

    for (const item of ary) {
      const values = cols.map(col => {
        return prop(item, col)
      })
      
      const row = values.join(',')

      console.log(row)
    }
  }
}

module.exports = OutputArray
