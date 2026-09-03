import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Compass,
  Sparkles,
  TrendingUp,
  Inbox
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { fetchCareerTracks, setSelectedTrack, generateCustomCareerPath } from '../../redux/slices/careerSlice';

export default function AiCareerGuidance() {
  const dispatch = useDispatch();
  const { tracks = [], selectedTrack, loading, error } = useSelector((state) => state.career);

  useEffect(() => {
    dispatch(fetchCareerTracks());
  }, [dispatch]);

  const activeTrack = selectedTrack || (tracks.length > 0 ? tracks[0] : null);

  const handleGenerate = () => {
    dispatch(generateCustomCareerPath({ role: 'Software Engineer', target: 'Cloud Specialist' }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Module 8: AI-Driven Career Pathway Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Career Pathway Navigator
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Simulate future job pathways, salary benchmarks, and targeted skill acquisition trajectories.
          </p>
        </div>
        <Button variant="primary" icon={Sparkles} onClick={handleGenerate} loading={loading}>
          Generate Custom Pathway
        </Button>
      </div>

      {/* Loading state */}
      {loading && <Loader message="Analyzing career pathways from market intelligence..." />}

      {/* Error banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
          <strong>Error loading career pathways: </strong> {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && tracks.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center">
          <Inbox className="w-12 h-12 text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Career Tracks Available
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            Career simulation models and progression pathways will load once data is supplied by the backend API.
          </p>
        </div>
      )}

      {/* Content when tracks exist */}
      {!loading && tracks.length > 0 && (
        <>
          {/* Role Selection Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {tracks.map((track) => (
              <button
                key={track.id || track._id || track.title}
                onClick={() => dispatch(setSelectedTrack(track))}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTrack?.id === track.id || activeTrack?._id === track._id
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/25'
                    : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {track.title}
              </button>
            ))}
          </div>

          {activeTrack && (
            <>
              {/* Track Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="Average Market Package" badge="Salary Benchmark">
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {activeTrack.avgSalary || 'Competitive Market Rate'}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Based on Indian hiring market postings</p>
                </Card>
                <Card title="Projected Hiring Growth" badge="Demand Trend">
                  <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    {activeTrack.demandGrowth || 'Trending'}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Macroeconomic trend index</p>
                </Card>
                <Card title="Target Transition Velocity" badge="Pacing">
                  <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">
                    {activeTrack.timeline || 'Flexible Pace'}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Estimated duration</p>
                </Card>
              </div>

              {/* Progression Roadmap */}
              {activeTrack.stages && activeTrack.stages.length > 0 && (
                <Card title="Step-by-Step AI Progression Trajectory" badge="Roadmap">
                  <div className="flex flex-col gap-4 mt-2">
                    {activeTrack.stages.map((stage, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 hover-lift"
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                              {stage.stage || stage.title}
                            </h3>
                            {stage.status && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold badge-indigo">
                                {stage.status}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {stage.detail || stage.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
