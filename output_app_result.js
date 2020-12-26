const Assert = require('assert-plus')
const OutputAppListing = require('./output_app_listing')
const OutputAppTotals = require('./output_app_totals')
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

module.exports = OutputAppResult
