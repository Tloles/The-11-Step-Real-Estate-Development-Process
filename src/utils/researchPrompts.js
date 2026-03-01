/**
 * AI prompt templates for each research step.
 * Each prompt is designed to work with the Anthropic web search tool.
 */

export function macroResearchPrompt() {
  return `You are a commercial real estate research analyst. Search for and provide the CURRENT values of these key macroeconomic indicators:

1. Federal Funds Rate (current target range)
2. SOFR (Secured Overnight Financing Rate)
3. CPI Inflation (latest year-over-year)
4. Unemployment Rate (latest)
5. 5-Year Treasury Yield
6. 10-Year Treasury Yield

For each indicator, provide:
- The current value
- The direction of recent trend (rising/falling/stable)
- Brief context for CRE impact

Format as a structured summary. Be precise with numbers and cite recent dates.`
}

export function sectorTrendsPrompt(sector, subtype) {
  return `You are a commercial real estate research analyst. Research current trends for the ${sector}${subtype ? ` — ${subtype}` : ''} sector:

1. Current national vacancy rate and trend
2. Rent growth trajectory
3. New supply pipeline
4. Demand drivers
5. Key risks and headwinds
6. Investment sentiment and cap rate trends

Provide specific data points with sources. Focus on trends relevant to a developer evaluating a new project in this sector.`
}

export function aiAnalysisPrompt(sector, location, macroData) {
  return `You are a senior commercial real estate development advisor. Based on the following context, provide a brief feasibility assessment:

Sector: ${sector || 'Not yet selected'}
Location: ${location || 'Not yet specified'}
Current Macro Environment: ${macroData ? JSON.stringify(macroData) : 'Not yet loaded'}

Address:
1. Is this a favorable macro environment for new development? Why/why not?
2. What are the 2-3 biggest risks for this project type right now?
3. What spread should the developer target given current conditions?
4. Any location-specific considerations?

Keep the analysis concise and actionable (3-4 paragraphs max).`
}
