const Assert = require('assert-plus')

class CalculateElectricityUsageKwBasedOnCpuUsage {
  static async invoke(cpu_usage) {
    Assert.number(cpu_usage, 'cpu_usage')

    const { cpuMaxElectricityUsageKw } = CalculateElectricityUsageKwBasedOnCpuUsage
    const max_el_usage = await cpuMaxElectricityUsageKw()

    return cpu_usage / 100.0 * max_el_usage
  }
  
  static async cpuMaxElectricityUsageKw() {
    // TODO: This is a mock value, taken from here:
    //
    // https://sustainability.tufts.edu/wp-content/uploads/Computer_calculations.pdf
    //
    // The link has been kindly provided by Ayush Jain:
    // https://github.com/AJ-54
    //
    // We must actually calculate the real CPU electricity usage
    // based on the user's CPU.
    //

    // NOTE: Do not forget to multiply by the number of cores if necessary.
    //

    return 0.045
  }
}

module.exports = CalculateElectricityUsageKwBasedOnCpuUsage
