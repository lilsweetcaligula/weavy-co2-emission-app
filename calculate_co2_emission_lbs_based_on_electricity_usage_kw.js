const Assert = require('assert-plus')

class CalculateCo2EmissionLbsBasedOnElectricityUsageKw {
  static async invoke(el_usage) {
    Assert.number(el_usage, 'el_usage')
    return el_usage // NOTE: It's just a mock for now.
  }
}

module.exports = CalculateElectricityUsageKwBasedOnCpuUsage
