import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetResumeState } from '../../redux/slices/resumeSlice';
import ResumeUploadForm from '../../components/forms/ResumeUploadForm';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const AtsResumeAnalyzer = () => {
  const dispatch = useDispatch();
  const { atsScore, skillGaps, matchedKeywords, suggestions, loading, error } = useSelector(
    (state) => state.resume
  );

  const hasResults = atsScore !== null || matchedKeywords.length > 0 || skillGaps.length > 0;

  return (
    <div className="ats-resume-analyzer flex flex-col gap-6">
      <header className="page-header border-b pb-4">
        <h1 className="text-2xl font-bold">AI ATS Resume Analyzer</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Analyze your resume against real-world industry keyword requirements and detect skill gaps.
        </p>
      </header>

      {/* Upload Form */}
      <ResumeUploadForm />

      {/* Results Section */}
      {hasResults && (
        <div className="analysis-results flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Analysis Results</h2>
            <Button onClick={() => dispatch(resetResumeState())} variant="secondary">
              Clear Results
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Score Card */}
            <Card title="Overall ATS Match Score">
              <div className="score-display text-center p-4">
                <div className="text-5xl font-black text-blue-600 mb-2">
                  {atsScore !== null ? `${atsScore}%` : 'N/A'}
                </div>
                <p className="text-sm text-gray-600">
                  {atsScore >= 75
                    ? 'Excellent ATS compatibility'
                    : atsScore >= 50
                    ? 'Moderate compatibility - improvements needed'
                    : 'Low compatibility - key gaps identified'}
                </p>
              </div>
            </Card>

            {/* Matched Keywords */}
            <Card title="Matched Industry Keywords">
              {matchedKeywords.length === 0 ? (
                <p className="text-sm text-gray-500">No matched keywords found.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {matchedKeywords.map((kw, idx) => (
                    <li key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      ✓ {kw}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>

          {/* Skill Gaps Card */}
          <Card title="Identified Skill Gaps">
            {skillGaps.length === 0 ? (
              <p className="text-sm text-gray-500">No critical skill gaps flagged.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {skillGaps.map((gap, idx) => (
                  <li key={idx} className="border-l-4 border-red-500 pl-3 py-1 text-sm bg-red-50 dark:bg-gray-800">
                    <strong className="text-red-700 dark:text-red-400">{gap.skill || gap.name || gap}:</strong>{' '}
                    {gap.recommendation || 'Consider adding certified learning modules.'}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* AI Suggestions Card */}
          <Card title="AI Improvement Recommendations">
            {suggestions.length === 0 ? (
              <p className="text-sm text-gray-500">No specific recommendations.</p>
            ) : (
              <ul className="list-disc list-inside flex flex-col gap-1 text-sm">
                {suggestions.map((item, idx) => (
                  <li key={idx}>{item}</li>
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
