# Census ACS Variables — CRE Feasibility Reference

This document is a reference for Claude Code when working on the Demographics panel in Step 2. It lists all Census ACS 5-Year API variables relevant to commercial real estate development feasibility, organized by what's implemented and what should be added.

## API Endpoints

- **Current data:** `https://api.census.gov/data/2024/acs/acs5`
- **Historical comparison:** `https://api.census.gov/data/2019/acs/acs5`
- **Geography levels:** Census tract (`for=tract:TRACTCODE&in=state:SS%20county:CCC`), Place/City (`for=place:PPPPP&in=state:SS`), County (`for=county:CCC&in=state:SS`)
- **Batch all tracts in county:** `for=tract:*&in=state:SS%20county:CCC`
- **Max 50 variables per call** — group efficiently
- **Key:** Optional via `VITE_CENSUS_API_KEY`, works without one at lower rate limits
- **Null/suppressed values:** Watch for `-666666666`, `-888888888`, `-999999999` — filter these out

## Source Labels

- Current: "US Census Bureau ACS 2024 (5-Year Estimates, 2020-2024)"
- Historical: "US Census Bureau ACS 2019 (5-Year Estimates, 2015-2019)"
- Growth labels: "(2019→2024)"

---

## ✅ ALREADY IMPLEMENTED

### Overview Tab
| Data Point | Variable Code | Display |
|-----------|--------------|---------|
| Total Population | B01003_001E | Number |
| Median Household Income | B19013_001E | Currency |
| Median Age | B01002_001E | Number (1 decimal) |
| Median Home Value | B25077_001E | Currency |
| Total Housing Units | B25001_001E | Number |
| Vacant Housing Units | B25002_003E | Calculate vacancy rate: B25002_003E / B25001_001E |
| Median Gross Rent | B25064_001E | Currency + "/mo" |
| Labor Force | B23025_002E | Number |
| Unemployed | B23025_005E | Calculate rate: B23025_005E / B23025_002E |
| Bachelor's Degree | B15003_022E | Part of college edu % |
| Master's Degree | B15003_023E | Part of college edu % |
| Doctorate | B15003_025E | Part of college edu % |

### Income Tab
| Data Point | Variable Code | Display |
|-----------|--------------|---------|
| Per Capita Income | B19301_001E | Currency |
| Total Households (income) | B19001_001E | Denominator for brackets |
| HH Income <$10K | B19001_002E | Part of <$25K group |
| HH Income $10K-$14,999 | B19001_003E | Part of <$25K group |
| HH Income $15K-$19,999 | B19001_004E | Part of <$25K group |
| HH Income $20K-$24,999 | B19001_005E | Part of <$25K group |
| HH Income $25K-$29,999 | B19001_006E | Part of $25K-$49K group |
| HH Income $30K-$34,999 | B19001_007E | Part of $25K-$49K group |
| HH Income $35K-$39,999 | B19001_008E | Part of $25K-$49K group |
| HH Income $40K-$44,999 | B19001_009E | Part of $25K-$49K group |
| HH Income $45K-$49,999 | B19001_010E | Part of $25K-$49K group |
| HH Income $50K-$59,999 | B19001_011E | Part of $50K-$74K group |
| HH Income $60K-$74,999 | B19001_012E | Part of $50K-$74K group |
| HH Income $75K-$99,999 | B19001_013E | Standalone bracket |
| HH Income $100K-$124,999 | B19001_014E | Part of $100K-$149K group |
| HH Income $125K-$149,999 | B19001_015E | Part of $100K-$149K group |
| HH Income $150K-$199,999 | B19001_016E | Standalone bracket |
| HH Income $200K+ | B19001_017E | Standalone bracket |
| Median Family Income | B19113_001E | Currency |
| Aggregate Household Income | B19025_001E | Currency |

