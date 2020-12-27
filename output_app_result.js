const Assert = require('assert-plus')
const OutputJson = require('./output_json')
const OutputCsv = require('./output_csv')
const OutputTerm = require('./output_term')
const { prop, setProp } = require('./functools')

class OutputAppResult {
  static async invoke(result, opts) {
    Assert.object(opts, 'opts')

    if (opts.totals_only) {
      const cols = ['cpu', 'co2_emission_lbs']

      const totals = cols.reduce((o, col) => {
        const value = result
          .map(info => prop(info, col))
          .reduce((x, y) => x + y, 0)

        return setProp(o, col, value)
      }, {})

      await OutputAppTotals.invoke(totals, opts)
    } else {
      await OutputAppListing.invoke(result, opts)
    }
  }
}

class OutputAppTotals {
  static async invoke(x, opts) {
    const columns = getSupportedColumnsBasedOnOpts({
      supported_columns: ['cpu', 'co2_emission_lbs']
    }, opts)

    const printer = getPrinterBasedOnOpts(opts)

    await printer.invoke(x, { columns })
  }
}

class OutputAppListing {
  static async invoke(x, opts) {
    const SUPPORTED_COLUMNS = ['pid', 'cpu', 'co2_emission_lbs']

    const columns = getSupportedColumnsBasedOnOpts({
      supported_columns: SUPPORTED_COLUMNS
    }, opts)

    const sorter = getSorterBasedOnOpts({
      supported_columns: SUPPORTED_COLUMNS
    }, opts)

    const printer = getPrinterBasedOnOpts(opts)

    await printer.invoke(sorter(x), { columns })
  }
}

function getPrinterBasedOnOpts(opts) {
  const out = prop(opts, 'output')

  switch (out) {
    case 'json': return OutputJson
    case 'csv': return OutputCsv
    case 'term': return OutputTerm
    default: throw new Error(`The "${out}" format is not supported.`)
  }
}

function getSupportedColumnsBasedOnOpts(params, opts) {
  Assert.object(params, 'params')
  Assert.object(opts, 'opts')

  const supported_columns = prop(params, 'supported_columns')

  const requested_columns = opts.columns || []
  Assert.array(requested_columns, 'requested_columns')

  return supported_columns.filter(supported_col => {
    return requested_columns.includes(supported_col)
  })
}

function getSorterBasedOnOpts(params, opts) {
  Assert.object(params, 'params')
  Assert.object(opts, 'opts')

  const supported_columns = prop(params, 'supported_columns')

  return x => {
    if (Array.isArray(x)) {
      const sort_by =
        (prop(opts, 'sort_by', Assert.array) || [])
          .filter(info => {
            Assert.array(info, 'info')
            Assert(info.length >= 2, 'info.length >= 2')

            const [col,] = info

            return supported_columns.includes(col)
          })

      if (sort_by.length === 0) {
        return x
      }

      const defaultComparer = (x, y) => {
        if (x < y) return -1
        if (x > y) return 1
        return 0
      }

      const comparer = sort_by.reduce((f, info) => {
        Assert.array(info, 'info')

        const [col, order,] = info

        return (a, b) => {
          const cmp = f(a, b)

          if (cmp !== 0) {
            return cmp
          }

          const order_modifier = order.toLowerCase() === 'desc' ? -1 : 1

          return order_modifier * defaultComparer(prop(a, col), prop(b, col))
        }
      }, defaultComparer)

      return [...x].sort(comparer)
    }

    return x
  }
}

module.exports = OutputAppResult
