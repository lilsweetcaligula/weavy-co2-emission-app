const Assert = require('assert-plus')
const { prop, setProp } = require('./functools')
const App = require('./app')

; (async () => {
  await App.invoke({
    output: 'csv',
    totals_only: false,
    columns: ['pid', 'cpu', 'electricity_usage_kw', 'co2_emission_lbs']
  })
})()