### Housing Tab
| Data Point | Variable Code | Display |
|-----------|--------------|---------|
| Occupied Units | B25002_002E | Number |
| Vacant Units | B25002_003E | Number |
| Owner-Occupied | B25003_002E | Part of tenure split |
| Renter-Occupied | B25003_003E | Part of tenure split |
| Total Occupied (tenure) | B25003_001E | Denominator |
| Median Year Built | B25035_001E | Year |
| 1-unit detached | B25024_002E | Part of unit type chart |
| 1-unit attached | B25024_003E | Part of unit type chart |
| 2 units | B25024_004E | Part of unit type chart |
| 3-4 units | B25024_005E | Part of unit type chart |
| 5-9 units | B25024_006E | Part of unit type chart |
| 10-19 units | B25024_007E | Part of unit type chart |
| 20-49 units | B25024_008E | Part of unit type chart |
| 50+ units | B25024_009E | Part of unit type chart |
| Mobile home | B25024_010E | Part of unit type chart |
| Cost burden owners (30%+) | B25091_008E + B25091_009E + B25091_010E + B25091_011E | Numerator |
| Total owners with mortgage | B25091_002E | Denominator |
| Cost burden renters (30%+) | B25070_007E + B25070_008E + B25070_009E + B25070_010E | Numerator |
| Total renters (cost) | B25070_001E | Denominator |
| Median Rooms | B25018_001E | Number |

### Population Tab
| Data Point | Variable Code | Display |
|-----------|--------------|---------|
| Male | B01001_002E | Number |
| Female | B01001_026E | Number |
| Age Under 18 | B09001_001E | Bar chart |
| Age 18-24 | Sum of B01001_007E-B01001_010E + B01001_031E-B01001_034E | Bar chart |
| Age 25-34 | B01001_011E+B01001_012E + B01001_035E+B01001_036E | Bar chart, gold highlight |
| Age 35-44 | B01001_013E+B01001_014E + B01001_037E+B01001_038E | Bar chart, gold highlight |
| Age 45-54 | B01001_015E+B01001_016E + B01001_039E+B01001_040E | Bar chart |
| Age 55-64 | B01001_017E-B01001_019E + B01001_041E-B01001_043E | Bar chart |
| Age 65+ | B01001_020E-B01001_025E + B01001_044E-B01001_049E | Bar chart |
| Total Households | B11001_001E | Number |
| Family Households | B11001_002E | Pie chart |
| Nonfamily Households | B11001_007E | Pie chart |
| Households with Children | B11005_002E | Percentage |
| Average Household Size | B25010_001E | Number (1 decimal) |

### Workforce Tab
| Data Point | Variable Code | Display |
|-----------|--------------|---------|
| Total Workers 16+ | B08301_001E | Denominator |
| Drove Alone | B08301_003E | Commute donut chart |
| Carpooled | B08301_004E | Commute donut chart |
| Public Transit | B08301_010E | Commute donut chart |
| Walked | B08301_019E | Commute donut chart |
| Bicycle | B08301_018E | Commute donut chart |
| Worked from Home | B08301_021E | Commute donut chart + highlighted callout |
| Mean Travel Time | B08135_001E | Minutes |
| Vehicles - None | B08201_002E | Bar chart |
| Vehicles - 1 | B08201_003E | Bar chart |
| Vehicles - 2 | B08201_004E | Bar chart |
| Vehicles - 3+ | B08201_005E + B08201_006E | Bar chart |
| Total HH (vehicles) | B08201_001E | Denominator |

Industry variables (C24050 series) — already partially implemented.

---

## 🔲 TO BE ADDED — HIGH PRIORITY

### Add to Overview Tab

| Data Point | Variable Code | Display | CRE Significance |
|-----------|--------------|---------|-------------------|
| Poverty Rate | B17001_002E (below poverty), B17001_001E (total) | Percentage, red if >20% | Areas >20% poverty may qualify for LIHTC, NMTC, and other incentive programs. Rising income + high poverty = gentrification signal. |
| Gini Index | B19083_001E | Number 0-1 (2 decimals) | Measures income inequality. High Gini (>0.45) in a wealthy tract = extreme income diversity. Affects product positioning — luxury vs workforce vs mixed-income. |
| Professional Degree % | B15003_024E, B15003_001E (total 25+, use sum of B15003_002E through B15003_025E) | Percentage | Lawyers, doctors, MBAs — correlates strongly with luxury product demand and high spending power. |

