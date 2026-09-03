import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProgress, addCredentialThunk, clearProgressError } from '../../redux/slices/progressSlice';
import ProgressChart from '../../components/charts/ProgressChart';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const CredentialTracker = () => {
  const dispatch = useDispatch();
  const { credentials, skillProgress, overallProgress, loading, error } = useSelector(
    (state) => state.progress
  );

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
  });

  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (formError) setFormError('');
    if (error) dispatch(clearProgressError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) {
      setFormError('Credential Title and Issuer are required.');
      return;
    }

    dispatch(addCredentialThunk(formData));
    setFormData({ title: '', issuer: '', issueDate: '', credentialUrl: '' });
  };

  return (
    <div className="credential-tracker flex flex-col gap-6">
      <header className="page-header border-b pb-4">
        <h1 className="text-2xl font-bold">Credential & Progress Tracker</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track verified skill progress percentages and log verified industry credentials.
        </p>
      </header>

      {/* Progress Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Overall Progress">
          <div className="text-4xl font-extrabold text-blue-600 p-2">{overallProgress}%</div>
        </Card>
        <Card title="Earned Credentials">
          <div className="text-4xl font-extrabold text-green-600 p-2">{credentials.length}</div>
        </Card>
        <Card title="Skills Analyzed">
          <div className="text-4xl font-extrabold text-indigo-600 p-2">{skillProgress.length}</div>
        </Card>
      </div>

      {/* Recharts Analytics Visualization */}
      <Card title="Skill Proficiency Visualizer">
        {loading ? (
          <p className="p-4 text-center">Loading progress analytics...</p>
        ) : (
          <ProgressChart data={skillProgress} />
        )}
      </Card>

      {/* Add New Credential Form */}
      <Card title="Log New Credential / Certificate">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {(formError || error) && (
            <div className="error-banner p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formError || error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group flex flex-col gap-1">
              <label htmlFor="title">Credential / Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. AWS Certified Developer"
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="form-group flex flex-col gap-1">
              <label htmlFor="issuer">Issuing Organization</label>
              <input
                type="text"
                id="issuer"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="e.g. Amazon Web Services, Coursera"
                className="border p-2 rounded"
                required
              />
            </div>

            <div className="form-group flex flex-col gap-1">
              <label htmlFor="issueDate">Date Issued</label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>

            <div className="form-group flex flex-col gap-1">
              <label htmlFor="credentialUrl">Verification URL (Optional)</label>
              <input
                type="url"
                id="credentialUrl"
                name="credentialUrl"
                value={formData.credentialUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="border p-2 rounded"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} variant="primary">
            {loading ? 'Adding Credential...' : 'Add Credential'}
          </Button>
        </form>
      </Card>

      {/* Earned Credentials List */}
      <Card title="Verified Credentials Wall">
        {credentials.length === 0 ? (
          <p className="text-sm text-gray-500 p-2">No credentials logged yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {credentials.map((cred, idx) => (
              <li key={cred.id || idx} className="border p-3 rounded flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{cred.title}</h4>
                  <p className="text-xs text-gray-600">
                    Issuer: {cred.issuer} {cred.issueDate ? `| Issued: ${cred.issueDate}` : ''}
                  </p>
                </div>
                {cred.credentialUrl && (
                  <a
                    href={cred.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 underline"
                  >
                    Verify Certificate ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default CredentialTracker;
