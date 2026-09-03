/**
 * NexSkill Platform Constants
 */

export const ROLES = Object.freeze({
  STUDENT: 'student',
  EMPLOYER: 'employer',
  TRAINER: 'trainer',
  ADMIN: 'admin',
});

export const MATCH_SCORE_TIERS = Object.freeze({
  HIGH: 80,
  MEDIUM: 50,
  LOW: 0,
});

export const MATCH_SCORE_STATUS = Object.freeze({
  EXCELLENT: { min: 80, label: 'High Match', level: 'high' },
  GOOD: { min: 50, label: 'Moderate Match', level: 'medium' },
  LOW: { min: 0, label: 'Low Match', level: 'low' },
});

export const CANDIDATE_STATUS = Object.freeze({
  NEW: 'new',
  SHORTLISTED: 'shortlisted',
  CONTACTED: 'contacted',
  INTERVIEW_SCHEDULED: 'interview_scheduled',
  OFFERED: 'offered',
  HIRED: 'hired',
  REJECTED: 'rejected',
});

export const TRAINER_PROGRAM_TYPES = Object.freeze({
  WORKSHOP: 'Industry Workshop',
  UPSKILLING: 'Faculty Upskilling',
  CERTIFICATION: 'Industry Certification',
  WEBINAR: 'Webinar & Masterclass',
  MENTORSHIP: 'Hackathon Mentorship',
});

export const EXPERIENCE_LEVELS = Object.freeze({
  ENTRY: 'entry',
  MID: 'mid',
  SENIOR: 'senior',
  LEAD: 'lead',
});

export const APP_ROUTES = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  RESUME_ANALYZER: '/resume-analyzer',
  CREDENTIAL_TRACKER: '/credential-tracker',
  EMPLOYER_DISCOVERY: '/employer-discovery',
  AI_CAREER_GUIDANCE: '/career-guidance',
  TRAINER_DEVELOPMENT: '/trainer-development',
});

export const SORT_OPTIONS = Object.freeze({
  MATCH_DESC: 'match_desc',
  MATCH_ASC: 'match_asc',
  EXPERIENCE_DESC: 'exp_desc',
  EXPERIENCE_ASC: 'exp_asc',
  NAME_ASC: 'name_asc',
});
