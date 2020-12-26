const Assert = require('assert-plus')
const psList = require('ps-list')
const { prop, setProp } = require('./functools')

class GetCpuUsageByProcs {
  // MOCK
  //
  /*
  static async invoke(_params) {
    return [{ pid: 123, cpu: 0.31 }, { pid: 124, cpu: 0.25 }]
  }
  */

  static async invoke(_params) {
    const procs = await psList()

    return procs.map(proc => {
      const pid = prop(proc, 'pid')
      const cpu = prop(proc, 'cpu')

      return { pid, cpu }
    })
  }
}

module.exports = GetCpuUsageByProcs
