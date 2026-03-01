# The 11-Step Real Estate Development Process — Product Requirements Document

## 1. Executive Summary

The 11-Step Real Estate Development Process is an interactive web application that serves as a **research engine and scenario simulator** for commercial real estate development. It guides users through the complete lifecycle of a development project — from Inception of an Idea through Stabilization and Sale/Refinancing — combining live data retrieval, financial modeling, and interactive scenario analysis into a single, connected workflow.

Based on the framework taught in Georgia Tech's "Financial Aspects of Commercial Real Estate" course by Professor Barrington H. Branch, the tool is built on a core insight: **the 11 steps are not equal in nature**. Some steps are about *finding information* (and the tool saves developers days of research). Other steps are about *gaming out scenarios* (and the tool lets developers stress-test assumptions and see downstream financial impact in real-time). Underlying everything is a continuous financial model that recalculates as inputs change across any step.

The tool is organized into three integrated layers:

1. **Research Engine (Steps 1, 2, 3, 5, 11)** — AI-powered data gathering that surfaces macro indicators, demographics, comps, zoning data, financing terms, public incentives, and exit transaction data for a given sector and location.

2. **Scenario Simulator (Steps 4, 6, 7, 8, 9, 10)** — Interactive spectrum sliders where the developer games out possible timelines, costs, lease-up rates, and construction scenarios. Every adjustment instantly flows downstream to show the impact on carry costs, Developer's Spread, IRR, and exit value.

3. **Financial Model (Continuous)** — The Developer's Targeted Spread Calculator, Capital Stack Builder, and Waterfall Structure are always-visible, always-updating components that react to every research finding and scenario adjustment across all 11 steps.

**MVP Goal:** Deliver a functional feasibility workbench where a user can define a project (sector + location), have the tool auto-research critical data for research-heavy steps, game out scenarios for execution-heavy steps, and see all assumptions flow through to a unified financial model with Excel export capability.

---

## 2. Mission

**Mission Statement:** Compress weeks of pre-development research and scenario planning into hours by providing a data-driven, AI-powered workbench that connects market intelligence, execution scenarios, and financial modeling into a single, continuously updating system.

### Core Principles

1. **Research, Don't Checklist** — Every step should surface real data, not just remind the user to go find it. The tool does the digging.
2. **Time Is the Variable That Kills** — Schedule variance is the silent destroyer of development economics. The scenario simulator makes time-cost relationships visceral and visible.
3. **Everything Flows Downstream** — An assumption in Step 1 should ripple through to Step 11. A delay modeled in Step 7 should immediately update the exit spread. The financial model is the connective tissue.
4. **Forward-Looking** — As Prof. Branch emphasizes, developers must project 3–5 years ahead. Every assumption is about projected conditions at the point in time when that step occurs, not today's market.
5. **Game It Out Before You Commit** — The scenario simulator exists so developers can stress-test before they spend real money. "What if?" is the most valuable question in development.
6. **Constant Reassessment** — Budgets, proformas, and assumptions must be continuously updated. The tool makes iteration instant.

---

## 3. Target Users

### Primary Persona: Graduate Real Estate Student

- **Who:** Students in commercial real estate development courses (e.g., Georgia Tech Scheller College)
- **Technical Comfort:** Comfortable with web applications; familiar with Excel-based proformas
- **Goals:**
  - Walk through the 11-step process for a hypothetical or real project
  - Understand how macro conditions and execution scenarios impact feasibility
  - Build defensible budgets and proformas with real data backing every assumption
  - Present findings to professors and classmates
- **Pain Points:**
  - The development process is overwhelming in its complexity and length
  - Gathering market data, zoning info, comps, and financing terms is extremely time-consuming
  - Hard to visualize how a 3-month construction delay or 100 BP rate increase cascades through the entire project
  - Manual Excel modeling doesn't dynamically connect inputs across steps

### Secondary Persona: Early-Career Developer / Analyst

- **Who:** Junior developers or analysts at CRE firms performing pre-development feasibility work
- **Goals:**
  - Rapidly assess whether a project concept is worth pursuing with real data
  - Model how different execution scenarios affect returns before committing capital
  - Generate data-backed reports for internal investment committee review
- **Pain Points:**
  - Feasibility research is scattered across dozens of sources (FRED, Census, CoStar, municipal sites, brokerage reports)
  - No single tool connects market research → scenario planning → financial modeling
  - Difficult to quickly show stakeholders how changing one assumption ripples through the deal

---

## 4. MVP Scope

### In Scope

#### Layer 1: Research Engine (Steps 1, 2, 3, 5, 11)

**Step 1 — Inception of an Idea (Macro & Sector Research)**
- ✅ Macro Environment Dashboard (Fed Rate, SOFR, Inflation, Unemployment, 5yr/10yr Treasury)
- ✅ Live data fetching via AI web search
- ✅ Sector selection across 8 CRE sectors with subtypes
- ✅ AI-researched sector trend summaries (e.g., "Office sector vacancy trends post-COVID")
- ✅ Drivers of Change identification and relevance tagging
- ✅ National/regional economic outlook research
- ✅ Project concept definition (name, location, description, scale)

