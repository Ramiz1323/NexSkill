# NexSkill Frontend Execution Plan — Branch: `adrija-frontend`

> **Developer:** Adrija Sarkar  
> **Branch:** `adrija-frontend`  
> **Problem Statement ID:** SIH 2026 Problem Statement 26134 ("Challenges in aligning skill development programs with industry requirements and emerging job market demands")  
> **Core Guidelines:**
> 1. UI styling/design is decoupled — focus on functional structure, routing, components, and state management.
> 2. Zero dummy/hardcoded mock data in state or components — pure RTK slices, API clients (Axios services), and clean initial state primitives (`null`, `[]`, `idle`).
> 3. Redux Toolkit (RTK) for root store configuration, asyncThunks, and state slices.

---

## 📅 Session Overview

| Session | Scope / Target Area | Key Modules & Files |
| :--- | :--- | :--- |
| **Session 1** | Core Shell, Navigation, Theme & Store Setup | `ThemeContext.jsx`, `store.js`, Common Components, Layouts (`MainLayout`, `AuthLayout`, `DashboardLayout`), `AppRoutes.jsx`, `ProtectedRoute.jsx` |
| **Session 2** | Authentication API, Slice & Auth Pages | `authApi.js`, `authSlice.js`, `Login.jsx`, `Register.jsx` |
| **Session 3** | Dashboard Overview & Metrics Integration | `DashboardOverview.jsx`, Metric cards, navigation widgets, RTK dashboard data consumption |
| **Session 4** | ATS Resume Analyzer & Credential Tracker | `resumeAnalyzerApi.js`, `resumeSlice.js`, `AtsResumeAnalyzer.jsx`, `ResumeUploadForm.jsx`, `progressTrackerApi.js`, `progressSlice.js`, `CredentialTracker.jsx`, `ProgressChart.jsx` |

---

## 📍 Session 1 — Core Shell, Navigation, Theme Context, Routing & RTK Root Store Setup

### 🎯 Objective
Establish the primary application foundation including theme state management, Redux Toolkit root store setup with registered slices, common reusable UI component shells, layout wrappers, and React Router DOM route hierarchy with protection logic.

### 🛠️ Assigned Files & Implementation Plan
1. **Theme Context (`src/context/ThemeContext.jsx`):**
   - Provide dark/light mode state context with `theme` state ('light' | 'dark').
   - Persist theme choice in `localStorage`.
   - Expose `useTheme` custom hook.

2. **RTK Root Store (`src/redux/store.js`):**
   - Setup `configureStore` from Redux Toolkit.
   - Register slices for all NexSkill core domains:
     - `auth`: `authSlice`
     - `resume`: `resumeSlice`
     - `progress`: `progressSlice`
     - `market`: `marketSlice`
     - `curriculum`: `curriculumSlice`
     - `demand`: `demandSlice`
     - `employer`: `employerSlice`
     - `career`: `careerSlice`
     - `trainer`: `trainerSlice`

3. **Common Reusable Components (`src/components/common/`):**
   - `Navbar.jsx`: Top navigation header with brand link, navigation items, theme toggle button, and user authentication state actions.
   - `Sidebar.jsx`: Navigation drawer/sidebar listing application route links.
   - `Footer.jsx`: Footer component with copyright & platform links.
   - `Modal.jsx`: Reusable modal wrapper with `isOpen`, `onClose`, title, and action children.
   - `Card.jsx`: Container box wrapper component for content grouping.
   - `Button.jsx`: Standard button wrapper handling `type`, `onClick`, `disabled`, and `variant`.
   - `Loader.jsx`: Activity/spinner indicator component for async pending states.

4. **Layout Shells (`src/layouts/`):**
   - `MainLayout.jsx`: Public application wrapper (`Navbar` + `<Outlet />` + `Footer`).
   - `AuthLayout.jsx`: Centered auth wrapper for login/register pages.
   - `DashboardLayout.jsx`: Authenticated dashboard wrapper (`Navbar` + `Sidebar` + `<Outlet />` + `Footer`).

