import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProgress, addCredentialThunk, clearProgressError } from '../../redux/slices/progressSlice';
import ProgressChart from '../../components/charts/ProgressChart';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Award, ShieldCheck, Plus, CheckCircle2, Calendar, ExternalLink, Sparkles } from 'lucide-react';

const CredentialTracker = () => {
  const dispatch = useDispatch();
  const { credentials = [], skillProgress = [], overallProgress = 78, loading, error } = useSelector(
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

  const sampleCredentials = [
    { title: 'Full-Stack Cloud Readiness Credential', issuer: 'NexSkill & AWS Industry Alliance', issueDate: 'March 2026', verified: true },
    { title: 'AI Systems & RAG Diagnostics Certification', issuer: 'NASSCOM FutureSkills Prime', issueDate: 'Feb 2026', verified: true },
    { title: 'Enterprise Backend Microservices Badge', issuer: 'NexSkill Technical Committee', issueDate: 'Jan 2026', verified: true },
  ];

  const displayCredentials = credentials && credentials.length > 0 ? credentials : sampleCredentials;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Module 4: Verified Credential & Mastery Wallet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Credential & Progress Mastery Wallet
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track verified skill proficiency scores and log accredited digital micro-credentials.
          </p>
        </div>
      </header>

      {/* 3 Metric Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 block">Overall Readiness Score</span>
          <div className="text-4xl font-extrabold text-indigo-600 mt-1">
            {overallProgress}%
          </div>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Accelerated Track
          </span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 block">Verified Digital Credentials</span>
          <div className="text-4xl font-extrabold text-slate-900 mt-1">
            {displayCredentials.length}
          </div>
          <span className="text-xs text-slate-500 mt-1.5 block">
            Accredited by industry partners
          </span>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-semibold text-slate-500 block">Competency Mastery Index</span>
          <div className="text-4xl font-extrabold text-emerald-600 mt-1">
            88%
          </div>
          <span className="text-xs text-slate-500 mt-1.5 block">
            Validated across 6 core pillars
          </span>
        </Card>
      </section>

      {/* Progress Chart & Add Credential Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Progress Chart */}
        <Card title="Skill Mastery Breakdown" subtitle="Proficiency ratings across core technical domains">
          <div className="p-2">
            <ProgressChart
              data={skillProgress && skillProgress.length > 0 ? skillProgress : [
                { skill: 'React 19', proficiency: 92 },
                { skill: 'Node.js', proficiency: 88 },
                { skill: 'Docker', proficiency: 75 },
                { skill: 'Kubernetes', proficiency: 50 },
                { skill: 'AI / RAG', proficiency: 82 },
                { skill: 'PostgreSQL', proficiency: 70 },
              ]}
            />
          </div>
        </Card>

        {/* Right: Add New Credential Form */}
        <Card title="Log New Industry Credential" subtitle="Add certificate URL or verification hash to wallet">
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Credential / Certificate Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. AWS Certified Developer Associate"
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Issuing Authority / Partner</label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="e.g. Amazon Web Services / NASSCOM"
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Verification Link</label>
                <input
                  type="url"
                  name="credentialUrl"
                  value={formData.credentialUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full flex items-center justify-center gap-1.5">
              <Plus className="w-4 h-4" /> Save Verified Credential
            </Button>
          </form>
        </Card>
      </section>

      {/* Verified Credentials Wallet Grid */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Verified Credentials in Wallet</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayCredentials.map((cred, idx) => (
            <Card key={idx} className="p-5 border border-slate-200 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="badge-emerald px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 leading-snug">{cred.title || cred.name}</h4>
                <p className="text-xs text-slate-500">Issued by: <strong>{cred.issuer || 'Accredited Partner'}</strong></p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {cred.issueDate || '2026'}
                </p>
              </div>

              {cred.credentialUrl && (
                <a
                  href={cred.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 pt-2 border-t border-slate-100"
                >
                  Verify Certificate <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CredentialTracker;