**Step 2 — Refinement of the Idea (Site & Submarket Research)**
- ✅ Demographic research for target submarket (population growth, median income, employment base, age distribution)
- ✅ Zoning and land use research for target jurisdiction
- ✅ Environmental and infrastructure baseline research
- ✅ Comparable properties research (recent transactions, asking rents, vacancy rates, absorption)
- ✅ Submarket supply pipeline (planned/under construction projects)
- ✅ Neighborhood and community context research
- ✅ Preliminary site physical feasibility assessment framework

**Step 3 — Feasibility (Market & Financial Research)**
- ✅ Market study data: supply/demand trends, absorption rates, rental rate trajectories
- ✅ Construction cost research (per SF by product type and market)
- ✅ Cap rate survey data by sector and market
- ✅ Developer's Targeted Spread Calculator with sensitivity analysis
- ✅ Three-scenario modeling (matching slide 38 examples)
- ✅ Spread health indicators (Strong ≥200 BP, Target ≥150 BP, Thin, Negative)

**Step 5 — Financing Research (Capital Markets Intelligence)**
- ✅ Current senior debt terms by product type (spread over SOFR, LTV, DSCR requirements)
- ✅ Mezzanine/preferred equity pricing research
- ✅ Current equity return expectations by risk profile
- ✅ Public incentive and P3 program research by jurisdiction (tax credits, TIF, abatements, opportunity zones, NMTC, LIHTC)
- ✅ Capital Stack Builder with stage-by-stage modeling
- ✅ Recent comparable financing structures research

**Step 11 — Exit Research (Transaction & Valuation Intelligence)**
- ✅ Recent transaction comps for sector/submarket (sales price, cap rate, price per unit/SF)
- ✅ Current investor cap rate expectations by sector and market
- ✅ Exit strategy modeler (100% sale, refinance + retain, partial sale)
- ✅ Waterfall Structure Builder with customizable tiers
- ✅ Developer's Fees calculator
- ✅ Investor vs. Developer returns analysis
- ✅ Permanent financing terms research (long-term debt pricing)

#### Layer 2: Scenario Simulator (Steps 4, 6, 7, 8, 9, 10)

Each of these steps features **interactive spectrum sliders** that let the developer adjust key assumptions along a realistic range. Every adjustment instantly recalculates downstream financials — carry costs, total cost of development, Developer's Spread, IRR, and exit value.

**Step 4 — Contract Negotiation (Pre-Development Scenarios)**
- ✅ Pre-leasing velocity scenarios (% pre-leased at closing: 0% → 25% → 50%+)
- ✅ Entitlement and permitting timeline scenarios (6 months → 12 months → 18+ months)
- ✅ Design and engineering cost scenarios
- ✅ Impact display: How pre-leasing levels affect financing terms and investor confidence
- ✅ Impact display: How permitting delays add carry costs and push the entire timeline

**Step 6 — Formal Closing (Closing & Transition Scenarios)**
- ✅ Closing timeline scenarios (time from commitment to actual closing)
- ✅ Land acquisition cost scenarios
- ✅ Closing cost and legal fee estimates
- ✅ Financing terms sensitivity at closing (rate lock timing, spread movement)
- ✅ Impact display: How closing delays compound with construction interest

**Step 7 — Construction Phase (Build Scenarios)**
- ✅ Construction duration spectrum (e.g., 18 months → 24 months → 30 months → 36 months)
- ✅ Hard cost escalation scenarios (0% → 3% → 5% → 8% annual escalation)
- ✅ Change order budget scenarios (0% → 3% → 5% → 10% of hard costs)
- ✅ Interest rate movement during construction (rates at draw schedule milestones)
- ✅ Horizontal vs. vertical phasing toggle (adds a construction stage if needed)
- ✅ Impact display: Each month of delay = $X in additional carry costs, Y BP compression on spread

**Step 8 — Completion & Opening (Delivery Scenarios)**
- ✅ Punch list and CO timeline scenarios (on-time → 1 month delay → 3 month delay)
- ✅ Free rent period scenarios (0 months → 3 months → 6 months)
- ✅ Initial occupancy at opening scenarios (30% → 50% → 70%)
- ✅ Impact display: How free rent periods delay first income and extend the path to stabilization

**Step 9 — Management & Lease-Up (Operations Scenarios)**
- ✅ Monthly absorption rate spectrum (1% → 3% → 5% → 8% per month)
- ✅ Effective rent scenarios (asking rent × concessions/loss factor)
- ✅ Operating expense ratio scenarios
- ✅ Tenant improvement and leasing commission cost scenarios
- ✅ Management fee scenarios
- ✅ Impact display: Absorption rate directly determines months to stabilization, which determines how long you carry development-rate financing

**Step 10 — Stabilization (Target Achievement Scenarios)**
- ✅ Stabilization occupancy threshold spectrum (88% → 93% → 95%)
- ✅ Time-to-stabilization calculator (driven by Step 8 opening occupancy + Step 9 absorption rate)
- ✅ NOI at stabilization projections (occupancy × effective rent − operating expenses)
- ✅ Refinancing timing scenarios (refi immediately at stabilization vs. waiting for rate improvement)
- ✅ Impact display: The complete picture — every upstream assumption converges here to determine final NOI, which drives the Developer's Spread and exit value in Step 11