5. **Routing & Protection (`src/routes/`):**
   - `ProtectedRoute.jsx`: Checks RTK `auth.isAuthenticated` state. Redirects unauthenticated users to `/login`.
   - `AppRoutes.jsx`: Central router definition mapping public, auth, and protected dashboard routes.

---

## 📍 Session 2 — Auth API, RTK Auth Slice & Login/Register UI

### 🎯 Objective
Implement authentication flow including Axios API integration, Redux Toolkit asyncThunks, state management, and functional login/register page forms.

### 🛠️ Assigned Files & Implementation Plan
1. **Auth API Client (`src/api/authApi.js`):**
   - Axios service instance with base configuration.
   - API functions: `loginApi(credentials)`, `registerApi(userData)`, `getCurrentUserApi()`, `logoutApi()`.

2. **RTK Auth Slice (`src/redux/slices/authSlice.js`):**
   - Initial State: `{ user: null, token: localStorage.getItem('token'), isAuthenticated: false, loading: false, error: null }`.
   - `createAsyncThunk` implementations: `loginUser`, `registerUser`, `fetchCurrentUser`, `logoutUser`.
   - Reducers to handle token storage, logout clearing, and error reset.

3. **Auth Pages (`src/pages/auth/`):**
   - `Login.jsx`: Form with email/password inputs, validation, dispatching `loginUser`, error display, and redirect on success.
   - `Register.jsx`: Registration form with full name, email, password, role selection, dispatching `registerUser`.

---

## 📍 Session 3 — Dashboard Overview & Summary Metrics

### 🎯 Objective
Build the main dashboard landing page displaying system-wide summary metrics, quick navigation options, and status feeds driven by Redux Toolkit state.

### 🛠️ Assigned Files & Implementation Plan
1. **Dashboard Overview Page (`src/pages/dashboard/DashboardOverview.jsx`):**
   - Displays user welcome header reading from RTK `auth.user`.
   - Renders metric summary cards (e.g., ATS Score status, Skilling Progress %, Skill Gaps detected, Industry Alignment score).
   - Provides direct action buttons navigating to ATS Resume Analyzer, Credential Tracker, and Skill Gap tools.

---

## 📍 Session 4 — ATS Resume Analyzer & Credential Progress Tracker

### 🎯 Objective
Build the interactive ATS Resume Analyzer module and the Credential Tracker analytics visualization powered by Recharts and RTK async state.

### 🛠️ Assigned Files & Implementation Plan
1. **ATS Resume Analyzer (`src/pages/resumeAnalyzer/`):**
   - `src/api/resumeAnalyzerApi.js`: Axios endpoint `analyzeResumeApi(formData)` sending multipart file data to backend.
   - `src/redux/slices/resumeSlice.js`: RTK slice managing `resumeData`, `atsScore`, `skillGaps`, `matchedKeywords`, `suggestions`, `loading`, `error`.
   - `ResumeUploadForm.jsx`: File upload dropzone/input handling PDF/DOCX selection.
   - `AtsResumeAnalyzer.jsx`: Results view showing parsed score breakdown, key findings, and improvement recommendations.

2. **Credential Tracker & Recharts Visualization (`src/pages/progressTracker/`):**
   - `src/api/progressTrackerApi.js`: Axios endpoints `fetchProgressApi()` and `addCredentialApi(data)`.
   - `src/redux/slices/progressSlice.js`: RTK slice managing `credentials` array, `skillProgress` metrics, `loading`, `error`.
   - `ProgressChart.jsx`: Recharts component visualizing skill proficiency percentages and timeline metrics.
   - `CredentialTracker.jsx`: Credential manager listing earned certificates, progress charts, and new credential logging form.

---

## 💡 Key Architectural Standards
- **No Dummy Data:** State arrays initialize to `[]` and objects to `null`. Data is fetched dynamically via API thunks.
- **Pure RTK:** All feature slices cleanly export state selectors and thunks for component dispatch.
