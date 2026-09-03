# NexSkill Frontend Roadmap — 3 Implementation Sessions
**Project:** NexSkill (Smart India Hackathon 2026 — PS 26134)  
**Branch:** `saif_frontend`  
**Tech Stack:** React 19, Vite, Tailwind CSS v4, Redux Toolkit (RTK), React Redux, React Router DOM, Axios, Recharts, Lucide React  

---

## Architecture & Guiding Principles

1. **Strict Separation of Concerns:**
   - The Frontend does not contain backend logic, database operations, or mock hardcoded constants.
   - All backend interaction is executed via dedicated Axios API service modules connecting to REST API endpoints (`/api/...`).
2. **Redux Toolkit (RTK) State Management:**
   - Slices manage state via `createSlice` and `createAsyncThunk`.
   - Reducers handle `pending`, `fulfilled`, and `rejected` states with explicit error tracking.
   - Slices register cleanly in `src/redux/store.js`.
3. **Pure Functionality & Unstyled Component Architecture:**
   - Structure, state binding, event handlers, and data flows are built purely for functional correctness.
   - Visual styling and presentation layers can be styled without touching business logic or state connections.

---

## Session Breakdown

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXSKILL ROADMAP                                │
└────────────────────────────────────────────────────────────────────────┘

 [Session 1] Labour Market Intelligence
      ├── Axios Service: `src/api/marketIntelligenceApi.js`
      ├── RTK Slice:     `src/redux/slices/marketSlice.js`
      ├── Chart:         `src/components/charts/MarketDemandChart.jsx`
      └── Page:          `src/pages/marketIntelligence/MarketIntelligence.jsx`

 [Session 2] Industry-Aligned & Dynamic Curriculum
      ├── Axios Service: `src/api/curriculumApi.js`
      ├── RTK Slice:     `src/redux/slices/curriculumSlice.js`
      ├── Chart:         `src/components/charts/SkillGapChart.jsx`
      ├── Form:          `src/components/forms/FeedbackForm.jsx`
      ├── Page 1:        `src/pages/curriculum/IndustryCurriculum.jsx`
      └── Page 2:        `src/pages/curriculum/DynamicCurriculum.jsx`

 [Session 3] Future-Ready Demand Forecasting
      ├── Axios Service: `src/api/demandForecastApi.js`
      ├── RTK Slice:     `src/redux/slices/demandSlice.js`
      └── Page:          `src/pages/demandForecasting/DemandForecasting.jsx`
