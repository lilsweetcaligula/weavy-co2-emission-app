const Assert = require('assert-plus')

class CalculateCo2EmissionLbsBasedOnElectricityUsageKw {
  static async invoke(el_usage) {
    Assert.number(el_usage, 'el_usage')

    const { getCo2EmissionLbsPerKw } = CalculateCo2EmissionLbsBasedOnElectricityUsageKw
    const co2_lbs_per_kw = await getCo2EmissionLbsPerKw()

    return co2_lbs_per_kw * el_usage
  }

  static async getCo2EmissionLbsPerKw() {
    return 1.45
  }
}

module.exports = CalculateCo2EmissionLbsBasedOnElectricityUsageKw
