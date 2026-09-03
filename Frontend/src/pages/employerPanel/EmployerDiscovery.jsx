import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Building2,
  Search,
  CheckCircle2,
  Award,
  Sparkles,
  Inbox
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { fetchCandidates } from '../../redux/slices/employerSlice';

export default function EmployerDiscovery() {
  const dispatch = useDispatch();
  const { candidates = [], loading, error } = useSelector((state) => state.employer);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills?.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedRole === 'All' || c.role?.includes(selectedRole);
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Module 5: Employer Discovery & Direct Matchmaking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Vetted Talent Discovery Panel
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse verified job-ready candidates whose skill gaps have been remediated through industry-aligned curricula.
          </p>
        </div>
        <Button variant="accent" icon={Sparkles}>
          + Post Job Requirement
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-96 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search candidates by skill, name, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500">Filter Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Full-Stack">Full-Stack Cloud</option>
            <option value="AI/ML">AI / Machine Learning</option>
            <option value="DevOps">DevOps & SRE</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && <Loader message="Fetching verified candidate pool from backend..." />}

      {/* Error banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
          <strong>Error loading candidates: </strong> {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredCandidates.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center">
          <Inbox className="w-12 h-12 text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Candidate Records Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            Candidates registered and evaluated through the ATS and Dynamic Learning engines will appear here.
          </p>
        </div>
      )}

      {/* Candidate Cards Grid */}
      {!loading && filteredCandidates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id || candidate._id}
              title={candidate.name}
              subtitle={candidate.location || 'Location Not Specified'}
              badge={candidate.matchScore ? `${candidate.matchScore}% Match` : 'Verified'}
              action={
                candidate.atsScore ? (
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 font-bold text-xs">
                    {candidate.atsScore}%
                  </div>
                ) : null
              }
            >
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">
                    {candidate.role || 'General Tech Candidate'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {candidate.readinessLevel || 'Assessed & Verified'}
                  </span>
                </div>

                {candidate.skills && candidate.skills.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Verified Skill Proficiencies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium badge-indigo"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {candidate.verifiedBadges || 0} Credentials
                  </span>
                  <Button size="sm" variant="primary">
                    Schedule Interview
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCandidates,
  fetchCandidateDetails,
  updateCandidateStatus,
  toggleShortlist,
  setFilters,
  clearFilters,
  setPage,
  clearSelectedCandidate,
  clearEmployerError,
  selectCandidates,
  selectSelectedCandidate,
  selectEmployerFilters,
  selectEmployerPagination,
  selectEmployerLoading,
  selectEmployerActionLoading,
  selectEmployerError,
} from '../../redux/slices/employerSlice';
import useDebounce from '../../hooks/useDebounce';
import {
  MATCH_SCORE_TIERS,
  EXPERIENCE_LEVELS,
  CANDIDATE_STATUS,
} from '../../utils/constants';
import {
  formatExperience,
  formatScore,
  formatCandidateStatus,
} from '../../utils/formatters';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import {
  Search,
  Filter,
  Bookmark,
  User,
  Briefcase,
  Award,
  Mail,
  Phone,
  MapPin,
  RotateCcw,
  Check,
} from 'lucide-react';

const EmployerDiscovery = () => {
  const dispatch = useDispatch();

  const candidates = useSelector(selectCandidates);
  const selectedCandidate = useSelector(selectSelectedCandidate);
  const filters = useSelector(selectEmployerFilters);
  const pagination = useSelector(selectEmployerPagination);
  const loading = useSelector(selectEmployerLoading);
  const actionLoading = useSelector(selectEmployerActionLoading);
  const error = useSelector(selectEmployerError);

  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [skillInput, setSkillInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 400);

  // Sync debounced search with Redux filters
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      dispatch(setFilters({ search: debouncedSearch }));
    }
  }, [debouncedSearch, dispatch, filters.search]);

  // Fetch candidates whenever filters or page change
  useEffect(() => {
    dispatch(
      fetchCandidates({
        search: filters.search,
        skills: filters.skills.join(','),
        minScore: filters.minScore,
        experienceLevel: filters.experienceLevel,
        page: pagination.page,
        limit: pagination.limit,
      })
    );
  }, [dispatch, filters, pagination.page, pagination.limit]);

  const handleSkillAdd = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !filters.skills.includes(trimmed)) {
      dispatch(setFilters({ skills: [...filters.skills, trimmed] }));
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    dispatch(
      setFilters({
        skills: filters.skills.filter((s) => s !== skillToRemove),
      })
    );
  };

  const handleMinScoreChange = (e) => {
    dispatch(setFilters({ minScore: Number(e.target.value) }));
  };

  const handleExperienceChange = (e) => {
    dispatch(setFilters({ experienceLevel: e.target.value }));
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSkillInput('');
    dispatch(clearFilters());
  };

  const handleViewProfile = (candidateId) => {
    dispatch(fetchCandidateDetails(candidateId));
  };

  const handleToggleShortlist = (candidateId) => {
    dispatch(toggleShortlist(candidateId));
  };

  const handleStatusChange = (candidateId, newStatus) => {
    dispatch(updateCandidateStatus({ candidateId, status: newStatus }));
  };

  return (
    <div className="employer-discovery-container p-6 space-y-6">
      {/* Header Section */}
      <header className="employer-discovery-header">
        <h1 className="text-2xl font-bold">Employer Discovery Panel</h1>
        <p className="text-sm text-gray-500">
          Source job-ready talent matching industry demands and verified AI skill readiness scores.
        </p>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="error-banner p-4 border border-red-300 bg-red-50 text-red-700 rounded flex justify-between items-center">
          <span>{error}</span>
          <Button variant="secondary" onClick={() => dispatch(clearEmployerError())}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Search & Filter Controls */}
      <Card className="filter-controls-card p-4 space-y-4">
        <div className="search-bar flex gap-2 items-center">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search candidates by title, keyword, or name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="filters-row grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Skill Tag Input */}
          <div className="skill-filter">
            <label className="block text-xs font-semibold mb-1">Required Skills</label>
            <form onSubmit={handleSkillAdd} className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. React, Python)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
              <Button type="submit" variant="secondary">
                Add
              </Button>
            </form>
          </div>

          {/* Min Match Score Filter */}
          <div className="min-score-filter">
            <label className="block text-xs font-semibold mb-1">
              Min Match Score: {filters.minScore}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.minScore}
              onChange={handleMinScoreChange}
              className="w-full"
            />
          </div>

          {/* Experience Level */}
          <div className="experience-filter">
            <label className="block text-xs font-semibold mb-1">Experience Level</label>
            <select
              value={filters.experienceLevel}
              onChange={handleExperienceChange}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="">All Experience Levels</option>
              <option value={EXPERIENCE_LEVELS.ENTRY}>Entry Level</option>
              <option value={EXPERIENCE_LEVELS.MID}>Mid Level</option>
              <option value={EXPERIENCE_LEVELS.SENIOR}>Senior Level</option>
              <option value={EXPERIENCE_LEVELS.LEAD}>Lead / Executive</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="reset-action">
            <Button
              variant="secondary"
              onClick={handleResetFilters}
              className="w-full flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Reset Filters
            </Button>
          </div>
        </div>

        {/* Selected Skill Badges */}
        {filters.skills.length > 0 && (
          <div className="active-skills flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-semibold self-center">Active Skills:</span>
            {filters.skills.map((skill) => (
              <span
                key={skill}
                className="badge px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleSkillRemove(skill)}
                  className="font-bold cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Results Meta */}
      <div className="results-summary flex justify-between items-center text-sm">
        <span>
          Showing <strong>{candidates.length}</strong> candidate{candidates.length === 1 ? '' : 's'}
          {pagination.total > 0 && ` of ${pagination.total}`}
        </span>
      </div>

      {/* Candidates List / Grid */}
      {loading ? (
        <Loader message="Searching candidates across industry talent pool..." />
      ) : candidates.length === 0 ? (
        <Card className="empty-state-card p-8 text-center space-y-2">
          <User size={36} className="mx-auto text-gray-400" />
          <h3 className="text-lg font-semibold">No candidates found</h3>
          <p className="text-sm text-gray-500">
            Try adjusting your search criteria, required skills, or match score threshold.
          </p>
          <Button variant="secondary" onClick={handleResetFilters}>
            Clear All Filters
          </Button>
        </Card>
      ) : (
        <div className="candidates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((candidate) => {
            const candidateId = candidate._id || candidate.id;
            const matchScore = candidate.matchScore ?? candidate.readinessScore ?? 0;

            return (
              <Card
                key={candidateId}
                className="candidate-card p-4 border rounded space-y-3 flex flex-col justify-between"
              >
                <div className="card-top space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{candidate.name || 'Candidate'}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Briefcase size={14} /> {candidate.title || candidate.role || 'Job Ready Candidate'}
                      </p>
                      {candidate.location && (
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin size={12} /> {candidate.location}
                        </p>
                      )}
                    </div>
                    <span className="match-badge px-2 py-1 text-xs font-bold rounded border">
                      {formatScore(matchScore)} Match
                    </span>
                  </div>

                  <div className="experience-and-status text-xs space-y-1">
                    <div>
                      <strong>Experience:</strong> {formatExperience(candidate.experienceYears ?? candidate.experience)}
                    </div>
                    <div>
                      <strong>Status:</strong> {formatCandidateStatus(candidate.status || CANDIDATE_STATUS.NEW)}
                    </div>
                  </div>

                  {/* Skills tags */}
                  {candidate.skills && candidate.skills.length > 0 && (
                    <div className="candidate-skills flex flex-wrap gap-1 pt-1">
                      {candidate.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 4 && (
                        <span className="text-xs text-gray-400">+{candidate.skills.length - 4} more</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="card-actions flex gap-2 pt-3 border-t">
                  <Button
                    variant="primary"
                    onClick={() => handleViewProfile(candidateId)}
                    className="flex-1 text-xs"
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleToggleShortlist(candidateId)}
                    className="text-xs flex items-center gap-1"
                  >
                    <Bookmark size={14} className={candidate.isShortlisted ? 'fill-current' : ''} />
                    {candidate.isShortlisted ? 'Saved' : 'Shortlist'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.total > pagination.limit && (
        <div className="pagination-bar flex justify-center items-center gap-3 pt-4">
          <Button
            variant="secondary"
            disabled={pagination.page <= 1}
            onClick={() => dispatch(setPage(pagination.page - 1))}
          >
            Previous
          </Button>
          <span className="text-sm font-semibold">Page {pagination.page}</span>
          <Button
            variant="secondary"
            disabled={pagination.page * pagination.limit >= pagination.total}
            onClick={() => dispatch(setPage(pagination.page + 1))}
          >
            Next
          </Button>
        </div>
      )}

      {/* Candidate Profile Details Modal */}
      {selectedCandidate && (
        <Modal
          isOpen={Boolean(selectedCandidate)}
          onClose={() => dispatch(clearSelectedCandidate())}
          title={selectedCandidate.name || 'Candidate Profile'}
        >
          <div className="candidate-detail-body space-y-4">
            {actionLoading && <Loader message="Loading profile details..." />}

            <div>
              <p className="font-semibold text-sm">{selectedCandidate.title || 'Job Ready Candidate'}</p>
              {selectedCandidate.location && (
                <p className="text-xs text-gray-500">{selectedCandidate.location}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border p-2 rounded">
              <div>
                <strong>Match Score:</strong> {formatScore(selectedCandidate.matchScore ?? 0)}
              </div>
              <div>
                <strong>Experience:</strong> {formatExperience(selectedCandidate.experienceYears ?? 0)}
              </div>
              <div>
                <strong>Email:</strong> {selectedCandidate.email || 'N/A'}
              </div>
              <div>
                <strong>Phone:</strong> {selectedCandidate.phone || 'N/A'}
              </div>
            </div>

            {selectedCandidate.bio && (
              <div className="bio-section text-xs">
                <strong>Summary:</strong>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{selectedCandidate.bio}</p>
              </div>
            )}

            {/* Verified Skills */}
            {selectedCandidate.skills && (
              <div className="skills-section text-xs">
                <strong>Verified Skills:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border flex items-center gap-1"
                    >
                      <Check size={10} /> {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recruitment Pipeline Status Changer */}
            <div className="status-changer pt-2 border-t text-xs space-y-1">
              <label className="font-semibold block">Update Candidate Status:</label>
              <select
                value={selectedCandidate.status || CANDIDATE_STATUS.NEW}
                onChange={(e) =>
                  handleStatusChange(
                    selectedCandidate._id || selectedCandidate.id,
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded text-xs"
              >
                <option value={CANDIDATE_STATUS.NEW}>New</option>
                <option value={CANDIDATE_STATUS.SHORTLISTED}>Shortlisted</option>
                <option value={CANDIDATE_STATUS.CONTACTED}>Contacted</option>
                <option value={CANDIDATE_STATUS.INTERVIEW_SCHEDULED}>Interview Scheduled</option>
                <option value={CANDIDATE_STATUS.OFFERED}>Offered</option>
                <option value={CANDIDATE_STATUS.HIRED}>Hired</option>
                <option value={CANDIDATE_STATUS.REJECTED}>Rejected</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployerDiscovery;
