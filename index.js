const Assert = require('assert-plus')
const { prop, setProp } = require('./functools')
const App = require('./app')

; (async () => {
  await App.invoke({ output: 'json' })
})()

