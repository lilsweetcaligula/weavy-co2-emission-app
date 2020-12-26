const Assert = require('assert-plus')
const { prop, setProp } = require('./functools')

class OutputTerm {
  static invoke(x, opts) {
    Assert.object(opts, 'opts')

    const cols = prop(opts, 'columns', Assert.array)

    if (cols.length === 0) {
      return
    }

    const items = Array.isArray(x) ? x : [x]

    if (items.length === 0) {
      return
    }

    const length_lookup = (() => {
      const pairs = cols.map(col => {
        const max_len = items.reduce((max_len_so_far, item) => {
          const cur_len = JSON.stringify(prop(item, col)).length
          return Math.max(max_len_so_far, cur_len)
        }, -Infinity)

        return [col, max_len]
      })

      return new Map(pairs)
    })()

    const header = cols.map(col => {
      const col_length = length_lookup.get(col)
      return col.padEnd(col_length, ' ')
    }).join('   ')

    console.log(header)

    for (const item of items) {
      const cells = cols.map(col => {
        const value = prop(item, col)
        const col_length = length_lookup.get(col)

        Assert.number(col_length, 'col_length')

        return JSON.stringify(value).padEnd(col_length, ' ')
      })

      const row = cells.join('   ')

      console.log(row)
    }
  }
}

module.exports = OutputTerm
