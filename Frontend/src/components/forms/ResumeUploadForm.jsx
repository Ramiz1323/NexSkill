import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzeResume, clearResumeError } from '../../redux/slices/resumeSlice';
import Button from '../common/Button';
import { UploadCloud, FileText, AlertCircle, Sparkles } from 'lucide-react';

const ResumeUploadForm = () => {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.resume);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (validationError) setValidationError('');
      if (error) dispatch(clearResumeError());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setValidationError('Please select a resume file (PDF or DOCX).');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    if (targetRole) {
      formData.append('targetRole', targetRole);
    }

    dispatch(analyzeResume(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="app-card p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <UploadCloud className="w-5 h-5 text-indigo-600" />
        <h3 className="text-base font-bold text-slate-900">Upload Candidate Resume for ATS Diagnostics</h3>
      </div>

      {(validationError || error) && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{validationError || error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="resumeFile" className="text-xs font-bold text-slate-700">
            Select Resume Document (PDF, DOCX)
          </label>
          <input
            type="file"
            id="resumeFile"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer p-2 rounded-xl bg-slate-50 border border-slate-200"
          />
          {file && (
            <p className="text-xs text-indigo-600 font-semibold flex items-center gap-1 mt-1">
              <FileText className="w-3.5 h-3.5" /> Selected: {file.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="targetRole" className="text-xs font-bold text-slate-700">
            Target Industry Role (Optional)
          </label>
          <input
            type="text"
            id="targetRole"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Full-Stack Engineer, AI Platform Specialist"
            className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          disabled={loading || !file}
          variant="primary"
          icon={Sparkles}
          className="w-full sm:w-auto"
        >
          {loading ? 'Analyzing Resume...' : 'Analyze Resume'}
        </Button>
      </div>
    </form>
  );
};

export default ResumeUploadForm;
