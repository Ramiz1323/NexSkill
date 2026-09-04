import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTrainerPrograms,
  fetchTrainerProgramDetails,
  enrollTrainerProgram,
  fetchTrainerCertifications,
  setTrainerFilters,
  clearTrainerFilters,
  clearSelectedProgram,
  clearTrainerError,
  selectTrainerPrograms,
  selectSelectedProgram,
  selectTrainerCertifications,
  selectEnrolledPrograms,
  selectTrainerFilters,
  selectTrainerLoading,
  selectTrainerActionLoading,
  selectTrainerError,
} from '../../redux/slices/trainerSlice';
import { TRAINER_PROGRAM_TYPES } from '../../utils/constants';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import {
  GraduationCap,
  Calendar,
  Building2,
  CheckCircle2,
  Award,
  Clock,
  RotateCcw,
  Search,
  BookOpen,
  Users,
  Sparkles,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';

const TrainerDevelopment = () => {
  const dispatch = useDispatch();

  const programs = useSelector(selectTrainerPrograms);
  const selectedProgram = useSelector(selectSelectedProgram);
  const certifications = useSelector(selectTrainerCertifications);
  const enrolledPrograms = useSelector(selectEnrolledPrograms);
  const filters = useSelector(selectTrainerFilters);
  const loading = useSelector(selectTrainerLoading);
  const actionLoading = useSelector(selectTrainerActionLoading);
  const error = useSelector(selectTrainerError);

  const [searchInput, setSearchInput] = useState(filters.search || '');

  // Fetch programs and certifications on mount and filter changes
  useEffect(() => {
    dispatch(fetchTrainerPrograms(filters));
    dispatch(fetchTrainerCertifications());
  }, [dispatch, filters]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerFilters({ search: searchInput }));
  };

  const handleCategoryChange = (e) => {
    dispatch(setTrainerFilters({ category: e.target.value }));
  };

  const handleModeChange = (e) => {
    dispatch(setTrainerFilters({ mode: e.target.value }));
  };

  const handleResetFilters = () => {
    setSearchInput('');
    dispatch(clearTrainerFilters());
  };

  const handleViewProgram = (programId) => {
    dispatch(fetchTrainerProgramDetails(programId));
  };

  const handleEnroll = (programId) => {
    dispatch(enrollTrainerProgram(programId));
  };

  const getModeBadge = (mode = '') => {
    const m = mode.toLowerCase();
    if (m.includes('online')) {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        dot: 'bg-emerald-500',
        label: mode
      };
    }
    if (m.includes('hybrid')) {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
        dot: 'bg-amber-500',
        label: mode
      };
    }
    if (m.includes('on-site') || m.includes('onsite')) {
      return {
        bg: 'bg-sky-50 text-sky-700 border-sky-200/80',
        dot: 'bg-sky-500',
        label: mode
      };
    }
    return {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
      label: mode || 'Cohort'
    };
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Industry-Driven Trainer Development</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Train-the-Trainer Faculty Development Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Faculty upskilling programs, industry certification tracks, and pedagogy bootcamps aligned to job market demand.
          </p>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="p-4 border border-rose-200 bg-rose-50 text-rose-700 rounded-2xl flex justify-between items-center text-xs">
          <span>{error}</span>
          <Button variant="secondary" size="sm" onClick={() => dispatch(clearTrainerError())}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Filter Bar */}
      <Card className="p-4 sm:p-5 space-y-3.5">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search programs by tech stack or topic (e.g. AI, Cloud, Embedded Systems)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            />
          </div>
          <Button type="submit" variant="primary" size="sm" className="flex items-center gap-1.5 px-4 font-bold">
            <Search size={14} /> Search
          </Button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-600">
              Program Type
            </label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-slate-50 focus:bg-white text-slate-800 outline-none cursor-pointer"
            >
              <option value="">All Program Types</option>
              {TRAINER_PROGRAM_TYPES &&
                Object.entries(TRAINER_PROGRAM_TYPES).map(([key, label]) => (
                  <option key={key} value={label}>
                    {label}
                  </option>
                ))}
            </select>
          </div>

          {/* Delivery Mode Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-600">
              Delivery Mode
            </label>
            <select
              value={filters.mode}
              onChange={handleModeChange}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-slate-50 focus:bg-white text-slate-800 outline-none cursor-pointer"
            >
              <option value="">All Delivery Modes</option>
              <option value="Online">Online / Self-Paced</option>
              <option value="Hybrid">Hybrid Cohort</option>
              <option value="On-site">On-site Industry Workshop</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetFilters}
              className="w-full py-2.5 flex items-center justify-center gap-1.5 font-bold text-xs"
            >
              <RotateCcw size={14} /> Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Program Catalog Grid */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Available Faculty Upskilling Programs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accredited courses with direct industry certifications for college professors and instructors.
            </p>
          </div>
          <span className="text-xs text-slate-600 font-bold bg-slate-100 px-3 py-1 rounded-full shrink-0">
            {programs.length} program{programs.length === 1 ? '' : 's'} available
          </span>
        </div>

        {loading ? (
          <Loader message="Loading industry programs..." />
        ) : programs.length === 0 ? (
          <Card className="p-8 text-center space-y-2">
            <BookOpen size={32} className="mx-auto text-slate-400" />
            <h3 className="text-md font-semibold text-slate-800">No programs found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search criteria or delivery mode filters.
            </p>
            <Button variant="secondary" size="sm" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {programs.map((program) => {
              const programId = program._id || program.id;
              const isEnrolled =
                program.isEnrolled ||
                enrolledPrograms.some((ep) => ep._id === programId || ep.id === programId);
              const modeBadge = getModeBadge(program.mode);

              return (
                <div
                  key={programId}
                  className="group relative bg-white border border-slate-200/90 hover:border-indigo-300 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-50/70 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex flex-col flex-1">
                    {/* Header Badges: Category & Mode */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 min-h-[1.75rem]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{program.category || 'Faculty Upskilling'}</span>
                      </span>
                      {program.mode && (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border ${modeBadge.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${modeBadge.dot}`} />
                          <span>{modeBadge.label}</span>
                        </span>
                      )}
                    </div>

                    {/* Program Title */}
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2 min-h-[3.75rem] flex items-start">
                      {program.title}
                    </h3>

                    {/* Partner Pill */}
                    <div className="min-h-[2.5rem] flex items-center mb-3">
                      {program.partner ? (
                        <div className="w-full flex items-center gap-2 p-2 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs font-bold text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span className="truncate">Partner: <strong className="text-indigo-900">{program.partner}</strong></span>
                        </div>
                      ) : (
                        <div className="w-full flex items-center gap-2 p-2 rounded-xl bg-slate-50/50 border border-transparent text-xs text-slate-400">
                          <Building2 className="w-3.5 h-3.5 opacity-50 shrink-0" />
                          <span>Partner: Industry Alliance</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                      {program.description}
                    </p>

                    {/* Metadata Footer Bar */}
                    <div className="pt-3.5 pb-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      {program.duration && (
                        <span className="flex items-center gap-1.5 font-bold text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-indigo-600" /> {program.duration}
                        </span>
                      )}
                      {program.seats && (
                        <span className="flex items-center gap-1.5 text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
                          <Users className="w-3.5 h-3.5 text-emerald-600" /> {program.seats} Seats Open
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Program Card Actions */}
                  <div className="flex gap-2.5 pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewProgram(programId)}
                      className="flex-1 text-xs font-bold py-2.5 border-slate-200 hover:bg-slate-100"
                    >
                      View Syllabus
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={isEnrolled || actionLoading}
                      onClick={() => handleEnroll(programId)}
                      className="flex-1 text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/15"
                    >
                      {isEnrolled ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Enrolled
                        </>
                      ) : (
                        'Enroll Faculty'
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Enrolled Programs & Certification Tracker Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Enrolled Programs */}
        <Card className="p-5 sm:p-6 space-y-3.5 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-600" /> My Enrolled Programs ({enrolledPrograms.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-3">
              Active tracks and cohorts currently in progress.
            </p>
            {enrolledPrograms.length === 0 ? (
              <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl text-center space-y-1">
                <p className="text-xs font-semibold text-slate-500">
                  You are not currently enrolled in any faculty upskilling cohorts.
                </p>
                <p className="text-[11px] text-slate-400">
                  Select a program above to enroll and start your track.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {enrolledPrograms.map((item, idx) => (
                  <div key={idx} className="p-3.5 border border-slate-200/90 bg-slate-50/90 rounded-2xl text-xs flex items-center justify-between gap-3 hover:border-indigo-200 transition-all">
                    <div className="min-w-0 flex-1">
                      <strong className="text-slate-900 font-bold block text-sm truncate">{item.title || `Program #${item.id || item._id || idx + 1}`}</strong>
                      <p className="text-slate-500 text-xs mt-0.5 truncate">Status: <span className="font-semibold text-indigo-600">In Progress</span></p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Active</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Industry Certifications */}
        <Card className="p-5 sm:p-6 space-y-3.5 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <Award size={18} className="text-amber-500" /> Faculty Industry Certifications ({certifications.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-3">
              Verified badges accredited by tech alliance partners.
            </p>
            {certifications.length === 0 ? (
              <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl text-center space-y-1">
                <p className="text-xs font-semibold text-slate-500">
                  No certifications logged yet.
                </p>
                <p className="text-[11px] text-slate-400">
                  Complete an accredited industry program to earn recognized credentials.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-3.5 border border-slate-200/90 bg-slate-50/90 rounded-2xl text-xs flex items-center justify-between gap-3 hover:border-indigo-200 transition-all">
                    <div className="min-w-0 flex-1">
                      <strong className="text-slate-900 font-bold block text-sm truncate">{cert.name || cert.title}</strong>
                      <p className="text-slate-500 text-xs mt-0.5 truncate">Issued by: <strong className="text-slate-700">{cert.issuer || 'Industry Partner'}</strong></p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-extrabold shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{cert.status || 'Verified'}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* Program Details & Syllabus Modal */}
      {selectedProgram && (
        <Modal
          isOpen={Boolean(selectedProgram)}
          onClose={() => dispatch(clearSelectedProgram())}
          title={selectedProgram.title || 'Program Syllabus & Details'}
          subtitle={`Accredited by ${selectedProgram.partner || 'Industry Alliance'}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 pt-1">
            {actionLoading && <Loader message="Loading syllabus..." />}

            {/* Banner Meta */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category</span>
                <p className="font-extrabold text-xs text-indigo-700">{selectedProgram.category || 'Faculty Upskilling'}</p>
              </div>
              {selectedProgram.partner && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Industry Partner</span>
                  <p className="font-bold text-xs text-slate-800">{selectedProgram.partner}</p>
                </div>
              )}
              {selectedProgram.duration && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
                  <p className="font-bold text-xs text-slate-800">{selectedProgram.duration}</p>
                </div>
              )}
            </div>

            {selectedProgram.description && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Program Overview
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {selectedProgram.description}
                </p>
              </div>
            )}

            {/* Syllabus Topics */}
            {selectedProgram.syllabus && selectedProgram.syllabus.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Curriculum & Learning Modules
                </span>
                <div className="space-y-1.5">
                  {selectedProgram.syllabus.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {selectedProgram.prerequisites && (
              <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl space-y-0.5">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  Prerequisites
                </span>
                <p className="text-xs text-amber-900 font-medium">{selectedProgram.prerequisites}</p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2.5">
              <Button variant="secondary" size="sm" onClick={() => dispatch(clearSelectedProgram())} className="font-semibold text-xs">
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={
                  selectedProgram.isEnrolled ||
                  enrolledPrograms.some(
                    (ep) =>
                      ep._id === (selectedProgram._id || selectedProgram.id) ||
                      ep.id === (selectedProgram._id || selectedProgram.id)
                  )
                }
                onClick={() => handleEnroll(selectedProgram._id || selectedProgram.id)}
                className="font-bold text-xs"
              >
                {selectedProgram.isEnrolled ? 'Enrolled' : 'Confirm Faculty Enrollment'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TrainerDevelopment;

