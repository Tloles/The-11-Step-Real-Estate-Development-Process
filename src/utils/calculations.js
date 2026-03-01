/**
 * Core financial calculations for the Developer's Targeted Spread model.
 * All formulas derived from Prof. Branch's slides (slide 38 benchmarks).
 */

export function recalcFinancials(financial) {
  const { noi, tcd, exitCapRate } = financial

  // Developer's Yield on TCD = NOI at Stabilization / Total Cost of Development
  const developerYield = tcd > 0 ? (noi / tcd) * 100 : 0

  // Developer's Targeted Spread = Yield - Exit Cap Rate (in basis points)
  const developerSpread = (developerYield - exitCapRate) * 100

  // Implied Sales Price = NOI at Stabilization / Exit Cap Rate
  const impliedSalesPrice = exitCapRate > 0 ? noi / (exitCapRate / 100) : 0

  // Gross Profit/Loss = Sales Price - TCD
  const grossProfit = impliedSalesPrice - tcd

  return {
    ...financial,
    developerYield,
    developerSpread,
    impliedSalesPrice,
    grossProfit,
  }
}

/**
 * Determine spread health status
 * Strong: >= 200 BP, Target: >= 150 BP, Thin: >= 100 BP, Negative: < 100 BP
 */
export function getSpreadHealth(spreadBP) {
  if (spreadBP >= 200) return { label: 'Strong', color: 'healthy' }
  if (spreadBP >= 150) return { label: 'Target', color: 'healthy' }
  if (spreadBP >= 100) return { label: 'Thin', color: 'caution' }
  return { label: 'Negative', color: 'warning' }
}

/**
 * Monthly carry cost = Outstanding Loan Balance × (Annual Rate / 12)
 */
export function monthlyCarryCost(loanBalance, annualRate) {
  return loanBalance * (annualRate / 100 / 12)
}

/**
 * Time to Stabilization (months)
 * = (Stabilization Threshold - Opening Occupancy) / Monthly Absorption Rate
 */
export function timeToStabilization(stabilizationThreshold, openingOccupancy, monthlyAbsorption) {
  if (monthlyAbsorption <= 0) return Infinity
  return (stabilizationThreshold - openingOccupancy) / monthlyAbsorption
}

/**
 * Equity Multiple = Total Distributions / Total Equity Invested
 */
export function equityMultiple(totalDistributions, totalEquity) {
  if (totalEquity <= 0) return 0
  return totalDistributions / totalEquity
}
