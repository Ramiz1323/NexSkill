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
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Skill Tag Input */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">Required Skills</label>
            <form onSubmit={handleSkillAdd} className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. React, Python)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
              />
              <Button type="submit" variant="secondary" size="sm">
                Add
              </Button>
            </form>
          </div>

          {/* Min Match Score Filter */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">
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
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">Experience Level</label>
            <select
              value={filters.experienceLevel}
              onChange={handleExperienceChange}
              className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
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
              className="w-full flex items-center justify-center gap-2"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          title={selectedCandidate.name || 'Candidate Profile'}
        >
          <div className="space-y-4 text-xs">
            {actionLoading && <Loader message="Loading profile details..." />}

            <div>
              <p className="font-semibold text-sm text-indigo-600">{selectedCandidate.title || 'Job Ready Candidate'}</p>
              {selectedCandidate.location && (
                <p className="text-slate-500">{selectedCandidate.location}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <strong>Match Score:</strong> {formatScore ? formatScore(selectedCandidate.matchScore ?? 0) : `${selectedCandidate.matchScore || 0}%`}
              </div>
              <div>
                <strong>Experience:</strong> {formatExperience ? formatExperience(selectedCandidate.experienceYears ?? 0) : `${selectedCandidate.experienceYears || 0} yrs`}
              </div>
              <div>
                <strong>Email:</strong> {selectedCandidate.email || 'N/A'}
              </div>
              <div>
                <strong>Phone:</strong> {selectedCandidate.phone || 'N/A'}
              </div>
            </div>

            {selectedCandidate.bio && (
              <div>
                <strong className="text-slate-800">Summary:</strong>
                <p className="text-slate-600 mt-1">{selectedCandidate.bio}</p>
              </div>
            )}

            {/* Verified Skills */}
            {selectedCandidate.skills && (
              <div>
                <strong className="text-slate-800">Verified Skills:</strong>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md flex items-center gap-1 font-medium"
                    >
                      <Check size={10} /> {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recruitment Pipeline Status Changer */}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <label className="font-semibold block text-slate-700">Update Candidate Status:</label>
              <select
                value={selectedCandidate.status || (CANDIDATE_STATUS?.NEW || 'New')}
                onChange={(e) =>
                  handleStatusChange(
                    selectedCandidate._id || selectedCandidate.id,
                    e.target.value
                  )
                }
                className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50"
              >
                <option value="New">New</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Contacted">Contacted</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Offered">Offered</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployerDiscovery;