#### Layer 3: Financial Model (Continuous)

The financial model is the **connective tissue** across all 11 steps. It is always visible (collapsible sidebar or persistent bottom panel) and updates in real-time as any input across any step changes.

**Core Components:**
- ✅ Developer's Targeted Spread (NOI at Stabilization / TCD → Yield, vs. Exit Cap → Spread)
- ✅ Total Cost of Development (TCD) buildup — land + hard costs + soft costs + financing costs + carry costs, all driven by scenario inputs
- ✅ Capital Stack summary across all financing stages
- ✅ Waterfall distribution projections
- ✅ Project timeline summary (total months from inception to exit)
- ✅ Key metrics dashboard: Leveraged/Unleveraged IRR, Multiple on Invested Capital, Developer's Spread, Profit/Loss
- ✅ Traffic light indicators: Green (metrics exceed targets), Yellow (tight but viable), Red (below threshold)

**Cross-Cutting Features:**
- ✅ AI-powered analysis available at every step (contextual to that step's data)
- ✅ Critical Path Schedule / Gantt-style timeline that updates as scenarios change
- ✅ Excel export of all research findings, scenario assumptions, and financial models
- ✅ Persistent state — changes in any step immediately reflected everywhere

### Out of Scope (Post-MVP)

- ❌ Real-time data feeds from CoStar, CBRE, or other paid CRE data providers
- ❌ GIS/mapping integration for site analysis
- ❌ Automated zoning lookup by parcel
- ❌ Multi-project portfolio comparison
- ❌ User authentication / multi-user collaboration
- ❌ Cloud persistence / database backend
- ❌ Mobile-native application
- ❌ Integration with Argus or other industry proforma tools
- ❌ Detailed draw schedule modeling
- ❌ Lease-by-lease rent roll modeling
- ❌ Tax modeling (depreciation, 1031 exchanges, etc.)

---

## 5. User Stories

### Research Engine Stories

1. **As a user, I want to see current macroeconomic indicators and sector trends when I define my project concept, so that I understand the environment before I commit to an idea.**
   - Example: Select "Multifamily — Build-to-Rent" in "Atlanta — Suburban" and immediately see Fed Rate, SOFR, inflation, plus AI-researched BTR sector trends and Atlanta submarket conditions.

2. **As a user, I want the tool to research demographics, comps, and zoning for my target location, so that I don't spend days hunting through Census data, brokerage reports, and municipal websites.**
   - Example: Enter "Brookhaven, GA" and the tool researches and displays population growth (12% over 5 years), median household income ($95K), recent multifamily transactions (5 comps with cap rates), and current zoning categories.

3. **As a user, I want to see current financing terms and available public incentive programs for my project type and jurisdiction, so that I can build a realistic capital stack.**
   - Example: For a multifamily project in DeKalb County, GA, the tool surfaces: senior construction debt at SOFR + 275-350 BP, 55-60% LTV; TAD/TIF availability in certain districts; Opportunity Zone eligibility; Georgia LIHTC program details.

4. **As a user, I want recent transaction comps for my sector and submarket to validate my exit assumptions, so that my projected exit cap rate is defensible.**
   - Example: Tool shows 8 recent multifamily sales in metro Atlanta with cap rates ranging from 4.8% to 5.9%, average price per unit of $285K, helping calibrate exit assumptions.

### Scenario Simulator Stories

5. **As a user, I want to adjust construction timeline on a slider and instantly see how delays impact my total development cost and exit spread, so that I can quantify the cost of schedule risk.**
   - Example: Slide from 24 months to 30 months of construction → tool shows $2.4M in additional interest carry, TCD increases from $98M to $100.4M, Developer's Spread compresses from 185 BP to 152 BP.

6. **As a user, I want to model different lease-up absorption rates and see how they affect time-to-stabilization and my ability to refinance, so that I can plan for realistic scenarios.**
   - Example: At 3% monthly absorption starting from 40% occupancy at opening, stabilization (93%) takes 18 months. At 5% absorption, it takes 11 months. The 7-month difference = $X in carry costs.

7. **As a user, I want to game out "what if interest rates rise 100 BP during my construction period" and see the cascading impact, so that I can stress-test my deal against rate risk.**
   - Example: Construction loan at SOFR + 300 BP with SOFR rising from 3.66% to 4.66% during the build → additional $1.8M in interest costs → spread compresses 25 BP.

8. **As a user, I want to see how hitting vs. missing my pre-leasing target at closing affects my financing terms and overall returns, so that I understand the leverage of early marketing.**
   - Example: 40% pre-leased at closing → senior lender offers 60% LTV. 20% pre-leased → lender drops to 52% LTV, requiring $8M more equity, which dilutes developer returns.

### Financial Model Stories

9. **As a user, I want to see a persistent financial summary that updates as I make changes in any step, so that I always know where my deal stands.**
   - Example: Adjusting hard cost escalation in Step 7 immediately updates TCD, which recalculates the Developer's Spread in the persistent panel, turning the indicator from green to yellow.

10. **As a user, I want to export my complete analysis — research findings, scenario assumptions, and financial model — to Excel, so that I can present to my class / investment committee.**
    - Example: One-click export produces a multi-tab workbook: Macro Summary, Submarket Research, Feasibility Analysis, Capital Stack, Scenario Assumptions, Waterfall, Timeline, Executive Summary.

---

## 6. Core Architecture & Patterns

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   React + Vite Frontend                       │
│                  (Single Page Application)                    │
├──────────┬──────────────┬──────────────┬─────────────────────┤
│  Step    │  Research     │  Scenario    │  Financial Model    │
│  Nav     │  Panels       │  Sliders     │  (Persistent)       │
│  (1-11)  │  (1,2,3,5,11)│  (4,6-10)    │  Spread/Stack/WF    │
└────┬─────┴──────┬───────┴──────┬───────┴──────────┬──────────┘
     │            │              │                   │
     │            ▼              │                   │
     │   ┌─────────────────┐    │                   │
     │   │  Anthropic API   │    │                   │
     │   │  + Web Search    │    │                   │
     │   │  (Research Agent)│    │                   │
     │   └─────────────────┘    │                   │
     │                          │                   │
     └──────────────────────────┴───────────────────┘
              Centralized Project State
         (All inputs, research, scenarios, calcs)
```

### Directory Structure

```
The-11-Step-Real-Estate-Development-Process/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── StepNavigator.jsx
│   │   │   ├── FinancialModelPanel.jsx    # Persistent sidebar/panel
│   │   │   └── Footer.jsx
│   │   ├── research/                      # Research Engine components
│   │   │   ├── MacroDashboard.jsx
│   │   │   ├── SectorResearch.jsx
│   │   │   ├── SubmarketResearch.jsx
│   │   │   ├── DemographicsPanel.jsx
│   │   │   ├── ComparablesPanel.jsx
│   │   │   ├── ZoningResearch.jsx
│   │   │   ├── FinancingResearch.jsx
│   │   │   ├── IncentivesResearch.jsx
│   │   │   ├── ExitCompsResearch.jsx
│   │   │   └── AIResearchAgent.jsx
│   │   ├── scenarios/                     # Scenario Simulator components
│   │   │   ├── ScenarioSlider.jsx         # Reusable spectrum slider
│   │   │   ├── ImpactDisplay.jsx          # Shows downstream financial impact
│   │   │   ├── PreLeasingScenario.jsx
│   │   │   ├── EntitlementScenario.jsx
│   │   │   ├── ConstructionScenario.jsx
│   │   │   ├── LeaseUpScenario.jsx
│   │   │   ├── StabilizationScenario.jsx
│   │   │   └── TimelineImpact.jsx
│   │   ├── financial/                     # Financial Model components
│   │   │   ├── SpreadCalculator.jsx
│   │   │   ├── TotalCostBuilder.jsx
│   │   │   ├── CapitalStackBuilder.jsx
│   │   │   ├── WaterfallBuilder.jsx
│   │   │   ├── DeveloperFees.jsx
│   │   │   ├── IRRCalculator.jsx
│   │   │   ├── MetricsDashboard.jsx
│   │   │   └── SensitivityAnalysis.jsx
│   │   ├── steps/                         # Step-level page containers
│   │   │   ├── Step1Inception.jsx
│   │   │   ├── Step2Refinement.jsx
│   │   │   ├── Step3Feasibility.jsx
│   │   │   ├── Step4Contracts.jsx
│   │   │   ├── Step5Financing.jsx
│   │   │   ├── Step6Closing.jsx
│   │   │   ├── Step7Construction.jsx
│   │   │   ├── Step8Completion.jsx
│   │   │   ├── Step9Management.jsx
│   │   │   ├── Step10Stabilization.jsx
│   │   │   └── Step11Exit.jsx
│   │   ├── timeline/
│   │   │   ├── CriticalPathTimeline.jsx
│   │   │   └── FinancingStageOverlay.jsx
│   │   └── shared/
│   │       ├── AIAnalysisPanel.jsx
│   │       ├── ResearchCard.jsx
│   │       ├── ExcelExport.jsx
│   │       └── TrafficLight.jsx
│   ├── state/
│   │   ├── ProjectContext.jsx             # Central state provider
│   │   ├── projectReducer.js             # State management logic
│   │   └── initialState.js               # Default project template
│   ├── data/
│   │   ├── sectors.js
│   │   ├── drivers.js
│   │   ├── scenarioDefaults.js           # Default ranges for all sliders
│   │   └── macroIndicators.js
│   ├── hooks/
│   │   ├── useProjectState.js
│   │   ├── useResearch.js                # AI research dispatch
│   │   ├── useScenarioCalc.js            # Downstream impact calculations
│   │   ├── useFinancialModel.js          # Core financial computations
│   │   └── useExcelExport.js
│   ├── utils/
│   │   ├── calculations.js              # All financial formulas
│   │   ├── formatters.js
│   │   ├── researchPrompts.js           # AI prompt templates per step
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .env
├── .claude/
│   └── PRD.md
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

### Key Design Patterns

- **Three-Layer Architecture** — Research Engine, Scenario Simulator, and Financial Model are distinct layers that communicate through centralized state
- **Centralized Project State** — Single source of truth via React Context + Reducer; any change in any step triggers recalculation in the financial model
- **Cascading Calculations** — Scenario slider adjustments flow through a calculation pipeline: scenario input → time impact → cost impact → TCD update → spread update → IRR update → exit value update
- **Research Agent Pattern** — AI research calls use step-specific prompt templates that incorporate the user's sector, location, and project details for targeted, relevant results
- **Spectrum Sliders** — Reusable component pattern where every slider has: a range (min/max/step), a "base case" marker, a "current" position, and an instant downstream impact readout
- **Traffic Light Indicators** — Green/Yellow/Red status on key metrics throughout, so the user always knows if their deal is healthy, tight, or broken
- **Export-First Design** — All data structures designed for clean Excel serialization from the start

---

## 7. Features

### 7.1 Research Engine Features

#### 7.1.1 Macro Environment Dashboard (Step 1)

**Purpose:** Surface the current economic conditions that form the backdrop for all development decisions.

**Data Points (auto-researched via AI + web search):**

| Indicator | Source | Relevance |
|-----------|--------|-----------|
| Fed Funds Rate | Federal Reserve | Base rate driving all borrowing costs |
| SOFR | Dept. of Treasury | Construction loan pricing benchmark |
| CPI Inflation | Bureau of Labor Statistics | Cost escalation projections |
| Unemployment | Bureau of Labor Statistics | Demand indicator, labor cost driver |
| 5-Year Treasury | Dept. of Treasury | Medium-term rate environment |
| 10-Year Treasury | Dept. of Treasury | Permanent financing benchmark |

**Key Features:**
- One-click "Fetch Live Data" with timestamp
- Historical context from course (e.g., "Q1 2020: 0.25% → Q3 2023: 5.50% → Today: 3.75%")
- Trend direction indicators
- Course reference values as fallback when API unavailable

#### 7.1.2 Submarket Research (Step 2)

**Purpose:** Build a data profile of the target location so the developer doesn't spend days on Census.gov, municipal websites, and brokerage reports.

**Research Modules (each triggered by AI web search):**

| Module | Data Points Surfaced |
|--------|---------------------|
| Demographics | Population, growth rate, median HH income, age distribution, education levels |
| Employment | Major employers, job growth rate, unemployment, industry mix |
| Zoning & Land Use | Zoning categories, density allowances, height limits, parking requirements, overlay districts |
| Environmental | Flood zones, brownfield registries, wetlands, environmental justice areas |
| Infrastructure | Transit access, highway proximity, utility capacity, planned public improvements |
| Competition | Existing inventory, under construction, planned pipeline, vacancy rates |
| Comparables | Recent transactions (sale price, cap rate, price/unit or price/SF), asking rents, concessions |

**Key Features:**
- Each module has a "Research" button that dispatches a targeted AI query
- Results display in structured cards with source attribution
- User can add notes and override/supplement AI findings
- All research findings feed into the financial model as default assumptions

#### 7.1.3 Financing Intelligence (Step 5)

**Purpose:** Surface current capital markets terms so the developer can build a realistic capital stack.

**Research Modules:**

| Module | Data Points Surfaced |
|--------|---------------------|
| Senior Debt | Current spreads over SOFR by product type, LTV limits, DSCR requirements, typical terms |
| Mezzanine / Pref Equity | Current pricing (rates, preferred returns), typical structures |
| Equity Expectations | Current return expectations by risk profile (JV, LP, institutional) |
| Public Incentives | Available programs by jurisdiction: TIF/TAD, tax abatements, Opportunity Zones, NMTC, LIHTC, state-specific programs |
| Comparable Deals | Recent financing structures for similar projects in the market |

#### 7.1.4 Exit Intelligence (Step 11)

**Purpose:** Validate exit assumptions with real transaction data.

**Research Modules:**

| Module | Data Points Surfaced |
|--------|---------------------|
| Transaction Comps | Recent sales in sector/submarket: sale price, cap rate, price/unit or price/SF, buyer type |
| Cap Rate Survey | Current investor cap rate expectations by sector, market tier, and asset quality |
| Permanent Debt | Long-term financing terms: rates, LTV, amortization, typical lenders |
| Disposition Market | Current buyer appetite, average time on market, bid-ask spreads |

---

### 7.2 Scenario Simulator Features

Each scenario simulator step uses a common pattern:

```
┌────────────────────────────────────────────────────────┐
│  SCENARIO: Construction Duration                        │
│                                                        │
│  ◄────────────●─────────────────────────►              │
│  18 mo      24 mo (base)              36 mo            │
│             Current: 28 months                         │
│                                                        │
│  ┌─── DOWNSTREAM IMPACT ───────────────────────────┐   │
│  │  Additional carry cost:        +$1.6M           │   │
│  │  TCD impact:                   $98M → $99.6M    │   │
│  │  Developer's Yield:            8.16% → 8.03%    │   │
│  │  Developer's Spread:           185 BP → 172 BP  │   │
│  │  Time to exit:                 +4 months         │   │
│  │  IRR impact:                   18.2% → 16.8%    │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

#### 7.2.1 Step 4 — Contract Negotiation Scenarios

| Slider | Range | Downstream Impact |
|--------|-------|-------------------|
| Pre-leasing at closing | 0% → 60% | Financing terms (LTV, rate), investor confidence, lease-up timeline |
| Entitlement/permitting timeline | 3 → 24 months | Pre-development carry costs, total timeline |
| Design & engineering costs | Low → High | Soft cost budget, TCD |
| GC selection timing | Early → Late | Hard cost certainty, potential savings |

#### 7.2.2 Step 6 — Closing Scenarios

| Slider | Range | Downstream Impact |
|--------|-------|-------------------|
| Closing timeline | 1 → 6 months from commitment | Additional pre-development carry |
| Land acquisition cost | Varies | TCD, equity required |
| Rate environment at closing | -50 BP → +100 BP vs. today | Construction loan pricing, total interest cost |
| Closing costs | 1% → 3% of deal size | TCD, equity at closing |

#### 7.2.3 Step 7 — Construction Scenarios

| Slider | Range | Downstream Impact |
|--------|-------|-------------------|
| Construction duration | 12 → 42 months | Carry costs (biggest single driver), total timeline |
| Hard cost escalation | 0% → 10% annual | Hard cost budget, TCD, contingency adequacy |
| Change orders | 0% → 15% of hard costs | Budget overrun, TCD |
| Construction interest rate | Base → +200 BP | Interest reserve, carry costs |
| Horizontal + vertical phasing | Single phase / Two phases | Additional financing stage, timeline |

#### 7.2.4 Step 8 — Completion & Opening Scenarios

| Slider | Range | Downstream Impact |
|--------|-------|-------------------|
| CO delay | On time → 6 months | Extended construction carry, delayed income |
| Free rent periods | 0 → 9 months | Delayed effective income, NOI ramp |
| Opening occupancy | 20% → 70% | Starting point for lease-up, initial cash flow |
| TI/LC costs at opening | Low → High | Additional capital required |

#### 7.2.5 Step 9 — Management & Lease-Up Scenarios

| Slider | Range | Downstream Impact |
|--------|-------|-------------------|
| Monthly absorption rate | 1% → 10% | Time to stabilization (single most important variable) |
| Effective rent vs. asking | 85% → 100% | NOI at stabilization, Developer's Yield |
| Operating expense ratio | 25% → 50% | NOI at stabilization |
| Tenant retention rate | 50% → 90% | Ongoing TI/LC costs, re-leasing costs |
| Management fee | 2% → 5% of EGI | Operating expense, NOI |

#### 7.2.6 Step 10 — Stabilization Scenarios

| Slider | Range | Downstream Impact |
|--------|-------|-------------------|
| Stabilization threshold | 85% → 97% occupancy | When you can refi/exit, total development financing period |
| Time to stabilization | Auto-calculated from Steps 8+9 | Total carry cost, TCD, IRR |
| NOI at stabilization | Auto-calculated from rents, occupancy, expenses | Developer's Yield, Spread, Exit Value |
| Refi timing | At stabilization → 6 months after | Rate environment, permanent debt terms |
| Exit cap rate | Range from research | Sales price, profit, Spread |

---

### 7.3 Financial Model Features (Continuous)

#### 7.3.1 Total Cost of Development (TCD) Buildup

The TCD updates dynamically as scenario inputs change:

| Category | Components | Driven By |
|----------|-----------|-----------|
| Land / Acquisition | Purchase price, closing costs | Step 6 sliders |
| Hard Costs | Construction, site work, FF&E | Step 7 sliders (escalation, change orders) |
| Soft Costs | Architecture, engineering, legal, permits | Step 4 sliders |
| Financing Costs | Loan fees, interest reserve | Step 5 research + Step 7 duration |
| Carry Costs | Interest during construction + lease-up | Step 7 duration + Step 9 absorption |
| Developer Fees | Per fee calculator | Step 11 |
| Contingency | % of hard + soft costs | User input |

#### 7.3.2 Developer's Targeted Spread

Always visible. Always updating. The heartbeat of the financial model.

- **Developer's Yield on TCD** = NOI at Stabilization / Total Cost of Development
- **Exit Cap Rate** = From research (Step 11) or user input
- **Developer's Spread** = Yield − Exit Cap (in basis points)
- **Target:** ≥150 BP (normal) or ≥200 BP (turbulent)

#### 7.3.3 Key Metrics Dashboard

| Metric | Calculation | Health Threshold |
|--------|-------------|-----------------|
| Developer's Spread | Yield on TCD − Exit Cap | ≥150 BP (green), 100-149 (yellow), <100 (red) |
| Leveraged IRR | Full cash flow projection including debt service | ≥18% (green), 14-17% (yellow), <14% (red) |
| Unleveraged IRR | Cash flows without debt | ≥12% (green), 9-11% (yellow), <9% (red) |
| Equity Multiple | Total distributions / Total equity invested | ≥2.0x (green), 1.5-1.9x (yellow), <1.5x (red) |
| Debt/Equity Ratio | Senior debt / Total equity | Context-dependent |
| Total Timeline | Inception → Exit | Benchmark against 5-year target |

---

## 8. Technology Stack

### Frontend

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | React | ^18.x |
| Build Tool | Vite | ^5.x |
| Styling | Tailwind CSS | ^3.x |
| Charts | Recharts | ^2.x |
| Excel Export | SheetJS (xlsx) | latest |
| Icons | lucide-react | ^0.300.0 |
| Date Utilities | date-fns | ^3.x |

### APIs & Services

| Service | Purpose |
|---------|---------|
| Anthropic Claude API | AI research agent + feasibility analysis |
| Anthropic Web Search Tool | Live data retrieval for all research modules |

### Development Tools

| Tool | Purpose |
|------|---------|
| Claude Code | Primary development environment |
| npm | Package management |
| ESLint | JavaScript linting |
| Git / GitHub | Version control |

---

## 9. Security & Configuration

### Security Scope

**In Scope:**
- ✅ API key stored in .env file (never committed to repo)
- ✅ .gitignore excludes .env and sensitive files
- ✅ VITE_ prefix for frontend environment variable exposure

**Out of Scope:**
- ❌ Authentication/authorization (single user tool)
- ❌ Backend server (frontend-only application)
- ❌ Data encryption (local-only, no persistence between sessions)
- ❌ Rate limiting (managed by Anthropic API)

### Configuration

**Environment Variables (.env):**
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

### Running Locally

```bash
npm install
npm run dev
```

---

## 10. Implementation Phases

### Phase 1: Foundation & Research Engine Core ✅

**Goal:** Project scaffolding + Step 1 (Inception) with macro data + basic financial calculator

**Deliverables:**
- ✅ Vite + React + Tailwind project
- ✅ Macro Environment Dashboard with live fetch
- ✅ Sector/subtype selection
- ✅ Drivers of Change
- ✅ Developer's Targeted Spread Calculator
- ✅ AI Analysis panel
- ✅ Basic Step 2 feasibility tracking

**Validation:** User can define a project and see initial macro context + spread calculation

---

### Phase 2: Research Engine Expansion (Steps 2, 3, 5, 11)

**Goal:** Full research capability across all research-heavy steps

**Deliverables:**
- ⬜ Step 2: Submarket research modules (demographics, zoning, comps, environment, infrastructure, competition)
- ⬜ Step 3: Market study research (supply/demand, absorption, rental rates, construction costs, cap rates)
- ⬜ Step 5: Financing intelligence (debt terms, equity expectations, public incentives)
- ⬜ Step 11: Exit intelligence (transaction comps, cap rate surveys, permanent debt terms)
- ⬜ Centralized project state (React Context + Reducer)
- ⬜ Research findings stored in state and available across steps

**Validation:** User can trigger AI research at each step and see structured, actionable data

---

### Phase 3: Scenario Simulator (Steps 4, 6, 7, 8, 9, 10)

**Goal:** Interactive scenario sliders with downstream financial impact at every execution step

**Deliverables:**
- ⬜ Reusable ScenarioSlider component with impact display
- ⬜ Step 4: Pre-leasing, entitlement, design cost scenarios
- ⬜ Step 6: Closing timeline, land cost, rate environment scenarios
- ⬜ Step 7: Construction duration, cost escalation, change orders, rate movement
- ⬜ Step 8: CO delay, free rent, opening occupancy scenarios
- ⬜ Step 9: Absorption rate, effective rent, OpEx, management fee scenarios
- ⬜ Step 10: Stabilization threshold, time-to-stabilization, refi timing
- ⬜ Downstream calculation pipeline (scenario → time → cost → TCD → spread → IRR)

**Validation:** Adjusting any slider instantly shows cascading financial impact

---

### Phase 4: Financial Model & Capital Stack

**Goal:** Complete, always-visible financial model with capital stack and waterfall

**Deliverables:**
- ⬜ Persistent financial model panel (sidebar or bottom bar)
- ⬜ TCD buildup driven by all scenario inputs
- ⬜ Capital Stack Builder across 4 financing stages
- ⬜ Waterfall Structure Builder with customizable tiers
- ⬜ Developer's Fees calculator
- ⬜ IRR calculator (leveraged + unleveraged)
- ⬜ Equity multiple calculation
- ⬜ Traffic light indicators on all key metrics

**Validation:** Full financial picture that updates in real-time from any step

---

### Phase 5: Critical Path Timeline & Integration

**Goal:** Visual timeline + final integration pass ensuring all layers are connected

**Deliverables:**
- ⬜ Gantt-style Critical Path Timeline with all 11 steps
- ⬜ Timeline durations driven by scenario sliders
- ⬜ Financing stage overlay
- ⬜ Key milestone markers
- ⬜ Full integration testing (change in any step ripples correctly to all others)

**Validation:** Complete, connected experience across all 11 steps

---

### Phase 6: Export & Polish

**Goal:** Production-ready tool with professional export capability

**Deliverables:**
- ⬜ Excel export (multi-tab workbook: Macro, Research, Scenarios, Capital Stack, Waterfall, Timeline, Summary)
- ⬜ Loading states, error handling, empty states
- ⬜ Onboarding flow / guided first-use experience
- ⬜ Performance optimization
- ⬜ Mobile-responsive layout
- ⬜ README with setup instructions and documentation

**Validation:** Polished, exportable, presentation-ready tool

---

## 11. Success Criteria

### MVP Success Definition

The MVP is successful when a user can:
1. Define a project (sector + location) and have the tool auto-research relevant macro, submarket, and market data
2. See current financing terms and available public incentive programs for their project type and jurisdiction
3. Game out execution scenarios (construction timeline, lease-up speed, cost escalation) and instantly see the financial impact
4. Watch the Developer's Targeted Spread, IRR, and exit value update in real-time as they adjust any assumption across any step
5. Build a capital stack and waterfall structure informed by researched market terms
6. View a Critical Path Timeline that reflects their scenario assumptions
7. Export everything to a professional Excel workbook
8. Spend hours instead of weeks on pre-development feasibility research

### Quality Indicators

- Live macro data fetch completes within 10 seconds
- AI research modules return structured results within 15 seconds
- Scenario slider adjustments recalculate downstream impact within 100ms
- All financial formulas validated against course examples (slide 38)
- Excel exports produce valid, well-formatted multi-tab workbooks
- Application loads in under 2 seconds
- Works in Chrome, Firefox, Safari

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **AI research quality** | Inaccurate or outdated data surfaced | Frame as "research starting point" not "ground truth"; user can override all findings; source attribution on all results |
| **API rate limits** | Research modules fail during heavy use | Batch research queries; cache results in session state; graceful fallbacks |
| **API key exposure** | Security breach | .env excluded via .gitignore; never hardcode; documentation |
| **Financial calculation errors** | Incorrect feasibility assessments | Validate against slide 38 examples; unit tests for cascading calculations |
| **Scenario model oversimplification** | Users trust outputs that lack nuance | Clear disclaimers; sensitivity ranges rather than point estimates; note model limitations |
| **Scope creep** | MVP never ships | Strict phase boundaries; defer features to post-MVP |
| **State management complexity** | Bugs in cross-step data flow | Centralized reducer with clear action types; integration tests for cascading updates |
| **5+ year projection accuracy** | Inherently uncertain | Emphasize scenario ranges over point estimates; encourage constant reassessment |

---

## 13. Future Considerations

### Post-MVP Enhancements

- **Paid data integration** — CoStar, CBRE, RCA/MSCI for institutional-grade comps and market data
- **GIS / mapping** — Interactive map with parcel-level zoning, demographics, and comp overlays
- **Multi-project comparison** — Side-by-side feasibility for competing sites or concepts
- **Monte Carlo simulation** — Probabilistic modeling across all scenario variables simultaneously
- **Collaboration** — Multi-user with role-based views (developer, investor, advisor)
- **Template library** — Pre-built projects by sector, market tier, and scale
- **Construction cost database** — RSMeans integration for detailed cost estimation
- **Tax modeling** — Depreciation, 1031 exchanges, cost segregation, opportunity zone benefits

### Technical Improvements

- **Backend API** — FastAPI for data persistence, project versioning, and multi-session support
- **Database** — PostgreSQL for project storage and sharing
- **Authentication** — User accounts with project portfolios
- **Real-time collaboration** — WebSocket-based multi-user editing
- **PDF report generation** — Professional feasibility reports with charts
- **PWA support** — Installable, offline-capable web app

---

## 14. Appendix

### Key Course References

| Slides | Topic | Tool Integration |
|--------|-------|-----------------|
| 2–3 | The 8 Drivers of Change | Step 1: Driver selection and research |
| 4–12 | Economic changes, key dates, macro charts | Step 1: Macro Dashboard |
| 13–14 | CRE sectors and subtypes | Step 1: Sector selection |
| 15–17 | Developer requirements, project complexity | Cross-cutting: Guidance panels |
| 18 | The 11-Step Development Process | Core framework: Step navigation |
| 19–29 | Detailed Steps 1–11 | All steps: Content and checklists |
| 30–31 | 3–4 Stages of Financing | Step 5: Capital Stack Builder |
| 32–35 | Equity, budgets, proformas, Critical Path | Financial Model + Timeline |
| 36–38 | Key Metrics and Developer's Targeted Spread | Financial Model: Spread Calculator |
| 39–43 | Waterfall Structures and Developer's Fees | Step 11: Waterfall Builder |

### Key Financial Formulas

| Formula | Calculation |
|---------|-------------|
| Developer's Yield on TCD | NOI at Stabilization ÷ Total Cost of Development |
| Developer's Targeted Spread | Developer's Yield − Investor's Exit Cap Rate (in BP) |
| Implied Sales Price | NOI at Stabilization ÷ Exit Cap Rate |
| Gross Profit/Loss | Sales Price − TCD |
| Monthly Carry Cost | Outstanding Loan Balance × (Annual Rate ÷ 12) |
| Time to Stabilization | (Stabilization Threshold − Opening Occupancy) ÷ Monthly Absorption Rate |
| Equity Multiple | Total Distributions ÷ Total Equity Invested |

### Key Dependencies

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Recharts Documentation](https://recharts.org/)
- [SheetJS Documentation](https://docs.sheetjs.com/)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
