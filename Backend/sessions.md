# NexSkill Backend Roadmap — 4 Implementation Sessions
**Project:** NexSkill Backend (Smart India Hackathon 2026 — PS 26134)  
**Branch:** `saif_frontend`  
**Tech Stack:** Node.js (ES Modules), Express.js, MongoDB (Mongoose), JWT, Bcryptjs, Multer  

---

## Architectural Principles & Standards

1. **Standardized Responses & Error Handling:**
   - Every controller response must return an instance of `ApiResponse`:
     ```js
     new ApiResponse(statusCode, data, message)
     ```
   - All errors must be thrown as instances of `ApiError`:
     ```js
     new ApiError(statusCode, message, errors, stack)
     ```
   - Every asynchronous controller route handler must be wrapped in `asyncHandler`:
     ```js
     export const myHandler = asyncHandler(async (req, res) => { ... });
     ```
2. **Modular Architecture Pattern:**
   Every feature domain under `src/modules/<moduleName>/` follows a strict structure:
   - `<moduleName>.model.js`: Mongoose schema, indexing, pre/post hooks, validation.
   - `<moduleName>.service.js`: Reusable business logic, DB queries, calculations.
   - `<moduleName>.controller.js`: Request validation, calling service, returning `ApiResponse`.
   - `<moduleName>.routes.js`: Express Router mapping endpoints with auth & role middlewares.
   - `index.js`: Module barrel export.
3. **Master Routing Layer:**
   - `src/routes/index.js` mounts all domain module routers under the `/api` namespace prefix.

---

## 4-Session Breakdown

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXSKILL BACKEND ROADMAP                        │
└────────────────────────────────────────────────────────────────────────┘

 [Session 1] Phase 0 — Foundation & Infrastructure
      ├── Configuration: `src/config/env.js`, `database.js`, `cors.js`
      ├── Core Utils:    `ApiError.js`, `ApiResponse.js`, `asyncHandler.js`, `pagination.js`
      ├── Middlewares:   `auth.middleware.js`, `role.middleware.js`, `error.middleware.js`, `validate.middleware.js`, `upload.middleware.js`
      ├── Master Router: `src/routes/index.js`
      └── App & Server:  `src/app.js`, `server.js`

 [Session 2] Phase 1 — Authentication & User Management
      ├── Auth Module:   `src/modules/auth/` (register, login, logout, me, refresh, httpOnly cookies)
      └── Users Module:  `src/modules/users/` (profile CRUD, roles: STUDENT, EMPLOYER, TRAINER, ADMIN)

 [Session 3] Phase 2 & 3 — Student Profiles, Skills & Assessment Engine
      ├── Students:      `src/modules/students/` (academic background, branch, career goals)
      ├── Skills DB:     `src/modules/skills/` (centralized skills registry & taxonomy)
      ├── SkillProfiles: `src/modules/skillProfiles/` (student skill proficiency levels & verification)
      └── Assessments:   `src/modules/assessments/` (quizzes, deterministic scoring, rank updates)

 [Session 4] Phase 4, 6 & 8 — Skill Gaps, Readiness Calculation, Resume ATS & Seeders
      ├── Skill Gaps:    `src/modules/skillGaps/` (student vs industry role delta engine)
      ├── Readiness:     `src/modules/readiness/` (composite job readiness scoring algorithm)
      ├── Resume / ATS:  `src/modules/resume/` (Multer upload, skill keyword parser, ATS score)
      └── Seeders:       `src/database/seeders/seedUsers.js`, `seedSkills.js`
