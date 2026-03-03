# Map & Demographics UI Overhaul — Claude Code Prompt

Read CLAUDE.md and .claude/PRD.md for context. This is a major upgrade to the Demographics map and panel in Step 2.

## Overview

We're transforming the demographics map into a full submarket intelligence tool. The changes:
1. Cleaner base map (CartoDB Positron)
2. Tracts vs Towns view toggle
3. Expanded color-by dropdown with grouped categories
4. New Census variables for market signals
5. Better comparison behavior in the tabs
6. Upgrade to 2024 ACS data

---

## 1. Base Map Change

Replace the OpenStreetMap tile layer with CartoDB Positron for a clean, professional look:

```javascript
<TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
/>
```

This gives a light gray minimal base that lets the data overlays pop without competing road labels and colors.

---

## 2. View Toggle: Tracts vs Towns

Add a toggle above the map that switches between two views:

**Tracts mode (default):**
- Shows census tract boundaries within the county
- Clicking a tract loads that tract's data into the left column of the tabs
- Right column shows the containing city/place for comparison
- Good for: identifying specific pockets within a submarket

**Towns mode:**
- Shows incorporated place/city boundaries in the surrounding area
- Fetch place boundaries from TIGERweb Places_CouSub_ConCity_SubMCD MapServer
- Clicking a town loads that town's demographics into the left column
- Right column shows the county average for comparison
- Good for: deciding which town/city to focus on

For Towns mode, fetch place boundaries:
```javascript
async function fetchPlaceBoundaries(stateCode) {
  const url = `/api/tiger/arcgis/rest/services/TIGERweb/Places_CouSub_ConCity_SubMCD/MapServer/15/query?` +
    `where=STATE='${stateCode}'` +
    `&outFields=GEOID,BASENAME,NAME,STATE,PLACE,AREALAND` +
    `&returnGeometry=true` +
    `&outSR=4326` +
    `&f=geojson` +
    `&resultRecordCount=100`;
  const response = await fetch(url);
  return await response.json();
}
```

To get county-level averages for the Towns mode comparison column, fetch demographics with `for=county:COUNTYCODE&in=state:STATECODE`.

The toggle should be styled as a segmented button control:
```
[ 🔬 Tracts | 🏘️ Towns ]
```
Active segment gets the gold accent background. Inactive is white with border.

---

## 3. Expanded Color-By Dropdown

Replace the current flat dropdown with a grouped dropdown. Use optgroup or a custom styled dropdown with section headers:

```
─── Current Snapshot ───
  Median Income
  Home Value  
  Median Rent
  Vacancy Rate
  Median Age
  Population Density
  Renter %
  Poverty Rate
  WFH %
  Gini Index (Income Inequality)
─── Growth (5yr) ───
  Income Growth %
  Home Value Growth %
  Population Growth %
  Rent Growth %
─── Market Signals ───
  Cost-Burdened Renters %
  Housing Stock Age (Median Year Built)
  Migration Rate (% Moved In Last Year)
  High-Income In-Migration %
  Professional Degree %
```

**Color scales by category:**
- Current Snapshot metrics: sequential gradient, light to dark. Use a gold-to-navy gradient: `#FEF3C7` (light gold) → `#1E3A5F` (deep navy)
- Growth metrics: diverging gradient. Red (`#DC2626`) → White (`#FFFFFF`) → Green (`#059669`). Center on 0%.
- Market Signals: sequential gradient matching the brand, but pick the direction that makes intuitive sense (e.g., high cost burden = warm/red, high professional degree = cool/blue)

---

## 4. New Census Variables to Fetch

Add these variables to the batch county-wide fetch (for map coloring) and to individual tract/place fetches (for tab display).

### For the map color overlay (batch fetch for all tracts in county):

Add to the existing batch fetch in publicApis.js. These are single variables that can color the map:

| Metric | Variable(s) | Calculation |
|--------|------------|-------------|
| Poverty Rate | B17001_002E, B17001_001E | (below poverty / total) × 100 |
| Gini Index | B19083_001E | Direct value (0-1, higher = more inequality) |
| WFH % | B08301_021E, B08301_001E | (WFH / total workers) × 100 |
| Renter % | B25003_003E, B25003_001E | (renters / occupied units) × 100 |
| Cost-Burdened Renters % | B25070_007E+B25070_008E+B25070_009E+B25070_010E, B25070_001E | (paying 30%+ / total renters) × 100 |
| Migration Rate | B07001_017E+B07001_033E+B07001_049E+B07001_065E+B07001_081E+B07001_097E, B07001_001E | (total moved / total pop) × 100 — NOTE: check these codes, the B07001 series is complex |
| Professional Degree % | B15003_024E, B15003_001E | (professional degree / total 25+) × 100 |
| Median Year Built | B25035_001E | Direct value |

