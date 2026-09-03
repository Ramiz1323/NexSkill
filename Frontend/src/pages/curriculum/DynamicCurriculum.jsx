import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSkillGapAnalysis,
  fetchAdaptiveLearningPath,
  clearCurriculumErrors,
} from '../../redux/slices/curriculumSlice';
import SkillGapChart from '../../components/charts/SkillGapChart';
import FeedbackForm from '../../components/forms/FeedbackForm';

export default function DynamicCurriculum() {
  const dispatch = useDispatch();
  const {
    skillGapData,
    adaptiveRoadmap,
    loading,
    error,
  } = useSelector((state) => state.curriculum);

  const [studentId, setStudentId] = useState('STUDENT-001');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [chartType, setChartType] = useState('radar');

  useEffect(() => {
    if (studentId && targetRole) {
      dispatch(fetchSkillGapAnalysis({ studentId, targetRole }));
      dispatch(fetchAdaptiveLearningPath({ studentId, targetRole }));
    }
  }, [dispatch, studentId, targetRole]);

  const handleEvaluate = (e) => {
    e.preventDefault();
    dispatch(fetchSkillGapAnalysis({ studentId, targetRole }));
    dispatch(fetchAdaptiveLearningPath({ studentId, targetRole }));
  };

  return (
    <div>
      <header>
        <h1>Dynamic & Adaptive Curriculum</h1>
        <p>Real-time skill gap detection mapped to personalized, industry-aligned learning roadmaps.</p>
      </header>

      {/* Target Evaluation Inputs */}
      <section style={{ marginTop: '1rem' }}>
        <form onSubmit={handleEvaluate}>
          <label htmlFor="student-id">Student / Cohort ID: </label>
          <input
            id="student-id"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />

          <label htmlFor="target-role" style={{ marginLeft: '1rem' }}>Target Industry Role: </label>
          <select
            id="target-role"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="Cloud Architect">Cloud Architect</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </select>

          <button type="submit" style={{ marginLeft: '1rem' }}>
            Evaluate Skill Gap & Roadmap
          </button>
        </form>
      </section>

      {/* Status Indicators */}
      {loading && <div style={{ marginTop: '1rem' }}>Calculating real-time skill gaps and adaptive modules...</div>}
      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>Evaluation Error: </strong>
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

      {/* Skill Gap Analysis & Chart */}
      <section style={{ marginTop: '1.5rem' }}>
        <h2>Skill Gap Analysis: {targetRole}</h2>
        <div>
          <label htmlFor="chart-type">Visualization Mode: </label>
          <select
            id="chart-type"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="radar">Radar Chart</option>
            <option value="bar">Comparative Bar Chart</option>
          </select>
        </div>

        {skillGapData?.overallGap !== undefined && (
          <p>
            <strong>Identified Skill Gap Index: </strong>{skillGapData.overallGap}%
          </p>
        )}

        <div style={{ marginTop: '1rem' }}>
          <SkillGapChart
            data={skillGapData?.skills || skillGapData?.comparisonData || []}
            chartType={chartType}
            skillKey="skill"
            requiredKey="required"
            currentKey="current"
          />
        </div>
      </section>

      {/* Adaptive Learning Roadmap */}
      <section style={{ marginTop: '2rem' }}>
        <h2>Adaptive Learning Roadmap (To Eliminate Gaps)</h2>
        {adaptiveRoadmap && adaptiveRoadmap.length > 0 ? (
          <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Step #</th>
                <th>Focus Module</th>
                <th>Target Competency</th>
                <th>Estimated Hours</th>
                <th>Practical Project / Evidence</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {adaptiveRoadmap.map((step, idx) => (
                <tr key={step.id || idx}>
                  <td>{idx + 1}</td>
                  <td><strong>{step.moduleName || step.title}</strong></td>
                  <td>{step.targetSkill}</td>
                  <td>{step.estimatedHours || 'N/A'}</td>
                  <td>{step.practicalEvidence || step.project}</td>
                  <td>{step.priority || 'High'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No adaptive learning modules currently required or loaded.</p>
        )}
      </section>

      {/* Industry Feedback Section */}
      <section style={{ marginTop: '2.5rem', borderTop: '1px solid #ccc', paddingTop: '1.5rem' }}>
        <FeedbackForm curriculumId={`DYN-${targetRole.toUpperCase().replace(/\s+/g, '-')}`} />
      </section>
    </div>
  );
}