```

---

## Detailed Session Breakdown

### Session 1: Phase 0 — Foundation & Infrastructure
**Goal:** Build the bedrock architecture for NexSkill Backend with enterprise error handling, database connection, middleware pipelines, and master router.

**Files to Deliver:**
1. **Config Layer:**
   - `src/config/env.js`: Validated environment variables (PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRE, NODE_ENV, CLIENT_URL).
   - `src/config/database.js`: Robust Mongoose connection lifecycle handler with reconnect logic and graceful shutdown.
   - `src/config/cors.js`: Strict CORS policy configuration supporting credentials and allowed origins.
2. **Utils Layer:**
   - `src/utils/ApiError.js`: Standardized operational error class with HTTP status code and error details.
   - `src/utils/ApiResponse.js`: Standardized success response format `{ statusCode, data, message, success: true }`.
   - `src/utils/asyncHandler.js`: Higher-order function eliminating `try/catch` boilerplate in Express routes.
   - `src/utils/pagination.js`: Query helper extracting `page`, `limit`, `skip`, and generating meta pagination responses.
3. **Middleware Pipeline:**
   - `src/middleware/error.middleware.js`: Global Express error handler catching `ApiError`, Mongoose duplicate keys, validation errors, and CastErrors.
   - `src/middleware/auth.middleware.js`: JWT verification extracting Bearer token from header or httpOnly cookie.
   - `src/middleware/role.middleware.js`: Role-based access control guard (`requireRoles(['ADMIN', 'EMPLOYER'])`).
   - `src/middleware/validate.middleware.js`: Generic schema validation runner returning `400 Bad Request` upon validation failure.
   - `src/middleware/upload.middleware.js`: Multer storage configuration with file-type filtering (PDF, DOCX) and size limits.
4. **Master Route & App Bootstrap:**
   - `src/routes/index.js`: Central API router mounting health check and future domain module routers.
   - `src/app.js`: Express application setup with security headers, cookie parser, body parsers, logging, and error middleware.
   - `server.js`: Server lifecycle entry point listening for connections after successful DB handshake.

---

### Session 2: Phase 1 — Authentication & User Management
**Goal:** Implement secure authentication, role definitions, and user profile management.

**Files to Deliver:**
1. **Auth Module (`src/modules/auth/`):**
   - `auth.model.js`: User authentication schema with bcrypt password hashing hook and JWT generation methods.
   - `auth.service.js`: Registration logic, credential validation, token generation, and password reset flows.
   - `auth.controller.js`: Handlers for `register`, `login`, `logout`, `getCurrentUser`.
   - `auth.routes.js`: Public routes (`/register`, `/login`) and protected routes (`/logout`, `/me`).
   - `index.js`: Barrel export.
2. **Users Module (`src/modules/users/`):**
   - `user.model.js`: User entity schema with roles: `STUDENT`, `EMPLOYER`, `TRAINER`, `ADMIN`.
   - `user.service.js`: User CRUD, role update by admin, account deactivation.
   - `user.controller.js`: Request controllers for user management.
   - `user.routes.js`: Protected admin and user routes (`GET /api/users`, `GET /api/users/:id`, `PATCH /api/users/:id`).
   - `index.js`: Barrel export.

---

### Session 3: Phase 2 & 3 — Student Profiles, Skills & Assessment Engine
**Goal:** Build student academic profiles, centralized skills dictionary, student skill proficiency tracking, and practical assessment evaluation.

**Files to Deliver:**
1. **Students Module (`src/modules/students/`):**
   - Profile with college/university, degree, branch, graduation year, CGPA, target career domains, GitHub/portfolio links.
2. **Skills Module (`src/modules/skills/`):**
   - Centralized skills catalog with skill name, category (Frontend, Backend, Cloud, ML, Soft Skills), demand level, and industry benchmark weights.
3. **Skill Profiles Module (`src/modules/skillProfiles/`):**
   - Student-skill mappings with proficiency score (0-100), verification badge status, last evaluated date, and assessment source.
4. **Assessments Module (`src/modules/assessments/`):**
   - Assessment questions, MCQ/practical test structures, rubric scoring, and automatic proficiency level updating (Beginner $\rightarrow$ Intermediate $\rightarrow$ Advanced $\rightarrow$ Expert).

---

### Session 4: Phase 4, 6 & 8 — Skill Gap Engine, Readiness Calculation, Resume ATS & Seeders
**Goal:** Complete the NexSkill core intelligence loops: calculate student skill gap vs industry benchmark, compute composite Job Readiness Score %, parse resumes via ATS keyword extraction, and provide seed data.

**Files to Deliver:**
1. **Skill Gap Engine (`src/modules/skillGaps/`):**
   - Analyzes student skills against target role requirements and computes missing technical competencies and curriculum gap indices.
2. **Readiness Score Calculator (`src/modules/readiness/`):**
   - Multi-factor algorithm: Skill Competency (50%) + Project Evidence (25%) + Assessment Score (15%) + Coursework Completion (10%) $\rightarrow$ Composite Readiness Score %.
3. **Resume / ATS Analyzer (`src/modules/resume/`):**
   - Multer resume upload endpoint, text parsing, keyword extraction against role benchmarks, ATS match percentage output.
4. **Seeders (`src/database/seeders/`):**
   - `seedSkills.js`: Pre-populates 50+ industry skills across Software, Cloud, Data, and DevOps.
   - `seedUsers.js`: Initial Admin, Student, and Employer test accounts.
