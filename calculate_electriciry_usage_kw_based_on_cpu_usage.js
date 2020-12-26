const Assert = require('assert-plus')

class CalculateElectricityUsageKwBasedOnCpuUsage {
  static async invoke(cpu_usage) {
    Assert.number(cpu_usage, 'cpu_usage')
    return cpu_usage // NOTE: It's just a mock for now.
  }
}

module.exports = CalculateElectricityUsageKwBasedOnCpuUsage
