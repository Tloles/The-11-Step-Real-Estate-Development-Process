# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive **pre-development feasibility workbench** for commercial real estate, built on the 11-Step Development Process framework from Georgia Tech's "Financial Aspects of Commercial Real Estate" course (Prof. Barrington H. Branch). The tool combines free public API data, structured manual inputs, scenario simulation, and financial modeling to help developers quickly assess whether a project concept is worth pursuing.

**Full PRD:** See `.claude/PRD.md` for complete product requirements, architecture, and implementation phases.

## Architecture: Three Sections

### Section A: Research Engine (Steps 1–5)
Auto-pulls data from free public APIs (FRED, Census, BLS, FEMA, EPA, RentCast) and provides structured input fields with CoStar-compatible guidance for data the user sources manually. This is where the tool saves the most time.

### Section B: Development Proforma (Consolidated Steps 6–10)
A single connected screen for projecting all costs from closing through stabilization. Land costs, hard/soft costs, construction timeline, lease-up, and stabilization — all with scenario sliders that instantly show downstream financial impact.

### Section C: Exit & Returns (Step 11)
Exit cap rate modeling, waterfall structure, developer's fees, IRR, equity multiple, and final feasibility verdict.

### Financial Model (Continuous)
Always-visible panel with Developer's Targeted Spread, TCD, NOI, and key metrics. Updates in real-time from any input across any screen.

**Critical design principle:** Changes in any input must cascade through the financial model. A construction timeline change on the Proforma should immediately update carry costs, TCD, Developer's Spread, IRR, and exit value.

## Navigation Structure

```
[ 1. Inception ] [ 2. Submarket ] [ 3. Feasibility ] [ 4. Pre-Dev ] [ 5. Financing ] [ Proforma ] [ Exit ]
```

Steps 6–10 are consolidated into a single "Proforma" screen. They do NOT appear as separate navigation items.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Lint
```

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Excel Export:** SheetJS (xlsx)
- **Icons:** lucide-react
- **State Management:** React Context + Reducer (centralized project state)

## Data Sources — Free APIs First

**CRITICAL: The Anthropic API is NEVER called automatically.** It is only available via the optional AI Analysis Panel, which the user must explicitly trigger. All automated research uses free public APIs.

| API | Data | .env Key |
|-----|------|----------|
| FRED | Fed Rate, SOFR, CPI, Unemployment, Treasuries, Mortgage, Prime | `VITE_FRED_API_KEY` (required) |
| Census ACS | Demographics: income, housing, population, workforce (5-tab deep panel) | `VITE_CENSUS_API_KEY` (optional) |
| Census Geocoder + Nominatim | Location → FIPS codes (Nominatim fallback for city names) | None |
| BLS | Unemployment trends, employment data | `VITE_BLS_API_KEY` (optional) |
| FEMA | Flood zone designation | None |
| EPA Envirofacts | Toxic release sites, superfund proximity | None |
| Census Building Permits | Construction permit trends (supply pipeline proxy) | None |
| RentCast | Market rents, listings, price trends (50 free calls/month) | `VITE_RENTCAST_API_KEY` (optional) |
| OZ Lookup | Census tract cross-reference against Opportunity Zone list | None (static data) |
| Anthropic | Optional AI analysis — user-triggered only, clearly labeled "Uses API Credits" | `VITE_ANTHROPIC_API_KEY` (optional) |

All external API calls route through the Vite dev server proxy (configured in `vite.config.js`) to avoid CORS issues.

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, StepNavigator, FinancialModelPanel
│   ├── research/        # Data panels (MacroDashboard, DemographicsPanel, EmploymentPanel,
│   │                    #   EnvironmentalPanel, SupplyPipelinePanel, MarketDataPanel,
│   │                    #   RateBenchmarksPanel, IncentivesPanel)
│   ├── proforma/        # Development Proforma components (consolidated Steps 6-10)
│   ├── financial/       # SpreadCalculator, CapitalStackBuilder, WaterfallBuilder, IRRCalculator
│   ├── steps/           # Step page containers (Step1-5, Proforma, Step11Exit)
│   └── shared/          # AIAnalysisPanel, ResearchCard, ManualInputCard, TrafficLight, ExcelExport
├── state/               # ProjectContext, projectReducer, initialState
├── data/                # sectors.js, drivers.js, scenarioDefaults.js, macroIndicators.js, opportunityZones.js
├── hooks/               # useProjectState, useScenarioCalc, useFinancialModel, useExcelExport
└── utils/               # publicApis.js, calculations.js, formatters.js, api.js
```

