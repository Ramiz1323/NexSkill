import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Building2,
  Search,
  CheckCircle2,
  Award,
  Sparkles,
  Inbox
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { fetchCandidates } from '../../redux/slices/employerSlice';

export default function EmployerDiscovery() {
  const dispatch = useDispatch();
  const { candidates = [], loading, error } = useSelector((state) => state.employer);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills?.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedRole === 'All' || c.role?.includes(selectedRole);
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Module 5: Employer Discovery & Direct Matchmaking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Vetted Talent Discovery Panel
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse verified job-ready candidates whose skill gaps have been remediated through industry-aligned curricula.
          </p>
        </div>
        <Button variant="accent" icon={Sparkles}>
          + Post Job Requirement
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-96 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search candidates by skill, name, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500">Filter Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Full-Stack">Full-Stack Cloud</option>
            <option value="AI/ML">AI / Machine Learning</option>
            <option value="DevOps">DevOps & SRE</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && <Loader message="Fetching verified candidate pool from backend..." />}

      {/* Error banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
          <strong>Error loading candidates: </strong> {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredCandidates.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center">
          <Inbox className="w-12 h-12 text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Candidate Records Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            Candidates registered and evaluated through the ATS and Dynamic Learning engines will appear here.
          </p>
        </div>
      )}

      {/* Candidate Cards Grid */}
      {!loading && filteredCandidates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id || candidate._id}
              title={candidate.name}
              subtitle={candidate.location || 'Location Not Specified'}
              badge={candidate.matchScore ? `${candidate.matchScore}% Match` : 'Verified'}
              action={
                candidate.atsScore ? (
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 font-bold text-xs">
                    {candidate.atsScore}%
                  </div>
                ) : null
              }
            >
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">
                    {candidate.role || 'General Tech Candidate'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {candidate.readinessLevel || 'Assessed & Verified'}
                  </span>
                </div>

                {candidate.skills && candidate.skills.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Verified Skill Proficiencies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium badge-indigo"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {candidate.verifiedBadges || 0} Credentials
                  </span>
                  <Button size="sm" variant="primary">
                    Schedule Interview
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
