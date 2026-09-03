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
    <div className="trainer-development-container p-6 space-y-8">
      {/* Header */}
      <header className="trainer-dev-header">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap size={24} /> Industry-Driven Trainer Development
        </h1>
        <p className="text-sm text-gray-500">
          Faculty upskilling programs, industry certification tracks, and pedagogy bootcamps aligned to job market demand.
        </p>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="error-banner p-4 border border-red-300 bg-red-50 text-red-700 rounded flex justify-between items-center">
          <span>{error}</span>
          <Button variant="secondary" onClick={() => dispatch(clearTrainerError())}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Filter Bar */}
      <Card className="filter-card p-4 space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Search programs by tech stack or topic (e.g. AI, Cloud, Embedded Systems)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
          <Button type="submit" variant="primary" className="flex items-center gap-1">
            <Search size={16} /> Search
          </Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold mb-1">Program Type</label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="">All Program Types</option>
              {Object.entries(TRAINER_PROGRAM_TYPES).map(([key, label]) => (
                <option key={key} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Mode Filter */}
          <div>
            <label className="block text-xs font-semibold mb-1">Delivery Mode</label>
            <select
              value={filters.mode}
              onChange={handleModeChange}
              className="w-full p-2 border rounded text-sm"
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
              onClick={handleResetFilters}
              className="w-full flex items-center justify-center gap-1"
            >
              <RotateCcw size={16} /> Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Program Catalog Grid */}
      <section className="programs-catalog-section space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Available Faculty Upskilling Programs</h2>
          <span className="text-xs text-gray-500">
            Showing {programs.length} program{programs.length === 1 ? '' : 's'}
          </span>
        </div>

        {loading ? (
          <Loader message="Loading industry programs..." />
        ) : programs.length === 0 ? (
          <Card className="p-8 text-center space-y-2">
            <BookOpen size={32} className="mx-auto text-gray-400" />
            <h3 className="text-md font-semibold">No programs found</h3>
            <p className="text-xs text-gray-500">
              Try adjusting your search criteria or delivery mode filters.
            </p>
            <Button variant="secondary" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </Card>
        ) : (
          <div className="programs-grid grid grid-cols-1 md:grid-cols-3 gap-4">
            {programs.map((program) => {
              const programId = program._id || program.id;
              const isEnrolled =
                program.isEnrolled ||
                enrolledPrograms.some((ep) => ep._id === programId || ep.id === programId);

              return (
                <Card
                  key={programId}
                  className="program-card p-4 border rounded space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="badge px-2 py-0.5 text-xs font-bold border rounded">
                        {program.category || 'Upskilling'}
                      </span>
                      {program.mode && (
                        <span className="text-xs text-gray-500 font-semibold">{program.mode}</span>
                      )}
                    </div>

                    <h3 className="font-bold text-base">{program.title}</h3>

                    {program.partner && (
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Building size={14} /> Partner: <strong>{program.partner}</strong>
                      </p>
                    )}

                    <p className="text-xs text-gray-600 dark:text-gray-300">{program.description}</p>

                    <div className="meta-details text-xs space-y-1 text-gray-500 pt-2 border-t">
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
                  <div className="card-actions flex gap-2 pt-3 border-t">
                    <Button
                      variant="secondary"
                      onClick={() => handleViewProgram(programId)}
                      className="flex-1 text-xs"
                    >
                      View Syllabus
                    </Button>
                    <Button
                      variant="primary"
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
      <section className="enrolled-and-certifications-section grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enrolled Programs */}
        <Card className="p-4 space-y-3">
          <h3 className="font-bold text-base flex items-center gap-2">
            <BookOpen size={18} /> My Enrolled Programs ({enrolledPrograms.length})
          </h3>
          {enrolledPrograms.length === 0 ? (
            <p className="text-xs text-gray-400 py-4">
              You are not currently enrolled in any faculty upskilling cohorts.
            </p>
          ) : (
            <div className="enrolled-list space-y-2">
              {enrolledPrograms.map((item, idx) => (
                <div key={idx} className="enrolled-item p-2 border rounded text-xs flex justify-between items-center">
                  <div>
                    <strong>{item.title || `Program #${item.id || item._id || idx + 1}`}</strong>
                    <p className="text-gray-400">Status: In Progress</p>
                  </div>
                  <span className="badge px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-2xs">
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Industry Certifications */}
        <Card className="p-4 space-y-3">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Award size={18} /> Faculty Industry Certifications ({certifications.length})
          </h3>
          {certifications.length === 0 ? (
            <p className="text-xs text-gray-400 py-4">
              No certifications logged. Complete an accredited industry program to earn recognized credentials.
            </p>
          ) : (
            <div className="cert-list space-y-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="cert-item p-2 border rounded text-xs flex justify-between items-center">
                  <div>
                    <strong>{cert.name || cert.title}</strong>
                    <p className="text-gray-400">Issued by: {cert.issuer || 'Industry Partner'}</p>
                  </div>
                  <span className="badge px-2 py-0.5 border rounded text-2xs">
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
          <div className="program-modal-content space-y-4 text-xs">
            {actionLoading && <Loader message="Loading syllabus..." />}

            <div>
              <p className="font-semibold text-sm">{selectedProgram.category}</p>
              {selectedProgram.partner && (
                <p className="text-gray-500">Industry Partner: {selectedProgram.partner}</p>
              )}
            </div>

            {selectedProgram.description && (
              <div>
                <strong>Program Overview:</strong>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{selectedProgram.description}</p>
              </div>
            )}

            {/* Syllabus Topics */}
            {selectedProgram.syllabus && selectedProgram.syllabus.length > 0 && (
              <div className="syllabus-section">
                <strong>Curriculum & Learning Modules:</strong>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-gray-600 dark:text-gray-300">
                  {selectedProgram.syllabus.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {selectedProgram.prerequisites && (
              <div>
                <strong>Prerequisites:</strong>
                <p className="text-gray-500 mt-1">{selectedProgram.prerequisites}</p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="modal-actions pt-3 border-t flex justify-end gap-2">
              <Button variant="secondary" onClick={() => dispatch(clearSelectedProgram())}>
                Close
              </Button>
              <Button
                variant="primary"
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
