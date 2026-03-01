/**
 * Default ranges for all scenario sliders.
 * Used in Phase 3 (Steps 4, 6-10).
 */
export const scenarioDefaults = {
  // Step 4: Contract Negotiation
  preLeasingAtClosing: { min: 0, max: 60, base: 25, step: 5, unit: '%' },
  entitlementTimeline: { min: 3, max: 24, base: 9, step: 1, unit: 'months' },
  designEngineeringCost: { min: 3, max: 8, base: 5, step: 0.5, unit: '% of hard costs' },

  // Step 6: Closing
  closingTimeline: { min: 1, max: 6, base: 3, step: 1, unit: 'months' },
  closingCosts: { min: 1, max: 3, base: 2, step: 0.25, unit: '% of deal' },

  // Step 7: Construction
  constructionDuration: { min: 12, max: 42, base: 24, step: 1, unit: 'months' },
  hardCostEscalation: { min: 0, max: 10, base: 3, step: 0.5, unit: '% annual' },
  changeOrders: { min: 0, max: 15, base: 5, step: 1, unit: '% of hard costs' },

  // Step 8: Completion & Opening
  coDelay: { min: 0, max: 6, base: 0, step: 1, unit: 'months' },
  freeRentPeriod: { min: 0, max: 9, base: 2, step: 1, unit: 'months' },
  openingOccupancy: { min: 20, max: 70, base: 40, step: 5, unit: '%' },

  // Step 9: Management & Lease-Up
  monthlyAbsorption: { min: 1, max: 10, base: 3, step: 0.5, unit: '% per month' },
  effectiveRentRatio: { min: 85, max: 100, base: 93, step: 1, unit: '%' },
  opexRatio: { min: 25, max: 50, base: 35, step: 1, unit: '%' },
  managementFee: { min: 2, max: 5, base: 3, step: 0.5, unit: '% of EGI' },

  // Step 10: Stabilization
  stabilizationThreshold: { min: 85, max: 97, base: 93, step: 1, unit: '%' },
}
