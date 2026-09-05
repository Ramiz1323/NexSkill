import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postCurriculumFeedback,
  resetFeedbackStatus,
} from '../../redux/slices/curriculumSlice';
import Card from '../common/Card';
import Button from '../common/Button';
import {
  MessageSquareText,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  Briefcase,
  Layers,
  RotateCcw,
  Star
} from 'lucide-react';

export default function FeedbackForm({ curriculumId = 'CURR-CLOUD-AI-101' }) {
  const dispatch = useDispatch();
  const { feedbackStatus = { submitting: false, success: false, error: null } } = useSelector(
    (state) => state.curriculum
  );

  const [formData, setFormData] = useState({
    curriculumId: curriculumId || 'CURR-CLOUD-AI-101',
    reviewerName: '',
    organization: '',
    roleTitle: '',
    technicalAlignmentScore: 8,
    practicalDepthScore: 9,
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
      curriculumId: curriculumId || 'CURR-CLOUD-AI-101',
      reviewerName: '',
      organization: '',
      roleTitle: '',
      technicalAlignmentScore: 8,
      practicalDepthScore: 9,
      missingCompetencies: '',
      recommendedModules: '',
      comments: '',
    });
  };

  return (
    <Card className="p-6 sm:p-8 space-y-6 border border-slate-200 shadow-sm rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-1.5">
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Industry Curriculum Feedback Channel</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Industry Curriculum Feedback & Alignment Audit
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit expert evaluation on syllabus alignment with emerging enterprise workplace competencies.
          </p>
        </div>
        {feedbackStatus.success && (
          <Button variant="secondary" size="sm" onClick={handleReset} className="flex items-center gap-1.5 text-xs font-bold">
            <RotateCcw className="w-3.5 h-3.5" /> Submit Another Audit
          </Button>
        )}
      </div>

      {feedbackStatus.success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thank you! Your curriculum audit feedback has been recorded into the adaptive curriculum engine.</span>
          </div>
        </div>
      )}

      {feedbackStatus.error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span><strong>Submission Error:</strong> {feedbackStatus.error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Reviewer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="curriculumId" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" /> Curriculum ID / Track
            </label>
            <input
              id="curriculumId"
              type="text"
              name="curriculumId"
              value={formData.curriculumId}
              onChange={handleChange}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none font-mono"
              placeholder="e.g. CURR-CLOUD-AI-101"
              required
            />
          </div>

          <div>
            <label htmlFor="reviewerName" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" /> Reviewer Name / Lead
            </label>
            <input
              id="reviewerName"
              type="text"
              name="reviewerName"
              value={formData.reviewerName}
              onChange={handleChange}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
              placeholder="e.g. Dr. Rajesh Kulkarni / Industry Mentor"
              required
            />
          </div>

          <div>
            <label htmlFor="organization" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-600" /> Corporate Employer / Partner
            </label>
            <input
              id="organization"
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
              placeholder="e.g. AWS Academy / Microsoft / TCS"
              required
            />
          </div>

          <div>
            <label htmlFor="roleTitle" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Target Industry Job Role
            </label>
            <input
              id="roleTitle"
              type="text"
              name="roleTitle"
              value={formData.roleTitle}
              onChange={handleChange}
              placeholder="e.g. Full-Stack AI Engineer, Cloud Architect"
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
              required
            />
          </div>
        </div>

        {/* Section 2: Interactive Rating Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Rating 1: Technical Skill Alignment */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Technical Skill Alignment
              </span>
              <span className="badge-indigo px-2.5 py-0.5 rounded-full text-xs font-extrabold">
                {formData.technicalAlignmentScore} / 10 Score
              </span>
            </div>
            <input
              id="technicalAlignmentScore"
              type="range"
              min="1"
              max="10"
              name="technicalAlignmentScore"
              value={formData.technicalAlignmentScore}
              onChange={handleChange}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
              <span>1 (Theoretical Only)</span>
              <span>5 (Moderate)</span>
              <span className="text-indigo-600 font-bold">10 (Industry Ready)</span>
            </div>
          </div>

          {/* Rating 2: Practical Lab Depth */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Practical Lab & Hands-on Depth
              </span>
              <span className="badge-emerald px-2.5 py-0.5 rounded-full text-xs font-extrabold">
                {formData.practicalDepthScore} / 10 Score
              </span>
            </div>
            <input
              id="practicalDepthScore"
              type="range"
              min="1"
              max="10"
              name="practicalDepthScore"
              value={formData.practicalDepthScore}
              onChange={handleChange}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
              <span>1 (No Sandbox Labs)</span>
              <span>5 (Standard Exercises)</span>
              <span className="text-emerald-600 font-bold">10 (Production Capstone)</span>
            </div>
          </div>
        </div>

        {/* Section 3: Qualitative Feedback Textareas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="missingCompetencies" className="block text-xs font-bold text-slate-700 mb-1.5">
              Missing / Outdated Industry Competencies
            </label>
            <textarea
              id="missingCompetencies"
              name="missingCompetencies"
              rows="3"
              value={formData.missingCompetencies}
              onChange={handleChange}
              placeholder="e.g. Docker containerization missing, need more AWS cloud deployment labs and CI/CD pipelines"
              className="w-full p-3 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none leading-relaxed"
            />
          </div>

          <div>
            <label htmlFor="recommendedModules" className="block text-xs font-bold text-slate-700 mb-1.5">
              Recommended Modules or Certifications
            </label>
            <textarea
              id="recommendedModules"
              name="recommendedModules"
              rows="3"
              value={formData.recommendedModules}
              onChange={handleChange}
              placeholder="e.g. Add Kubernetes cluster fundamentals, Spring Boot security, and LangChain evaluation rubrics"
              className="w-full p-3 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none leading-relaxed"
            />
          </div>
        </div>

        <div>
          <label htmlFor="comments" className="block text-xs font-bold text-slate-700 mb-1.5">
            Additional Qualitative Guidance & Pedagogical Notes
          </label>
          <textarea
            id="comments"
            name="comments"
            rows="2"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Provide any additional hiring benchmark observations or recommended project guidelines..."
            className="w-full p-3 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none leading-relaxed"
          />
        </div>

        {/* Form Submit Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={feedbackStatus.submitting}
            className="flex items-center gap-2 text-xs font-bold px-6 py-3 shadow-md shadow-indigo-500/20"
          >
            <Send className="w-4 h-4" />
            {feedbackStatus.submitting ? 'Submitting Feedback...' : 'Submit Curriculum Audit'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
