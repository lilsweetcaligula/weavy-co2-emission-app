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
    const columns = getSupportedColumnsBasedOnOpts({
      supported_columns: ['pid', 'cpu', 'co2_emission_lbs']
    }, opts)

    const printer = getPrinterBasedOnOpts(opts)

    await printer.invoke(x, { columns })
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

module.exports = OutputAppResult
