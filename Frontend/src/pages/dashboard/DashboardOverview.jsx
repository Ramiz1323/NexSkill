import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const DashboardOverview = () => {
  const navigate = useNavigate();

  // RTK State Selectors
  const { user } = useSelector((state) => state.auth);
  const { atsScore, skillGaps } = useSelector((state) => state.resume);
  const { credentials, overallProgress, skillProgress } = useSelector((state) => state.progress);
  const { marketData, trends } = useSelector((state) => state.market);

  return (
    <div className="dashboard-overview flex flex-col gap-6">
      {/* Welcome Header */}
      <header className="dashboard-header border-b pb-4">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.name || user?.email || 'User'}!
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Role: <span className="capitalize font-semibold">{user?.role || 'Student'}</span> | NexSkill Learning & Placement Command Center
        </p>
      </header>

      {/* Metric Cards Grid */}
      <div className="metrics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: ATS Resume Score */}
        <Card title="ATS Resume Score">
          <div className="metric-content">
            <div className="text-3xl font-extrabold mb-1">
              {atsScore !== null ? `${atsScore}%` : 'N/A'}
            </div>
            <p className="text-sm text-gray-500">
              {atsScore !== null ? 'Latest Resume Rating' : 'No Resume Uploaded Yet'}
            </p>
            <div className="mt-3">
              <Button onClick={() => navigate('/resume-analyzer')} variant="primary">
                {atsScore !== null ? 'Re-analyze Resume' : 'Analyze Resume'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Metric 2: Skilling Progress */}
        <Card title="Overall Progress">
          <div className="metric-content">
            <div className="text-3xl font-extrabold mb-1">
              {overallProgress}%
            </div>
            <p className="text-sm text-gray-500">
              {skillProgress.length} Skills Tracked
            </p>
            <div className="mt-3">
              <Button onClick={() => navigate('/credential-tracker')} variant="primary">
                Track Credentials
              </Button>
            </div>
          </div>
        </Card>

        {/* Metric 3: Skill Gaps */}
        <Card title="Skill Gap Detection">
          <div className="metric-content">
            <div className="text-3xl font-extrabold mb-1">
              {skillGaps.length}
            </div>
            <p className="text-sm text-gray-500">
              {skillGaps.length === 0 ? 'No Gaps Flagged' : 'Critical Gaps Identified'}
            </p>
            <div className="mt-3">
              <Button onClick={() => navigate('/resume-analyzer')} variant="secondary">
                View Gaps
              </Button>
            </div>
          </div>
        </Card>

        {/* Metric 4: Earned Credentials */}
        <Card title="Earned Credentials">
          <div className="metric-content">
            <div className="text-3xl font-extrabold mb-1">
              {credentials.length}
            </div>
            <p className="text-sm text-gray-500">
              Verified Certificates
            </p>
            <div className="mt-3">
              <Button onClick={() => navigate('/credential-tracker')} variant="secondary">
                Manage Badges
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Action Navigation Section */}
      <section className="quick-actions border p-4 rounded mt-4">
        <h2 className="text-xl font-bold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => navigate('/resume-analyzer')} variant="primary">
            🚀 Launch ATS Resume Analyzer
          </Button>
          <Button onClick={() => navigate('/credential-tracker')} variant="primary">
            📜 Open Credential Tracker
          </Button>
        </div>
      </section>

      {/* Activity / Summary Feed Section */}
      <section className="summary-feed border p-4 rounded mt-2">
        <h2 className="text-xl font-bold mb-2">Market & Learning Intelligence Status</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Market Trends Loaded: {trends.length}</p>
          <p>Industry Alignment Index: {marketData.length > 0 ? 'Active' : 'Awaiting Market Sync'}</p>
        </div>
      </section>
    </div>
  );
};

export default DashboardOverview;
