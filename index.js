const Assert = require('assert-plus')
const Minimist = require('minimist')
const { prop, setProp } = require('./functools')
const App = require('./app')

; (async () => {
  const opts = optsOfArgv(process.argv)
  await App.invoke(opts)
})()

function optsOfArgv(argv) {
  Assert.array(argv, 'argv')


  const args = argv.slice(2)
  const opts = Minimist(args)


  const SUPPORTED_COLUMNS = ['pid', 'cpu', 'electricity_usage_kw', 'co2_emission_lbs']

  const sort_by = (() => {
    if (opts['sort-by']) {
      return prop(opts, 'sort-by')
        .split(',')
        .map(x => x.split(':'))
        .map(xs => {
          Assert.array(xs, 'xs')
          Assert(xs.length > 0, 'xs.length > 0')

          if (xs.length === 1) {
            const [col,] = xs
            return [col, 'asc']
          } else {
            return xs.slice(0, 2)
          }
        })
        .filter(([col,]) => SUPPORTED_COLUMNS.includes(col))
        .filter(([, order]) => ['asc', 'desc'].includes(order.toLowerCase()))
    }

    return []
  })()


  const columns = (() => {
    if ('columns' in opts) {
      return prop(opts, 'columns', Assert.string)
        .split(',')
        .filter(col => SUPPORTED_COLUMNS.includes(col))
    }

    return SUPPORTED_COLUMNS
  })()


  const output = (() => {
    const SUPPORTED_OUTPUTS = ['json', 'csv', 'term']

    if ('output' in opts) {
      const requested_output = prop(opts, 'output', Assert.string)
      const is_supported_output = SUPPORTED_OUTPUTS.some(out => out === requested_output)

      if (!is_supported_output) {
        return 'term'
      }

      return requested_output
    }

    return 'term'
  })()


  const totals_only = opts.total || false


  return {
    output,
    totals_only,
    columns,
    sort_by
  }
}