## Key Financial Formulas

| Formula | Calculation |
|---------|-------------|
| Developer's Yield on TCD | NOI at Stabilization ÷ Total Cost of Development |
| Developer's Targeted Spread | Developer's Yield − Exit Cap Rate (in basis points) |
| Implied Sales Price | NOI at Stabilization ÷ Exit Cap Rate |
| Gross Profit/Loss | Sales Price − TCD |
| Monthly Carry Cost | Outstanding Loan Balance × (Annual Rate ÷ 12) |
| Time to Stabilization | (Stabilization % − Opening Occupancy %) ÷ Monthly Absorption Rate |
| NOI | EGI − Operating Expenses − Management Fee |
| EGI | Gross Potential Revenue − Vacancy & Credit Loss |
| Equity Multiple | Total Distributions ÷ Total Equity Invested |
| Cost Burden % | Households Paying 30%+ on Housing ÷ Total Households |

**Validation benchmarks (from course slide 38):**
- $100M TCD, $8M NOI, 6.5% exit cap → +150 BP spread, $123M sales price, $23M profit ✓
- $110M TCD, $6M NOI, 7.0% exit cap → −155 BP spread, $86M sales price, $24M loss ✓
- $95M TCD, $8M NOI, 5.5% exit cap → +292 BP spread, $145.5M sales price, $50.5M profit ✓

## Implementation Phases

- **Phase 1 ✅** — Foundation: Vite/React scaffold, macro dashboard, sector selection, spread calculator
- **Phase 2 (current)** — Research engine: FRED, Census deep demographics (5-tab), BLS, FEMA, EPA, RentCast, OZ lookup, manual input cards
- **Phase 3** — Feasibility + Pre-Dev + Financing: market study inputs, capital stack builder, rate benchmarks
- **Phase 4** — Development Proforma: consolidated Steps 6-10, TCD buildup, scenario sliders, NOI calculator
- **Phase 5** — Exit & Returns: waterfall, developer fees, IRR, equity multiple, return metrics dashboard
- **Phase 6** — Export & polish: Excel export, critical path timeline, error handling, documentation

## Design Guidelines

- **Light theme** — Background: `#F8F9FA`, Surface/Cards: `#FFFFFF`, Borders: `#E2E8F0`
- **Primary accent:** Deep navy `#1E3A5F`
- **Secondary accent:** Gold `#D4A843` (keep from original)
- **Data accent:** Blue `#2563EB`
- **Traffic lights:** Green `#059669`, Orange `#D97706`, Red `#DC2626`
- **Typography:** Instrument Sans (body), JetBrains Mono (data/numbers)
- **Text:** Primary `#1E293B`, Secondary `#475569`, Muted `#94A3B8`
- **Cards:** White with subtle borders and light shadows (`box-shadow: 0 1px 3px rgba(0,0,0,0.08)`)
- **Tabs:** Gold accent underline on active tab
- **Contextual notes:** Small gray text below metrics explaining development implications

## Important Rules

1. **PRD is source of truth** — `.claude/PRD.md` defines what to build
2. **No automatic Anthropic API calls** — AI analysis is optional and user-triggered only
3. **Free APIs for all research** — FRED, Census, BLS, FEMA, EPA, RentCast
4. **Manual inputs with guidance** — For data without free APIs, provide structured input fields with tooltips pointing to CoStar, brokerage reports, etc.
5. **Everything cascades** — Input changes flow through: scenario → time → cost → TCD → NOI → spread → IRR → exit value
6. **Cache API results** — Store in ProjectContext state; don't re-fetch on navigation
7. **Steps 6-10 are ONE screen** — The Development Proforma is a single consolidated page, not 5 separate steps
8. **Dual geography** — Census demographics show tract-level AND city-level side by side
9. **Lazy load tabs** — Only fetch data when user clicks a tab
10. **RentCast is precious** — 50 calls/month; cache aggressively; show usage counter
