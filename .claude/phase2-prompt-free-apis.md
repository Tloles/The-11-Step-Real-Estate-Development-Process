# Phase 2 Prompt for Claude Code — Free APIs Only

Read CLAUDE.md and .claude/PRD.md to refresh context. We're building Phase 2: Research Engine Expansion.

## CRITICAL CHANGE: No Anthropic API Calls for Research

Remove ALL Anthropic API usage from the research modules. Every data point must come from free public APIs. The only place the Anthropic API should remain is in the optional AI Analysis Panel — and only when the user explicitly clicks "Run Analysis." No automatic AI calls anywhere.

This means:
- Delete or refactor any existing code that calls api.anthropic.com for research data
- Remove web search tool usage from research modules
- All research buttons should call free public APIs directly
- The AI Analysis Panel (AIAnalysisPanel.jsx) can stay but should be clearly labeled as "Uses API credits" so the user knows

---

## Free API Integration Plan

Create `src/utils/publicApis.js` with all API helper functions.

### API 1: FRED (Federal Reserve Economic Data)
**Used in:** Step 1 Macro Dashboard
**Base URL:** `https://api.stlouisfed.org/fred/series/observations`
**Key:** `VITE_FRED_API_KEY` from .env (free registration at fred.stlouisfed.org)

Fetch these series (most recent observation for each):

| Data Point | Series ID | Notes |
|-----------|-----------|-------|
| Fed Funds Rate (upper) | DFEDTARU | Direct value |
| SOFR | SOFR | Direct value |
| CPI Inflation YoY | CPIAUCSL | Fetch last 13 months, calculate YoY % change |
| Unemployment Rate | UNRATE | Direct value |
| 5-Year Treasury | DGS5 | Direct value |
| 10-Year Treasury | DGS10 | Direct value |
| 30-Year Mortgage Rate | MORTGAGE30US | Direct value (bonus for financing context) |
| Prime Rate | DPRIME | Direct value (bonus) |

**Example fetch function:**
```javascript
export async function fetchFredSeries(seriesId, limit = 1) {
  const apiKey = import.meta.env.VITE_FRED_API_KEY;
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.observations;
}
```

**For CPI YoY calculation:**
```javascript
export async function fetchInflationRate() {
  const observations = await fetchFredSeries('CPIAUCSL', 13);
  const latest = parseFloat(observations[0].value);
  const yearAgo = parseFloat(observations[12].value);
  return ((latest - yearAgo) / yearAgo * 100).toFixed(2);
}
```

**Refactor MacroDashboard.jsx** to use these FRED functions instead of any AI calls. Each indicator card should show the live value, the date it was observed, and the series source.

---

### API 2: US Census Bureau
**Used in:** Step 2 Demographics
**Base URL:** `https://api.census.gov/data/2023/acs/acs5`
**Key:** Optional — `VITE_CENSUS_API_KEY` from .env, or works without a key

