import React, { useState, useEffect } from 'react';
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
  Building2,
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
    <div className="space-y-6 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Employer Discovery Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vetted Talent Discovery Panel
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Source job-ready talent matching industry demands and verified AI skill readiness scores.
          </p>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="p-4 border border-rose-200 bg-rose-50 text-rose-700 rounded-2xl flex justify-between items-center text-xs">
          <span>{error}</span>
          <Button variant="secondary" size="sm" onClick={() => dispatch(clearEmployerError())}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Search & Filter Controls */}
      <Card className="p-4 space-y-4">
        <div className="flex gap-2 items-center">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates by title, keyword, or name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Skill Tag Input */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">Required Skills</label>
            <form onSubmit={handleSkillAdd} className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. React, Python)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
              />
              <Button type="submit" variant="secondary" size="sm" className="px-3 text-xs font-bold">
                Add
              </Button>
            </form>
          </div>

          {/* Min Match Score Filter - Upgraded UI */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Min Match Score</span>
              <span className="badge-indigo px-2.5 py-0.5 rounded-full text-xs font-extrabold shadow-sm">
                ≥ {filters.minScore}%
              </span>
            </div>
            <div className="relative flex items-center">
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
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
              <button
                type="button"
                onClick={() => dispatch(setEmployerFilters({ minScore: 0 }))}
                className={`hover:text-indigo-600 transition-colors ${filters.minScore === 0 ? 'text-indigo-600 font-bold' : ''}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => dispatch(setEmployerFilters({ minScore: 50 }))}
                className={`hover:text-indigo-600 transition-colors ${filters.minScore === 50 ? 'text-indigo-600 font-bold' : ''}`}
              >
                50%+
              </button>
              <button
                type="button"
                onClick={() => dispatch(setEmployerFilters({ minScore: 75 }))}
                className={`hover:text-indigo-600 transition-colors ${filters.minScore === 75 ? 'text-indigo-600 font-bold' : ''}`}
              >
                75%+
              </button>
              <button
                type="button"
                onClick={() => dispatch(setEmployerFilters({ minScore: 90 }))}
                className={`hover:text-indigo-600 transition-colors ${filters.minScore === 90 ? 'text-indigo-600 font-bold' : ''}`}
              >
                Top 90%
              </button>
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">Experience Level</label>
            <select
              value={filters.experienceLevel}
              onChange={handleExperienceChange}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 font-semibold outline-none cursor-pointer"
            >
              <option value="">All Experience Levels</option>
              {EXPERIENCE_LEVELS && (
                <>
                  <option value={EXPERIENCE_LEVELS.ENTRY}>Entry Level</option>
                  <option value={EXPERIENCE_LEVELS.MID}>Mid Level</option>
                  <option value={EXPERIENCE_LEVELS.SENIOR}>Senior Level</option>
                  <option value={EXPERIENCE_LEVELS.LEAD}>Lead / Executive</option>
                </>
              )}
            </select>
          </div>

          {/* Reset Filters */}
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetFilters}
              className="w-full p-2.5 flex items-center justify-center gap-2 text-xs font-bold"
            >
              <RotateCcw size={14} /> Reset Filters
            </Button>
          </div>
        </div>

        {/* Selected Skill Badges */}
        {filters.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-semibold self-center text-slate-600">Active Skills:</span>
            {filters.skills.map((skill) => (
              <span
                key={skill}
                className="badge-indigo px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 font-bold"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleSkillRemove(skill)}
                  className="font-bold cursor-pointer hover:text-rose-600 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Results Meta */}
      <div className="flex justify-between items-center text-xs text-slate-600">
        <span>
          Showing <strong>{candidates.length}</strong> candidate{candidates.length === 1 ? '' : 's'}
          {pagination.total > 0 && ` of ${pagination.total}`}
        </span>
      </div>

      {/* Candidates List / Grid */}
      {loading ? (
        <Loader message="Searching candidates across industry talent pool..." />
      ) : candidates.length === 0 ? (
        <Card className="p-8 text-center space-y-2">
          <User size={36} className="mx-auto text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-800">No candidates found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search criteria, required skills, or match score threshold.
          </p>
          <Button variant="secondary" size="sm" onClick={handleResetFilters}>
            Clear All Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {candidates.map((candidate) => {
            const candidateId = candidate._id || candidate.id;
            const matchScore = candidate.matchScore ?? candidate.readinessScore ?? 0;

            return (
              <Card
                key={candidateId}
                className="p-5 border border-slate-200 rounded-2xl space-y-3 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{candidate.name || 'Candidate'}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Briefcase size={12} /> {candidate.title || candidate.role || 'Job Ready Candidate'}
                      </p>
                      {candidate.location && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={12} /> {candidate.location}
                        </p>
                      )}
                    </div>
                    <span className="badge-emerald px-2 py-0.5 text-xs font-bold rounded-lg">
                      {formatScore ? formatScore(matchScore) : `${matchScore}%`} Match
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-slate-600 pt-1">
                    <div>
                      <strong>Experience:</strong> {formatExperience ? formatExperience(candidate.experienceYears ?? candidate.experience) : `${candidate.experienceYears || 0} yrs`}
                    </div>
                    <div>
                      <strong>Status:</strong> {formatCandidateStatus ? formatCandidateStatus(candidate.status || CANDIDATE_STATUS?.NEW || 'Active') : (candidate.status || 'Active')}
                    </div>
                  </div>

                  {/* Skills tags */}
                  {candidate.skills && candidate.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {candidate.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 4 && (
                        <span className="text-[11px] text-slate-400 self-center">+{candidate.skills.length - 4} more</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleViewProfile(candidateId)}
                    className="flex-1 text-xs"
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleToggleShortlist(candidateId)}
                    className="text-xs flex items-center gap-1"
                  >
                    <Bookmark size={14} className={candidate.isShortlisted ? 'fill-current text-amber-500' : ''} />
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
        <div className="flex justify-center items-center gap-3 pt-4 text-xs">
          <Button
            variant="secondary"
            size="sm"
            disabled={pagination.page <= 1}
            onClick={() => dispatch(setPage(pagination.page - 1))}
          >
            Previous
          </Button>
          <span className="font-semibold text-slate-700">Page {pagination.page}</span>
          <Button
            variant="secondary"
            size="sm"
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
          title="Candidate Profile & Dossier"
          subtitle="Detailed verification, skills analysis, and recruitment pipeline status"
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 pt-1">
            {actionLoading && <Loader message="Updating candidate status..." />}

            {/* Candidate Header Profile Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-slate-50 to-white border border-indigo-100 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-black text-lg flex items-center justify-center shadow-md shrink-0">
                  {(selectedCandidate.name || 'Candidate')
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    {selectedCandidate.name || 'Candidate Profile'}
                  </h4>
                  <p className="font-bold text-xs text-indigo-600 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    {selectedCandidate.title || 'Job Ready Candidate'}
                  </p>
                  {selectedCandidate.location && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {selectedCandidate.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="self-start sm:self-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold shadow-xs">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Talent
                </span>
              </div>
            </div>

            {/* 4 Primary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Match Score */}
              <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Match Compatibility
                  </span>
                  <strong className="text-base font-black text-indigo-600">
                    {formatScore ? formatScore(selectedCandidate.matchScore ?? 0) : `${selectedCandidate.matchScore || 0}%`}
                  </strong>
                </div>
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Award className="w-4 h-4" />
                </span>
              </div>

              {/* Experience */}
              <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Experience Level
                  </span>
                  <strong className="text-base font-black text-slate-800">
                    {formatExperience ? formatExperience(selectedCandidate.experienceYears ?? 0) : `${selectedCandidate.experienceYears || 0} yrs`}
                  </strong>
                </div>
                <span className="p-2 rounded-lg bg-slate-100 text-slate-600">
                  <User className="w-4 h-4" />
                </span>
              </div>

              {/* Direct Email */}
              <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-xl flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <a
                    href={selectedCandidate.email ? `mailto:${selectedCandidate.email}` : undefined}
                    className="text-xs font-bold text-slate-700 hover:text-indigo-600 truncate block transition-colors"
                  >
                    {selectedCandidate.email || 'N/A'}
                  </a>
                </div>
                <span className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
              </div>

              {/* Phone / Contact */}
              <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-xl flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Contact Phone
                  </span>
                  <a
                    href={selectedCandidate.phone ? `tel:${selectedCandidate.phone}` : undefined}
                    className="text-xs font-bold text-slate-700 hover:text-indigo-600 truncate block transition-colors"
                  >
                    {selectedCandidate.phone || 'N/A'}
                  </a>
                </div>
                <span className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            {selectedCandidate.bio && (
              <div className="p-3.5 bg-slate-50/80 border border-slate-200/70 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Professional Summary
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {selectedCandidate.bio}
                </p>
              </div>
            )}

            {/* Verified Skills */}
            {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Verified Competencies ({selectedCandidate.skills.length})
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Industry Standard Tested
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-indigo-50/90 text-indigo-700 border border-indigo-200/80 rounded-lg flex items-center gap-1.5 font-bold text-xs shadow-2xs"
                    >
                      <Check className="w-3 h-3 text-indigo-600" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recruitment Pipeline Status Changer */}
            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">
                  Recruitment Pipeline Status:
                </label>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  Current: {selectedCandidate.status || 'New'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedCandidate.status || (CANDIDATE_STATUS?.NEW || 'New')}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedCandidate._id || selectedCandidate.id,
                      e.target.value
                    )
                  }
                  className="flex-1 p-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all cursor-pointer"
                >
                  <option value="New">New Candidate</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offered">Offer Extended</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <Button
                  size="sm"
                  variant={selectedCandidate.isShortlisted ? 'primary' : 'outline'}
                  onClick={() => handleToggleShortlist(selectedCandidate._id || selectedCandidate.id)}
                  className="flex items-center gap-1.5 font-bold text-xs shrink-0"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      selectedCandidate.isShortlisted ? 'fill-current' : ''
                    }`}
                  />
                  <span>{selectedCandidate.isShortlisted ? 'Shortlisted' : 'Bookmark'}</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployerDiscovery;
