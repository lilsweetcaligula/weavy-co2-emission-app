const Assert = require('assert-plus')
const { prop, setProp } = require('./functools')

; (async () => {
  const cpu_usage_infos = await GetCpuUsageByProcs.invoke({}) // [{ pid: 123, cpu: 0.31 }, ...]

  const el_usage_infos = await Promise.all(cpu_usage_infos.map(async (usage) => {
    const cpu_usage = prop(usage, 'cpu')
    const el_usage = await CalculateElectricityUsageKwBasedOnCpuUsage.invoke(cpu_usage)

    return setProp(usage, 'electricity_usage_kw', el_usage)
  }))

  const co2_em_infos = await Promise.all(el_usage_infos.map(async (usage) => {
    const el_usage = prop(usage, 'electricity_usage_kw')
    const co2_em = await CalculateCo2EmissionLbsBasedOnElectricityUsageKw.invoke(el_usage)

    return setProp(usage, 'co2_emission_lbs', co2_em)
  }))

  console.dir(co2_em_infos, { depth: 4 })
})()

