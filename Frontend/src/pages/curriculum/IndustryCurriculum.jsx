import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIndustryCurriculums,
  setSelectedCurriculum,
  clearCurriculumErrors,
} from '../../redux/slices/curriculumSlice';

export default function IndustryCurriculum() {
  const dispatch = useDispatch();
  const {
    curriculums,
    selectedCurriculum,
    loading,
    error,
  } = useSelector((state) => state.curriculum);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchIndustryCurriculums({ search: searchQuery, role: roleFilter }));
  }, [dispatch, searchQuery, roleFilter]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const handleSelectCurriculum = (curriculum) => {
    dispatch(setSelectedCurriculum(curriculum));
  };

  return (
    <div>
      <header>
        <h1>Industry-Aligned Curriculum Catalog</h1>
        <p>Verified, industry-standard learning tracks mapped to real-time employer job specifications.</p>
      </header>

      {/* Filter and Search Bar */}
      <section style={{ marginTop: '1rem' }}>
        <div>
          <label htmlFor="search-curriculum">Search Track / Skill: </label>
          <input
            id="search-curriculum"
            type="text"
            placeholder="e.g. Full Stack, Cloud, Data..."
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <label htmlFor="role-filter" style={{ marginLeft: '1rem' }}>Target Role: </label>
          <select id="role-filter" value={roleFilter} onChange={handleRoleChange}>
            <option value="All">All Roles</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Cloud Architect">Cloud Architect</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </select>

          <button
            type="button"
            onClick={() => dispatch(fetchIndustryCurriculums({ search: searchQuery, role: roleFilter }))}
            style={{ marginLeft: '1rem' }}
          >
            Search
          </button>
        </div>
      </section>

      {/* Status Feedback */}
      {loading && <div style={{ marginTop: '1rem' }}>Loading industry curriculum tracks...</div>}
      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>Error: </strong>
          <span>{error}</span>
          <button
            type="button"
            onClick={() => dispatch(clearCurriculumErrors())}
            style={{ marginLeft: '0.5rem' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Curriculum Catalog Grid / Table */}
      <section style={{ marginTop: '1.5rem' }}>
        <h2>Available Industry Curriculum Programs</h2>
        {curriculums && curriculums.length > 0 ? (
          <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Curriculum Title</th>
                <th>Target Industry Role</th>
                <th>Accreditation / Partner</th>
                <th>Duration (Hours)</th>
                <th>Alignment Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {curriculums.map((item) => (
                <tr key={item.id || item._id}>
                  <td>
                    <strong>{item.title}</strong>
                  </td>
                  <td>{item.targetRole}</td>
                  <td>{item.partnerOrganization || 'Standard'}</td>
                  <td>{item.totalHours || 'N/A'}</td>
                  <td>{item.alignmentScore ? `${item.alignmentScore}%` : 'N/A'}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleSelectCurriculum(item)}
                    >
                      View Modules & Syllabus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No industry curriculums found matching criteria.</p>
        )}
      </section>

      {/* Selected Curriculum Detailed View */}
      {selectedCurriculum && (
        <section style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h2>Track Details: {selectedCurriculum.title}</h2>
          <p>
            <strong>Target Role: </strong>{selectedCurriculum.targetRole}
          </p>
          <p>
            <strong>Description: </strong>{selectedCurriculum.description}
          </p>

          <h3>Core Modules & Syllabus Topics</h3>
          {selectedCurriculum.modules && selectedCurriculum.modules.length > 0 ? (
            <ul>
              {selectedCurriculum.modules.map((mod, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  <strong>{mod.name || `Module ${idx + 1}`}: </strong>
                  <span>{mod.summary || mod.description}</span>
                  {mod.skillsCovered && (
                    <p style={{ margin: '0.2rem 0' }}>
                      <em>Skills: {mod.skillsCovered.join(', ')}</em>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Module breakdown pending for this track.</p>
          )}

          <button
            type="button"
            onClick={() => dispatch(setSelectedCurriculum(null))}
            style={{ marginTop: '0.5rem' }}
          >
            Close Details
          </button>
        </section>
      )}
    </div>
  );
}
