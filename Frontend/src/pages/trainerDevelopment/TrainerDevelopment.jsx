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
  Building,
  CheckCircle,
  Award,
  Clock,
  RotateCcw,
  Search,
  BookOpen,
  Users,
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

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Module 9: Industry-Driven Trainer Development</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Train-the-Trainer Faculty Development Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1">
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
      <Card className="p-4 space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Search programs by tech stack or topic (e.g. AI, Cloud, Embedded Systems)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
          />
          <Button type="submit" variant="primary" size="sm" className="flex items-center gap-1">
            <Search size={14} /> Search
          </Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">Program Type</label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
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
            <label className="block text-xs font-semibold mb-1 text-slate-700">Delivery Mode</label>
            <select
              value={filters.mode}
              onChange={handleModeChange}
              className="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
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
              className="w-full flex items-center justify-center gap-1"
            >
              <RotateCcw size={14} /> Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Program Catalog Grid */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Available Faculty Upskilling Programs</h2>
          <span className="text-xs text-slate-500 font-semibold">
            Showing {programs.length} program{programs.length === 1 ? '' : 's'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {programs.map((program) => {
              const programId = program._id || program.id;
              const isEnrolled =
                program.isEnrolled ||
                enrolledPrograms.some((ep) => ep._id === programId || ep.id === programId);

              return (
                <Card
                  key={programId}
                  className="p-5 border border-slate-200 rounded-2xl space-y-3 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="badge-indigo px-2.5 py-0.5 text-xs font-bold rounded-lg">
                        {program.category || 'Upskilling'}
                      </span>
                      {program.mode && (
                        <span className="text-xs text-slate-500 font-semibold">{program.mode}</span>
                      )}
                    </div>

                    <h3 className="font-bold text-base text-slate-900">{program.title}</h3>

                    {program.partner && (
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Building size={14} /> Partner: <strong>{program.partner}</strong>
                      </p>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed">{program.description}</p>

                    <div className="meta-details text-xs space-y-1 text-slate-500 pt-2 border-t border-slate-100">
                      {program.duration && (
                        <div className="flex items-center gap-1">
                          <Clock size={12} /> Duration: {program.duration}
                        </div>
                      )}
                      {program.seats && (
                        <div className="flex items-center gap-1">
                          <Users size={12} /> Available Seats: {program.seats}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Program Card Actions */}
                  <div className="flex gap-2 pt-3 border-t border-slate-100">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewProgram(programId)}
                      className="flex-1 text-xs"
                    >
                      View Syllabus
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={isEnrolled || actionLoading}
                      onClick={() => handleEnroll(programId)}
                      className="flex-1 text-xs flex items-center justify-center gap-1"
                    >
                      {isEnrolled ? (
                        <>
                          <CheckCircle size={14} /> Enrolled
                        </>
                      ) : (
                        'Enroll Faculty'
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Enrolled Programs & Certification Tracker Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enrolled Programs */}
        <Card className="p-5 space-y-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-600" /> My Enrolled Programs ({enrolledPrograms.length})
          </h3>
          {enrolledPrograms.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">
              You are not currently enrolled in any faculty upskilling cohorts.
            </p>
          ) : (
            <div className="space-y-2">
              {enrolledPrograms.map((item, idx) => (
                <div key={idx} className="p-3 border border-slate-200 bg-slate-50 rounded-xl text-xs flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900">{item.title || `Program #${item.id || item._id || idx + 1}`}</strong>
                    <p className="text-slate-500 mt-0.5">Status: In Progress</p>
                  </div>
                  <span className="badge-emerald px-2.5 py-0.5 rounded-full text-xs font-bold">
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Industry Certifications */}
        <Card className="p-5 space-y-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Award size={18} className="text-amber-500" /> Faculty Industry Certifications ({certifications.length})
          </h3>
          {certifications.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">
              No certifications logged. Complete an accredited industry program to earn recognized credentials.
            </p>
          ) : (
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-3 border border-slate-200 bg-slate-50 rounded-xl text-xs flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900">{cert.name || cert.title}</strong>
                    <p className="text-slate-500 mt-0.5">Issued by: {cert.issuer || 'Industry Partner'}</p>
                  </div>
                  <span className="badge-indigo px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {cert.status || 'Verified'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Program Details & Syllabus Modal */}
      {selectedProgram && (
        <Modal
          isOpen={Boolean(selectedProgram)}
          onClose={() => dispatch(clearSelectedProgram())}
          title={selectedProgram.title || 'Program Syllabus & Details'}
        >
          <div className="space-y-4 text-xs">
            {actionLoading && <Loader message="Loading syllabus..." />}

            <div>
              <p className="font-semibold text-sm text-indigo-600">{selectedProgram.category}</p>
              {selectedProgram.partner && (
                <p className="text-slate-500">Industry Partner: {selectedProgram.partner}</p>
              )}
            </div>

            {selectedProgram.description && (
              <div>
                <strong className="text-slate-800">Program Overview:</strong>
                <p className="text-slate-600 mt-1">{selectedProgram.description}</p>
              </div>
            )}

            {/* Syllabus Topics */}
            {selectedProgram.syllabus && selectedProgram.syllabus.length > 0 && (
              <div>
                <strong className="text-slate-800">Curriculum & Learning Modules:</strong>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-600">
                  {selectedProgram.syllabus.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {selectedProgram.prerequisites && (
              <div>
                <strong className="text-slate-800">Prerequisites:</strong>
                <p className="text-slate-500 mt-1">{selectedProgram.prerequisites}</p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => dispatch(clearSelectedProgram())}>
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
              >
                {selectedProgram.isEnrolled ? 'Enrolled' : 'Confirm Enrollment'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TrainerDevelopment;