```

---

## Session 1: Labour Market Intelligence

### Goal
Build the end-to-end functional infrastructure for real-time labour market demand, industry hiring trends, and skill distribution analytics.

### Deliverables & File Structure
1. **Redux Store Setup:**
   - File: `src/redux/store.js`
   - Configures central RTK store with Redux Thunk and registers `marketReducer`.
2. **Axios Client & Market Intelligence API:**
   - File: `src/api/axiosClient.js` — Central Axios instance configured with base URL, headers, and response interceptors.
   - File: `src/api/marketIntelligenceApi.js` — REST endpoint callers:
     - `getMarketDemandTrends(params)`: `GET /api/market-intelligence/demand`
     - `getIndustrySkillDistribution(params)`: `GET /api/market-intelligence/skills`
     - `getLabourMarketSummary(params)`: `GET /api/market-intelligence/summary`
3. **RTK Market Slice:**
   - File: `src/redux/slices/marketSlice.js`
   - Async Thunks:
     - `fetchMarketDemandTrends`
     - `fetchSkillDistribution`
     - `fetchMarketSummary`
   - State Schema:
     - `demandTrends: []`
     - `skillDistribution: []`
     - `summary: {}`
     - `filters: { industry: 'All', region: 'All', timeframe: '1Y' }`
     - `loading: boolean`
     - `error: string | null`
   - Reducers: `setIndustryFilter`, `setRegionFilter`, `setTimeframeFilter`, `clearMarketErrors`.
4. **Market Demand Chart Component:**
   - File: `src/components/charts/MarketDemandChart.jsx`
   - Functional Recharts Area/Bar chart plotting demand volume vs time/skill, consuming data directly from props.
5. **Labour Market Intelligence Page:**
   - File: `src/pages/marketIntelligence/MarketIntelligence.jsx`
   - Dispatches thunks on mount and when filter criteria change.
   - Exposes filter controls (industry, geography, timeframe).
   - Renders loading spinners, error alerts, summary statistics, `MarketDemandChart`, and raw skill distribution tables.

---

## Session 2: Industry-Aligned & Dynamic Curriculum

### Goal
Build the curriculum catalog matching industry standards, real-time student skill gap detection, and the feedback loop for employers and trainers.

### Deliverables & File Structure
1. **Axios Curriculum API:**
   - File: `src/api/curriculumApi.js`
     - `getIndustryCurriculums(query)`: `GET /api/curriculum/industry`
     - `getCurriculumById(id)`: `GET /api/curriculum/industry/:id`
     - `getStudentSkillGap(studentId, targetRole)`: `GET /api/curriculum/skill-gap`
     - `getDynamicLearningPath(params)`: `GET /api/curriculum/adaptive-path`
     - `submitCurriculumFeedback(payload)`: `POST /api/curriculum/feedback`
2. **RTK Curriculum Slice:**
   - File: `src/redux/slices/curriculumSlice.js`
   - Async Thunks:
     - `fetchIndustryCurriculums`
     - `fetchSkillGapAnalysis`
     - `fetchAdaptiveLearningPath`
     - `postCurriculumFeedback`
   - State Schema:
     - `curriculums: []`
     - `selectedCurriculum: null`
     - `skillGapData: { requiredSkills: [], currentSkills: [], gapPercentage: 0 }`
     - `adaptiveRoadmap: []`
     - `feedbackStatus: { submitting: false, success: false, error: null }`
     - `loading: boolean`
     - `error: string | null`
3. **Skill Gap Chart Component:**
   - File: `src/components/charts/SkillGapChart.jsx`
   - Recharts Radar / Comparative Bar visualization mapping student competency against target role requirements.
4. **Industry Feedback Form:**
   - File: `src/components/forms/FeedbackForm.jsx`
   - Controlled form to capture technical skill ratings, missing competencies, and curriculum recommendations. Dispatches `postCurriculumFeedback`.
5. **Industry Curriculum Page:**
   - File: `src/pages/curriculum/IndustryCurriculum.jsx`
   - Searchable, role-filtered list of vetted educational tracks aligned with active market roles.
6. **Dynamic Curriculum Page:**
   - File: `src/pages/curriculum/DynamicCurriculum.jsx`
   - Evaluates current skills vs role requirements, shows `SkillGapChart`, and outputs modular adaptive roadmaps.

---

## Session 3: Future-Ready Demand Forecasting

### Goal
Build predictive analytics projecting 5-year labor market skill shifts, emerging technical disciplines, and automation impact indices.

### Deliverables & File Structure
1. **Axios Demand Forecast API:**
   - File: `src/api/demandForecastApi.js`
     - `getSkillDemandForecast(params)`: `GET /api/demand-forecast/projections`
     - `getEmergingTechRoles(params)`: `GET /api/demand-forecast/emerging-roles`
     - `getAutomationImpactAnalysis(params)`: `GET /api/demand-forecast/automation-risk`
2. **RTK Demand Slice:**
   - File: `src/redux/slices/demandSlice.js`
   - Async Thunks:
     - `fetchSkillForecast`
     - `fetchEmergingRoles`
     - `fetchAutomationAnalysis`
   - State Schema:
     - `projections: []`
     - `emergingRoles: []`
     - `automationIndex: []`
     - `forecastHorizon: '5Y'`
     - `loading: boolean`
     - `error: string | null`
3. **Demand Forecasting Page:**
   - File: `src/pages/demandForecasting/DemandForecasting.jsx`
   - Displays 5-year trend projections, emerging job role tables, automation risk indicators, and horizon selector controls.
