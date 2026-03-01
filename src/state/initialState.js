export const initialState = {
  // Current step (1-11)
  currentStep: 1,

  // Project definition
  project: {
    name: '',
    sector: '',
    subtype: '',
    location: '',
    description: '',
    scale: '',
  },

  // Step 1: Macro & Sector Research
  macro: {
    indicators: {
      fedFundsRate: null,
      sofr: null,
      cpiInflation: null,
      unemployment: null,
      treasury5yr: null,
      treasury10yr: null,
    },
    lastFetched: null,
    loading: false,
    error: null,
  },

  sector: {
    selected: null,
    subtype: null,
    trends: null,
    loading: false,
  },

  drivers: {
    selected: [],
    research: {},
  },

  // Financial Model (continuous)
  financial: {
    // Spread Calculator
    noi: 8000000,
    tcd: 100000000,
    exitCapRate: 6.5,

    // Derived (calculated in reducer)
    developerYield: 0,
    developerSpread: 0,
    impliedSalesPrice: 0,
    grossProfit: 0,
  },

  // AI Analysis
  aiAnalysis: {
    results: [],
    loading: false,
    error: null,
  },

  // Research results per step
  research: {
    step1: null,
    step2: null,
    step3: null,
    step5: null,
    step11: null,
  },
}
