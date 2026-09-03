import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postCurriculumFeedback,
  resetFeedbackStatus,
} from '../../redux/slices/curriculumSlice';

export default function FeedbackForm({ curriculumId = '' }) {
  const dispatch = useDispatch();
  const { feedbackStatus } = useSelector((state) => state.curriculum);

  const [formData, setFormData] = useState({
    curriculumId: curriculumId,
    reviewerName: '',
    organization: '',
    roleTitle: '',
    technicalAlignmentScore: 5,
    practicalDepthScore: 5,
    missingCompetencies: '',
    recommendedModules: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCurriculumFeedback(formData));
  };

  const handleReset = () => {
    dispatch(resetFeedbackStatus());
    setFormData({
      curriculumId: curriculumId || '',
      reviewerName: '',
      organization: '',
      roleTitle: '',
      technicalAlignmentScore: 5,
      practicalDepthScore: 5,
      missingCompetencies: '',
      recommendedModules: '',
      comments: '',
    });
  };

  return (
    <div>
      <h3>Industry Curriculum Feedback Form</h3>
      <p>Submit feedback on syllabus alignment with emerging workplace competencies.</p>

      {feedbackStatus.success && (
        <div style={{ color: 'green', marginBottom: '1rem' }}>
          <strong>Feedback submitted successfully!</strong>
          <button type="button" onClick={handleReset} style={{ marginLeft: '1rem' }}>
            Submit Another Feedback
          </button>
        </div>
      )}

      {feedbackStatus.error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          <strong>Submission Error: </strong>
          <span>{feedbackStatus.error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="curriculumId">Curriculum ID / Code: </label>
          <input
            id="curriculumId"
            type="text"
            name="curriculumId"
            value={formData.curriculumId}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="reviewerName">Reviewer Name: </label>
          <input
            id="reviewerName"
            type="text"
            name="reviewerName"
            value={formData.reviewerName}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="organization">Organization / Employer: </label>
          <input
            id="organization"
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="roleTitle">Target Industry Role: </label>
          <input
            id="roleTitle"
            type="text"
            name="roleTitle"
            value={formData.roleTitle}
            onChange={handleChange}
            placeholder="e.g. Cloud Engineer, Data Analyst"
            required
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="technicalAlignmentScore">
            Technical Skill Alignment (1-10): {formData.technicalAlignmentScore}
          </label>
          <br />
          <input
            id="technicalAlignmentScore"
            type="range"
            min="1"
            max="10"
            name="technicalAlignmentScore"
            value={formData.technicalAlignmentScore}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="practicalDepthScore">
            Practical / Lab Depth (1-10): {formData.practicalDepthScore}
          </label>
          <br />
          <input
            id="practicalDepthScore"
            type="range"
            min="1"
            max="10"
            name="practicalDepthScore"
            value={formData.practicalDepthScore}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="missingCompetencies">Missing / Outdated Competencies: </label>
          <br />
          <textarea
            id="missingCompetencies"
            name="missingCompetencies"
            rows="3"
            cols="40"
            value={formData.missingCompetencies}
            onChange={handleChange}
            placeholder="e.g. Docker containerization missing, need more AWS cloud deployment labs"
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="recommendedModules">Recommended Modules or Certifications: </label>
          <br />
          <textarea
            id="recommendedModules"
            name="recommendedModules"
            rows="3"
            cols="40"
            value={formData.recommendedModules}
            onChange={handleChange}
            placeholder="e.g. Add Kubernetes fundamentals, Spring Boot security"
          />
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label htmlFor="comments">Additional Qualitative Feedback: </label>
          <br />
          <textarea
            id="comments"
            name="comments"
            rows="3"
            cols="40"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button
            type="submit"
            disabled={feedbackStatus.submitting}
          >
            {feedbackStatus.submitting ? 'Submitting Feedback...' : 'Submit Curriculum Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
}
