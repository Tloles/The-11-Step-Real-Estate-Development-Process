/**
 * Macro indicator definitions and course reference values.
 * Course reference values serve as fallback when API is unavailable.
 */
export const macroIndicators = [
  {
    id: 'fedFundsRate',
    name: 'Fed Funds Rate',
    source: 'Federal Reserve',
    relevance: 'Base rate driving all borrowing costs',
    courseReference: '4.25-4.50%',
    unit: '%',
    icon: 'Landmark',
  },
  {
    id: 'sofr',
    name: 'SOFR',
    source: 'Dept. of Treasury',
    relevance: 'Construction loan pricing benchmark',
    courseReference: '4.30%',
    unit: '%',
    icon: 'Building2',
  },
  {
    id: 'cpiInflation',
    name: 'CPI Inflation',
    source: 'Bureau of Labor Statistics',
    relevance: 'Cost escalation projections',
    courseReference: '2.9%',
    unit: '%',
    icon: 'TrendingUp',
  },
  {
    id: 'unemployment',
    name: 'Unemployment',
    source: 'Bureau of Labor Statistics',
    relevance: 'Demand indicator, labor cost driver',
    courseReference: '4.0%',
    unit: '%',
    icon: 'Users',
  },
  {
    id: 'treasury5yr',
    name: '5-Year Treasury',
    source: 'Dept. of Treasury',
    relevance: 'Medium-term rate environment',
    courseReference: '3.95%',
    unit: '%',
    icon: 'FileText',
  },
  {
    id: 'treasury10yr',
    name: '10-Year Treasury',
    source: 'Dept. of Treasury',
    relevance: 'Permanent financing benchmark',
    courseReference: '4.10%',
    unit: '%',
    icon: 'FileText',
  },
]
