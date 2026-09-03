import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  GraduationCap,
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  Inbox
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { fetchTrainerPrograms, enrollTrainer } from '../../redux/slices/trainerSlice';

export default function TrainerDevelopment() {
  const dispatch = useDispatch();
  const { programs = [], loading, error } = useSelector((state) => state.trainer);

  useEffect(() => {
    dispatch(fetchTrainerPrograms());
  }, [dispatch]);

  const handleEnroll = (programId) => {
    dispatch(enrollTrainer({ programId }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Module 9: Industry-Driven Trainer Development</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Train-the-Trainer Faculty Development Hub
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Empowering college professors and vocational instructors with cutting-edge industry training and pedagogy certifications.
          </p>
        </div>
        <Button variant="accent" icon={Sparkles}>
          + Register Faculty Cohort
        </Button>
      </div>

      {/* Loading state */}
      {loading && <Loader message="Loading faculty development programs from backend..." />}

      {/* Error banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
          <strong>Error loading trainer programs: </strong> {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && programs.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center">
          <Inbox className="w-12 h-12 text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Faculty Training Cohorts Scheduled
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
            Industry immersion programs and pedagogy benchmarks will load dynamically from the backend API.
          </p>
        </div>
      )}

      {/* Program Cards Grid */}
      {!loading && programs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((prog) => (
            <Card
              key={prog.id || prog._id}
              title={prog.title}
              subtitle={prog.partner || prog.organization || 'Industry Partner'}
              badge={prog.status || 'Active'}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
                  {prog.duration && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {prog.duration}
                    </span>
                  )}
                  {prog.enrolledTrainers !== undefined && (
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {prog.enrolledTrainers} Faculty
                    </span>
                  )}
                </div>

                {prog.topics && prog.topics.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Core Curriculum Modules
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {prog.topics.map((t, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    {prog.pedagogyBenchmark || 'Industry Standard'}
                  </span>
                  <Button size="sm" variant="primary" onClick={() => handleEnroll(prog.id || prog._id)}>
                    Enroll Faculty
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