**Step 1: Geocode the user's location to get FIPS codes**
Use the Census Geocoder:
```javascript
export async function geocodeLocation(address) {
  const encoded = encodeURIComponent(address);
  const url = `https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=${encoded}&benchmark=Public_AR_Current&vintage=Census2020_Current&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  const match = data.result?.addressMatches?.[0];
  if (match) {
    return {
      state: match.geographies?.['Census Tracts']?.[0]?.STATE,
      county: match.geographies?.['Census Tracts']?.[0]?.COUNTY,
      tract: match.geographies?.['Census Tracts']?.[0]?.TRACT,
      lat: match.coordinates?.y,
      lng: match.coordinates?.x,
      geoid: match.geographies?.['Census Tracts']?.[0]?.GEOID
    };
  }
  return null;
}
```

**Step 2: Fetch demographics for that geography**
```javascript
export async function fetchDemographics(state, county) {
  const apiKey = import.meta.env.VITE_CENSUS_API_KEY;
  const keyParam = apiKey ? `&key=${apiKey}` : '';
  const variables = [
    'B01003_001E', // Total Population
    'B19013_001E', // Median Household Income
    'B01002_001E', // Median Age
    'B25077_001E', // Median Home Value
    'B25001_001E', // Total Housing Units
    'B25002_003E', // Vacant Housing Units
    'B25064_001E', // Median Gross Rent
    'B23025_002E', // Labor Force
    'B23025_005E', // Unemployed
    'B15003_022E', // Bachelor's Degree holders
    'B15003_023E', // Master's Degree holders
    'B15003_025E', // Doctorate holders
    'B01001_002E', // Male population (for gender split)
    'B01001_026E', // Female population
    'NAME'
  ].join(',');
  
  const url = `https://api.census.gov/data/2023/acs/acs5?get=${variables}&for=county:${county}&in=state:${state}${keyParam}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

**Build a DemographicsPanel.jsx** in `src/components/research/` that:
1. Takes the user's location from ProjectContext
2. Geocodes it to FIPS codes
3. Fetches Census data for that county
4. Displays in a clean card layout: Population, Median Income, Median Age, Home Values, Vacancy Rate, Education Levels, Labor Force stats
5. Calculate derived metrics: vacancy rate (vacant/total units), unemployment rate (unemployed/labor force), college education rate

---

### API 3: Bureau of Labor Statistics (BLS)
**Used in:** Step 2 Employment
**Base URL:** `https://api.bls.gov/publicAPI/v2/timeseries/data/`
**Key:** Optional — `VITE_BLS_API_KEY` from .env for higher limits

```javascript
export async function fetchBLSData(seriesIds, startYear, endYear) {
  const apiKey = import.meta.env.VITE_BLS_API_KEY;
  const body = {
    seriesid: seriesIds,
    startyear: startYear.toString(),
    endyear: endYear.toString(),
  };
  if (apiKey) body.registrationkey = apiKey;
  
  const response = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return data.Results?.series;
}
```

**Key series for employment:**
- Local Area Unemployment: `LAUST${stateCode}0000000000003` (state level)
- CES Employment: State and metro level employment by industry

**Build an EmploymentPanel.jsx** that shows: local unemployment rate, employment trends, job growth. Combine with Census labor force data for a complete picture.

---

### API 4: FEMA Flood Zones
**Used in:** Step 2 Environmental
**Base URL:** `https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer`
**Key:** Not required

```javascript
export async function fetchFloodZone(lat, lng) {
  const url = `https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer/28/query?geometry=${lng},${lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=FLD_ZONE,ZONE_SUBTY,SFHA_TF&returnGeometry=false&f=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.features?.[0]?.attributes;
}
```

**Build a FloodZonePanel** (can be part of an EnvironmentalPanel.jsx) that shows: flood zone designation, whether it's a Special Flood Hazard Area, and what that means for development.

---

### API 5: Census Building Permits
**Used in:** Step 2 Competition / Supply Pipeline
**Base URL:** `https://api.census.gov/data/timeseries/eits/bps`
**Key:** Same optional Census key

```javascript
export async function fetchBuildingPermits(stateCode) {
  const apiKey = import.meta.env.VITE_CENSUS_API_KEY;
  const keyParam = apiKey ? `&key=${apiKey}` : '';
  const url = `https://api.census.gov/data/timeseries/eits/bps?get=PERMITS,UNITS&for=state:${stateCode}&time=from+2023-01${keyParam}&category_code=TOTAL`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

**Build a SupplyPipelinePanel.jsx** that shows building permit trends — a proxy for new construction activity and competition in the market.

---

### API 6: RentCast
**Used in:** Steps 2, 3, 11 — Comparable properties, rent data, market trends
**Base URL:** `https://api.rentcast.io/v1`
**Key:** `VITE_RENTCAST_API_KEY` from .env (50 free calls/month)

**IMPORTANT: RentCast has only 50 free calls/month. Use sparingly. Cache results aggressively.**

```javascript
export async function fetchRentCastMarket(zipCode) {
  const apiKey = import.meta.env.VITE_RENTCAST_API_KEY;
  const url = `https://api.rentcast.io/v1/markets?zipCode=${zipCode}`;
  const response = await fetch(url, {
    headers: { 'X-Api-Key': apiKey }
  });
  return await response.json();
}

export async function fetchRentCastListings(zipCode, propertyType) {
  const apiKey = import.meta.env.VITE_RENTCAST_API_KEY;
  const url = `https://api.rentcast.io/v1/listings/sale?zipCode=${zipCode}&propertyType=${propertyType}&limit=10`;
  const response = await fetch(url, {
    headers: { 'X-Api-Key': apiKey }
  });
  return await response.json();
}
```

**Build a MarketDataPanel.jsx** that shows: market trends, rent averages, listing data. Include a warning badge showing "X of 50 monthly calls used" so the user is aware of the limit. Cache all results in ProjectContext state.

---

### API 7: Opportunity Zone Lookup
**Used in:** Step 5 Public Incentives
**Data source:** Cross-reference the Census Geocoder tract GEOID against the IRS list of designated Opportunity Zones

The IRS published the full list of OZ census tracts. We can embed this as a static JSON file or fetch from the CDFI Fund:
```javascript
// After geocoding to get the tract GEOID, check against OZ list
export function isOpportunityZone(geoid) {
  // Check against embedded OZ tract list
  return OZ_TRACTS.includes(geoid);
}
```

For MVP, embed the Georgia OZ tracts as a static dataset in `src/data/opportunityZones.js`. Can expand to all states later.

**Build an IncentivesPanel.jsx** that automatically checks if the project location is in an Opportunity Zone and displays relevant tax benefits if so.

---

### API 8: EPA Envirofacts
**Used in:** Step 2 Environmental
**Base URL:** `https://data.epa.gov/efservice`
**Key:** Not required

