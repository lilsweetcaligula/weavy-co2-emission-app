const Assert = require('assert-plus')
const OutputJson = require('./output_json')
const OutputCsv = require('./output_csv')
const OutputTerm = require('./output_term')
const { prop, setProp } = require('./functools')

class OutputAppListing {
  static async invoke(x, opts) {
    const printer = (() => {
      const out = prop(opts, 'output')

      switch (out) {
        case 'json': return OutputJson
        case 'csv': return OutputCsv
        case 'term': return OutputTerm
        default: throw new Error(`The "${out}" format is not supported.`)
      }
    })()

    await printer.invoke(x, {
      columns: ['pid', 'cpu', 'co2_emission_lbs']
    })
  }
}

module.exports = OutputAppListing