### Add to Housing Tab — Distribution Charts

**Rent Distribution (what renters actually pay):**

| Bracket | Variable Code |
|---------|--------------|
| Less than $100 | B25063_002E |
| $100-$149 | B25063_003E |
| $150-$199 | B25063_004E |
| $200-$249 | B25063_005E |
| $250-$299 | B25063_006E |
| $300-$349 | B25063_007E |
| $350-$399 | B25063_008E |
| $400-$449 | B25063_009E |
| $450-$499 | B25063_010E |
| $500-$549 | B25063_011E |
| $550-$599 | B25063_012E |
| $600-$649 | B25063_013E |
| $650-$699 | B25063_014E |
| $700-$749 | B25063_015E |
| $750-$799 | B25063_016E |
| $800-$899 | B25063_017E |
| $900-$999 | B25063_018E |
| $1,000-$1,249 | B25063_019E |
| $1,250-$1,499 | B25063_020E |
| $1,500-$1,999 | B25063_021E |
| $2,000-$2,499 | B25063_022E |
| $2,500-$2,999 | B25063_023E |
| $3,000-$3,499 | B25063_024E |
| $3,500+ | B25063_025E |
| No cash rent | B25063_026E |

Display as: Horizontal bar chart. Group into practical brackets: <$500, $500-$999, $1,000-$1,499, $1,500-$1,999, $2,000-$2,499, $2,500+. Highlight the bracket where most renters fall — this is the market-supported rent level. Add a note: "Target rent range for new development: [peak bracket]".

**Home Value Distribution:**

| Bracket | Variable Code |
|---------|--------------|
| Less than $10,000 | B25075_002E |
| $10,000-$14,999 | B25075_003E |
| $15,000-$19,999 | B25075_004E |
| $20,000-$24,999 | B25075_005E |
| $25,000-$29,999 | B25075_006E |
| $30,000-$34,999 | B25075_007E |
| $35,000-$39,999 | B25075_008E |
| $40,000-$49,999 | B25075_009E |
| $50,000-$59,999 | B25075_010E |
| $60,000-$69,999 | B25075_011E |
| $70,000-$79,999 | B25075_012E |
| $80,000-$89,999 | B25075_013E |
| $90,000-$99,999 | B25075_014E |
| $100,000-$124,999 | B25075_015E |
| $125,000-$149,999 | B25075_016E |
| $150,000-$174,999 | B25075_017E |
| $175,000-$199,999 | B25075_018E |
| $200,000-$249,999 | B25075_019E |
| $250,000-$299,999 | B25075_020E |
| $300,000-$399,999 | B25075_021E |
| $400,000-$499,999 | B25075_022E |
| $500,000-$749,999 | B25075_023E |
| $750,000-$999,999 | B25075_024E |
| $1,000,000-$1,499,999 | B25075_025E |
| $1,500,000-$1,999,999 | B25075_026E |
| $2,000,000+ | B25075_027E |

Display as: Horizontal bar chart. Group into practical brackets: <$100K, $100K-$200K, $200K-$300K, $300K-$500K, $500K-$750K, $750K-$1M, $1M+. Shows market depth at each price point.

**Housing Stock Age Distribution:**

| Bracket | Variable Code |
|---------|--------------|
| Built 2020 or later | B25034_002E |
| Built 2010-2019 | B25034_003E |
| Built 2000-2009 | B25034_004E |
| Built 1990-1999 | B25034_005E |
| Built 1980-1989 | B25034_006E |
| Built 1970-1979 | B25034_007E |
| Built 1960-1969 | B25034_008E |
| Built 1950-1959 | B25034_009E |
| Built 1940-1949 | B25034_010E |
| Built 1939 or earlier | B25034_011E |

Display as: Horizontal bar chart by decade. Color code: green for 2000+, yellow for 1980-1999, orange for 1960-1979, red for pre-1960. Add note: "X% of housing stock is 40+ years old — potential redevelopment opportunity" if pre-1980 stock exceeds 50%.