```javascript
export async function fetchEPASites(lat, lng, radiusMiles = 3) {
  // Fetch superfund/brownfield sites near the location
  const url = `https://data.epa.gov/efservice/tri_facility/LATITUDE/${lat}/LONGITUDE/${lng}/RADIUS/${radiusMiles}/JSON`;
  const response = await fetch(url);
  return await response.json();
}
```

Add to EnvironmentalPanel.jsx: nearby toxic release sites, superfund proximity, environmental risk factors.

---

## Step-by-Step Implementation

### Step 1 — Inception (Refactor existing)
- Replace AI macro fetch with FRED API calls
- Keep sector selection, drivers of change, project concept form as-is (these are local, no API needed)
- Remove any AI auto-research from this step

### Step 2 — Refinement (Build new research panels)
Create these components in `src/components/research/`:
1. **DemographicsPanel.jsx** — Census API (population, income, age, education, housing)
2. **EmploymentPanel.jsx** — BLS API + Census labor data (unemployment, job trends)
3. **EnvironmentalPanel.jsx** — FEMA flood zones + EPA envirofacts (flood risk, contamination)
4. **SupplyPipelinePanel.jsx** — Census Building Permits (construction activity trends)
5. **MarketDataPanel.jsx** — RentCast API (rent trends, listings, market stats) — with usage counter

Wire these into Step2Refinement.jsx with a clean layout. Each panel should:
- Auto-fetch when the user has entered a location and clicks "Research" on that panel
- Show a loading spinner while fetching
- Display structured results in the existing dark/light theme
- Show the data source (e.g., "Source: US Census Bureau ACS 2023")
- Cache results in ProjectContext so they don't re-fetch on navigation

### Step 3 — Feasibility (Build with available free data)
- Pull construction permit trends from Census Building Permits API (proxy for supply)
- Pull market rent data from RentCast (if calls available)
- The SpreadCalculator already exists — make sure research data can populate its default values
- For data we can't get free (detailed cap rates, absorption rates, construction costs per SF): use manual input fields with helpful tooltips explaining where to find this data (e.g., "Check CBRE or JLL quarterly reports for your market")

### Step 5 — Financing (Build with available free data)
- FRED API for current rate benchmarks (SOFR, Prime, Treasury yields, mortgage rates)
- Opportunity Zone lookup via geocoded tract ID
- For data we can't get free (lender terms, equity expectations, specific incentive programs): use manual input fields with guidance tooltips

### Step 11 — Exit (Build with available free data)
- RentCast for available sale listings and market trends
- FRED for current permanent financing rate benchmarks
- For data we can't get free (transaction cap rates, investor expectations): use manual input fields with guidance

---

## Handling Data Gaps (Where Free APIs Don't Cover)

For any data point that doesn't have a free API source, DO NOT use AI. Instead:
1. Provide a manual input field where the user can enter the data themselves
2. Add a helpful tooltip or info icon explaining where to find this data (e.g., "Typical sources: CBRE Cap Rate Survey, JLL Market Report, Marcus & Millichap Research")
3. Provide sensible default ranges based on the course material (e.g., "Senior debt typically SOFR + 250-400 BP in current market")
4. These manual fields should also update ProjectContext state so they flow into the financial model

---

## Updated .env Structure

```
VITE_FRED_API_KEY=required_for_macro_data
VITE_RENTCAST_API_KEY=optional_50_free_calls_monthly
VITE_CENSUS_API_KEY=optional_for_higher_rate_limits
VITE_BLS_API_KEY=optional_for_higher_rate_limits
VITE_ANTHROPIC_API_KEY=optional_only_for_ai_analysis_panel
```

---

## Summary of What's Free vs Manual vs Optional AI

| Data | Source | Cost |
|------|--------|------|
| Fed Rate, SOFR, Inflation, Unemployment, Treasuries | FRED API | Free |
| Population, Income, Age, Education, Housing | Census API | Free |
| Employment, Unemployment trends | BLS API | Free |
| Flood Zones | FEMA API | Free |
| Environmental hazards | EPA API | Free |
| Building Permit trends | Census API | Free |
| Opportunity Zone eligibility | Census Geocoder + static OZ list | Free |
| Market rents, listings | RentCast API | Free (50/mo) |
| Zoning & land use specifics | Manual input + guidance | Free |
| CRE transaction comps & cap rates | Manual input + guidance | Free |
| Construction costs per SF | Manual input + guidance | Free |
| Lender terms & equity expectations | Manual input + guidance | Free |
| Specific public incentive programs | Manual input + guidance | Free |
| AI feasibility analysis (optional) | Anthropic API | Paid per use |

Start building now. Begin with publicApis.js and FRED integration for the macro dashboard, then work through each step.