**Important:** You can fetch up to 50 variables in one Census API call. Group the new variables with existing ones efficiently. Cache all results.

For growth metrics, the existing historical fetch (2019 ACS) already covers income, home value, population, and rent. No new historical fetches needed.

### For the tabs (individual tract/place fetch):

Add these to the appropriate tab data fetches:

**Overview tab — add:**
| Variable | Code |
|----------|------|
| Poverty Rate | B17001_002E, B17001_001E |
| Gini Index | B19083_001E |
| Professional Degree | B15003_024E |

**Income tab — add:**
| Variable | Code |
|----------|------|
| Gini Index | B19083_001E |

**Housing tab — add:**
| Variable | Code | Notes |
|----------|------|-------|
| Rent brackets | B25063_002E through B25063_026E | Distribution of actual rents paid |
| Home value brackets | B25075_002E through B25075_027E | Distribution of home values |
| Year built brackets | B25034_002E through B25034_011E | Age of housing stock distribution |
| Bedrooms (0-5+) | B25041_002E through B25041_008E | Unit mix |

Display rent brackets as a horizontal bar chart showing what % of renters pay each rent level. Same for home value and year built — these distribution charts are far more useful than a single median.

Display bedroom distribution as a bar chart. Highlight gaps — e.g., if there are very few studios or 1BRs compared to 3BR+, that's a development opportunity.

**Population tab — add:**
| Variable | Code | Notes |
|----------|------|-------|
| Moved from different county (same state) | B07001_065E | Regional in-migration |
| Moved from different state | B07001_081E | Long-distance in-migration |
| Moved from abroad | B07001_097E | International in-migration |
| Total population for mobility | B07001_001E | Denominator |

Add a "Migration" section to the Population tab showing what % of residents are new (moved in last year) and where they came from, as a simple breakdown.

---

## 5. Comparison Behavior

Update the tab display logic:

| View Mode | Left Column Header | Left Column Data | Right Column Header | Right Column Data |
|-----------|-------------------|------------------|--------------------|--------------------|
| Tracts | "CENSUS TRACT" | Selected tract | "CITY / PLACE" | Containing city/place |
| Towns | "CITY / PLACE" | Selected town | "COUNTY" | County average |

When the user switches from Tracts to Towns mode, update both columns accordingly. The tab data should refresh to show the appropriate geography comparison.

---

## 6. Upgrade to 2024 ACS Data

Update ALL Census ACS API calls:
- Current: `https://api.census.gov/data/2024/acs/acs5` (was 2023)
- Historical: `https://api.census.gov/data/2019/acs/acs5` (was 2018)
- Update source labels: "ACS 2024 (5-Year Estimates)" 
- Update growth labels: "(2019→2024)"

---

## 7. UI Polish

- Map height: 400px (increase from current ~320px to give more room)
- The view toggle and color-by dropdown should sit in a clean control bar above the map
- Selected tract/town indicator below the map: "📍 Viewing: Tract 504.59, Gwinnett County" with a "↺ Reset to project location" link
- Color legend: horizontal gradient bar below the map, showing min and max values for the selected metric. For growth metrics, show the center (0%) clearly.
- On hover over a tract/town: show a tooltip with the name and the value of the currently selected color metric
- The project location should always have a distinct marker (gold pin) regardless of which tract/town is selected for viewing
- Smooth transitions when switching color metrics (fade the colors rather than instant swap if possible)

---

## Implementation Order

1. Switch to CartoDB Positron base map (quick win)
2. Add the Tracts/Towns view toggle and place boundary fetching
3. Expand the color-by dropdown with grouped categories
4. Add new Census variable fetches (batch for map + individual for tabs)
5. Update comparison column behavior for Towns mode
6. Upgrade to 2024 ACS endpoints
7. Add new data displays to tabs (rent brackets chart, value brackets chart, year built chart, bedroom distribution, poverty, Gini, migration)
8. Polish (map height, control bar styling, legend, hover tooltips)

Build this now.