**Bedroom Distribution:**

| Bedrooms | Variable Code |
|----------|--------------|
| No bedroom (studio) | B25041_002E |
| 1 bedroom | B25041_003E |
| 2 bedrooms | B25041_004E |
| 3 bedrooms | B25041_005E |
| 4 bedrooms | B25041_006E |
| 5+ bedrooms | B25041_007E |
| Total | B25041_001E |

Display as: Horizontal bar chart. Highlight if any category is dramatically under-represented compared to demand indicators (e.g., lots of young singles but very few studios/1BRs = development opportunity).

### Add to Population Tab — Migration Detail

| Data Point | Variable Code | Notes |
|-----------|--------------|-------|
| Total population (mobility) | B07001_001E | Denominator |
| Same house (didn't move) | B07001_017E | |
| Moved within same county | B07001_033E | Local movers |
| Moved from different county, same state | B07001_065E | Regional in-migration |
| Moved from different state | B07001_081E | Long-distance in-migration |
| Moved from abroad | B07001_097E | International in-migration |

Display as: "X% of residents moved here in the last year" as a headline stat, with a breakdown bar showing where they came from. High in-migration = growing area. High from-different-state = major draw.

**NOTE on B07001 codes:** These codes may vary by ACS year. If they return errors, try using the B07003 series instead:
- B07003_004E (same house)
- B07003_007E (moved within same county)
- B07003_010E (moved from different county same state)
- B07003_013E (moved from different state)
- B07003_016E (moved from abroad)
- B07003_001E (total)

### Add to Income Tab

| Data Point | Variable Code | Display |
|-----------|--------------|---------|
| Gini Index | B19083_001E | Number with context note |

Add a small "Income Inequality" section at the bottom of the Income tab showing the Gini Index with context: <0.35 = relatively equal, 0.35-0.45 = moderate inequality, >0.45 = high inequality.

---

## 🔲 TO BE ADDED — FOR MAP COLOR OVERLAY

These variables need to be fetched in the batch county-wide call so every tract can be colored:

| Map Metric | Variables Needed | Calculation |
|-----------|-----------------|-------------|
| Poverty Rate | B17001_002E, B17001_001E | B17001_002E / B17001_001E × 100 |
| Gini Index | B19083_001E | Direct value × 100 for display |
| WFH % | B08301_021E, B08301_001E | B08301_021E / B08301_001E × 100 |
| Renter % | B25003_003E, B25003_001E | B25003_003E / B25003_001E × 100 |
| Cost-Burdened Renters % | B25070_007E+008E+009E+010E, B25070_001E | sum / B25070_001E × 100 |
| Professional Degree % | B15003_024E, B15003_001E | B15003_024E / total 25+ × 100 |
| Median Year Built | B25035_001E | Direct value |
| Migration Rate % | Use B07003 series (see above) | total moved / total × 100 |

These can be added to the existing batch fetch. The Census API allows up to 50 variables per call — count existing variables and split into two calls if needed.

---

## IMPLEMENTATION NOTES

1. **Variable count management:** Count all variables in each API call. If approaching 50, split into two calls for the same geography and merge results client-side.

2. **Null handling:** Census returns `-666666666` for suppressed data, `-888888888` for not applicable, `-999999999` for not computed. Filter ALL of these. Display "N/A" in the UI.

3. **Percentage calculations:** Always check the denominator is > 0 before dividing. Display as "N/A" if denominator is 0 or null.

4. **Caching:** All fetched data should be cached in React state (ProjectContext or component state). Don't re-fetch when switching tabs, changing color metrics, or navigating away and back.

5. **Error handling:** If a specific variable returns an error, don't fail the entire panel. Show the data that succeeded and mark failed metrics as "N/A".

6. **Chart library:** Use Recharts (already installed) for all bar charts, pie charts, and donut charts. Keep charts compact — they should fit within the card without excessive scrolling.

7. **Contextual notes:** Add small gray text below key metrics explaining CRE significance. Examples are provided in the "CRE Significance" column above. Keep notes brief — one sentence max.
