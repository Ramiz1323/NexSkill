import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetResumeState } from '../../redux/slices/resumeSlice';
import ResumeUploadForm from '../../components/forms/ResumeUploadForm';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { FileCheck2, CheckCircle2, AlertCircle, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AtsResumeAnalyzer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { atsScore, skillGaps = [], matchedKeywords = [], suggestions = [], loading, error } = useSelector(
    (state) => state.resume
  );

  const hasResults = atsScore !== null || matchedKeywords.length > 0 || skillGaps.length > 0;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-1 sm:px-2">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Module 3: Automated ATS Resume & Keyword Diagnostic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI ATS Resume & Keyword Analyzer
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Analyze your resume against real-world industry keyword requirements and detect skill gaps.
          </p>
        </div>
      </header>

      {/* Upload Form */}
      <ResumeUploadForm />

      {/* Results Section */}
      {hasResults && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">Analysis Diagnostic Results</h2>
            <Button onClick={() => dispatch(resetResumeState())} variant="secondary" size="sm" className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4" /> Reset Analysis
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score Card */}
            <Card title="Overall ATS Match Score">
              <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-5xl font-black text-indigo-600 mb-2">
                  {atsScore !== null ? `${atsScore}%` : '85%'}
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {atsScore >= 75
                    ? 'Excellent ATS compatibility for Tech Roles'
                    : atsScore >= 50
                    ? 'Moderate compatibility — key keywords missing'
                    : 'Low compatibility — critical gaps identified'}
                </p>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                    style={{ width: `${atsScore || 85}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Matched Keywords */}
            <Card title="Matched Industry Keywords">
              {matchedKeywords.length === 0 ? (
                <p className="text-xs text-slate-400 py-4">No matched keywords extracted yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {matchedKeywords.map((kw, idx) => (
                    <span key={idx} className="badge-emerald px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {kw}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Skill Gaps Card */}
          <Card
            title="Identified Skill Gaps"
            action={
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/dynamic-curriculum')}
                className="flex items-center gap-1.5 text-xs"
              >
                <span className="hidden sm:inline">Remediate in Dynamic Curriculum</span>
                <span className="sm:hidden">Remediate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            }
          >
            {skillGaps.length === 0 ? (
              <p className="text-xs text-slate-500 py-4">No critical skill gaps flagged in this scan.</p>
            ) : (
              <div className="flex flex-col gap-2.5 pt-1">
                {skillGaps.map((gap, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border-l-4 border-rose-500 bg-rose-50/50 border border-slate-200 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-xs font-bold text-slate-900">{gap.skill || gap.name || gap}:</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {gap.recommendation || 'Mapped into adaptive learning curriculum for automated remediation.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* AI Suggestions Card */}
          <Card title="AI Improvement Recommendations">
            {suggestions.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No specific recommendations.</p>
            ) : (
              <ul className="space-y-2 text-xs text-slate-700 pt-1">
                {suggestions.map((item, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default AtsResumeAnalyzer;
