const Assert = require('assert-plus')

class GetCpuUsageByProcs {
  static async invoke(_params) {
    return [{ pid: 123, cpu: 0.31 }, { pid: 124, cpu: 0.25 }]
  }
}

module.exports = GetCpuUsageByProcs
