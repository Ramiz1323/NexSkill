# NexSkill - Frontend Architecture & Folder Structure

## Project Overview
**SIH 2026 Problem Statement 26134:**
> *"Challenges in aligning skill development programs with industry requirements and emerging job market demands."*

**NexSkill Ecosystem Flow:**
```
Labour Market Demand 
  ↓ 
Industry Required Skills 
  ↓ 
Student Skill Assessment 
  ↓ 
Skill Gap Detection 
  ↓ 
Personalized Learning / Curriculum 
  ↓ 
Job Readiness 
  ↓ 
Employer Matching 
  ↓ 
Placement Outcomes
```

---

## Technology Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit + React Redux
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Data Visualization**: Recharts
- **Icons**: Lucide React

---

## Frontend Directory Structure (`Frontend/src/`)

```
Frontend/
├── FRONTEND_STRUCTURE.md
├── package.json
├── index.html
├── vite.config.js
└── src/
    ├── api/                      # Axios REST API services (Backend Integration)
    │   ├── axiosClient.js        # Base Axios instance configuration
    │   ├── authApi.js            # Authentication endpoints
    │   ├── marketIntelligenceApi.js # Labour Market Intelligence endpoints
    │   ├── curriculumApi.js      # Industry & Dynamic Curriculum endpoints
    │   ├── resumeAnalyzerApi.js  # AI ATS Resume Analyzer endpoints
    │   ├── progressTrackerApi.js # Progress & Credential Tracker endpoints
    │   ├── employerApi.js        # Employer Discovery Panel endpoints
    │   ├── demandForecastApi.js  # Future-Ready Demand Forecasting endpoints
    │   ├── careerGuidanceApi.js  # AI Career Guidance endpoints
    │   └── trainerDevApi.js      # Industry-Driven Trainer Development endpoints
    │
    ├── assets/                   # Static assets & media
    │   ├── images/               # App image assets
    │   └── icons/                # SVG/Icon assets
    │
    ├── components/               # Modular UI Components
    │   ├── common/               # Generic reusable components
    │   │   ├── Navbar.jsx        # Navigation Header
    │   │   ├── Sidebar.jsx       # Dashboard Sidebar
    │   │   ├── Footer.jsx        # Application Footer
    │   │   ├── Modal.jsx         # Universal Modal dialog
    │   │   ├── Card.jsx          # UI Card component
    │   │   ├── Button.jsx        # Custom Button component
    │   │   └── Loader.jsx        # Loading indicator / spinner
    │   ├── charts/               # Recharts Visualization Components
    │   │   ├── SkillGapChart.jsx    # Skill Gap radar/bar visualizer
    │   │   ├── MarketDemandChart.jsx# Market trend visualizer
    │   │   └── ProgressChart.jsx    # Learning progress tracking chart
    │   └── forms/                # Form components
    │       ├── ResumeUploadForm.jsx # ATS Resume Uploader
    │       └── FeedbackForm.jsx     # Dynamic Curriculum Feedback Form
    │
    ├── context/                  # React Context (e.g., Theme/UI context)
    │   └── ThemeContext.jsx
    │
    ├── hooks/                    # Custom React Hooks
    │   ├── useAuth.js            # Auth state custom hook
    │   ├── useFetch.js           # Generic data fetch hook
    │   └── useDebounce.js        # Input debounce hook
    │
    ├── layouts/                  # Layout Wrappers
    │   ├── MainLayout.jsx        # Public pages layout
    │   ├── AuthLayout.jsx        # Login/Register layout
    │   └── DashboardLayout.jsx   # Portal dashboard layout with sidebar
    │
    ├── pages/                    # Core Feature Pages (SIH Modules)
    │   ├── auth/
    │   │   ├── Login.jsx         # User Authentication
    │   │   └── Register.jsx      # User Registration
    │   ├── dashboard/
    │   │   └── DashboardOverview.jsx # Primary Portal Dashboard
    │   ├── marketIntelligence/
    │   │   └── MarketIntelligence.jsx # Labour-Market Intelligence Hub
    │   ├── curriculum/
    │   │   ├── IndustryCurriculum.jsx # Industry-Aligned Curriculum
    │   │   └── DynamicCurriculum.jsx  # Dynamic Curriculum & Feedback
    │   ├── resumeAnalyzer/
    │   │   └── AtsResumeAnalyzer.jsx  # AI ATS Resume Analyzer
    │   ├── progressTracker/
    │   │   └── CredentialTracker.jsx  # Progress & Credential Tracker
    │   ├── employerPanel/
    │   │   └── EmployerDiscovery.jsx  # Employer Discovery Panel
    │   ├── demandForecasting/
    │   │   └── DemandForecasting.jsx  # Future-Ready Demand Forecasting
    │   ├── careerGuidance/
    │   │   └── AiCareerGuidance.jsx   # AI Career Guidance
    │   └── trainerDevelopment/
    │       └── TrainerDevelopment.jsx # Trainer Development Panel
    │
    ├── redux/                    # Redux Toolkit Global State
    │   ├── store.js              # Redux Store Configuration
    │   └── slices/               # Feature Slices
    │       ├── authSlice.js
    │       ├── marketSlice.js
    │       ├── curriculumSlice.js
    │       ├── resumeSlice.js
    │       ├── progressSlice.js
    │       ├── employerSlice.js
    │       ├── demandSlice.js
    │       ├── careerSlice.js
    │       └── trainerSlice.js
    │
    ├── routes/                   # Application Navigation & Guard Rails
    │   ├── AppRoutes.jsx         # Main router mapping page views
    │   └── ProtectedRoute.jsx    # Auth route guard wrapper
    │
    └── utils/                    # Shared Helper Functions & Constants
        ├── constants.js          # Global app configuration constants
        └── formatters.js         # Formatting utilities (dates, stats, text)
```
