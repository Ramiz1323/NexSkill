import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzeResume, clearResumeError } from '../../redux/slices/resumeSlice';
import Button from '../common/Button';

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
    <form onSubmit={handleSubmit} className="resume-upload-form flex flex-col gap-4 border p-4 rounded">
      <h3 className="text-lg font-bold">Upload Resume for ATS Parsing</h3>

      {(validationError || error) && (
        <div className="error-banner p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {validationError || error}
        </div>
      )}

      <div className="form-group flex flex-col gap-1">
        <label htmlFor="resumeFile">Select Resume File (PDF, DOCX)</label>
        <input
          type="file"
          id="resumeFile"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        {file && <p className="text-sm text-gray-600">Selected file: {file.name}</p>}
      </div>

      <div className="form-group flex flex-col gap-1">
        <label htmlFor="targetRole">Target Industry Role (Optional)</label>
        <input
          type="text"
          id="targetRole"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Full Stack Developer, Data Scientist"
          className="border p-2 rounded"
        />
      </div>

      <Button type="submit" disabled={loading || !file} variant="primary">
        {loading ? 'Analyzing Resume...' : 'Analyze Resume'}
      </Button>
    </form>
  );
};

export default ResumeUploadForm;
