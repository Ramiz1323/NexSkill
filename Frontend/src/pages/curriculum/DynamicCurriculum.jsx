import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GitMerge,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  Send
} from 'lucide-react';
import {
  fetchSkillGapAnalysis,
  fetchAdaptiveLearningPath,
  clearCurriculumErrors,
} from '../../redux/slices/curriculumSlice';
import SkillGapChart from '../../components/charts/SkillGapChart';
import FeedbackForm from '../../components/forms/FeedbackForm';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

export default function DynamicCurriculum() {
  const dispatch = useDispatch();
  const {
    skillGapData,
    adaptiveRoadmap = [],
    loading,
    error,
  } = useSelector((state) => state.curriculum);

  const [studentId, setStudentId] = useState('STUDENT-001');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [chartType, setChartType] = useState('radar');

  useEffect(() => {
    if (studentId && targetRole) {
      dispatch(fetchSkillGapAnalysis({ studentId, targetRole }));
      dispatch(fetchAdaptiveLearningPath({ studentId, targetRole }));
    }
  }, [dispatch, studentId, targetRole]);

  const handleEvaluate = (e) => {
    e.preventDefault();
    dispatch(fetchSkillGapAnalysis({ studentId, targetRole }));
    dispatch(fetchAdaptiveLearningPath({ studentId, targetRole }));
  };

  const sampleRoadmap = [
    { step: 1, title: 'Remediation: PostgreSQL Indexing & Query Tuning', duration: '1.5 Weeks', status: 'In Progress', tag: 'High Priority Gap' },
    { step: 2, title: 'Core Mastery: Docker Multi-Stage Builds & Compose', duration: '2 Weeks', status: 'Upcoming', tag: 'Core Competency' },
    { step: 3, title: 'Advanced: Kubernetes Cluster Deployments & Helm', duration: '3 Weeks', status: 'Upcoming', tag: 'Capstone Project' },
  ];

  const roadmapItems = adaptiveRoadmap && adaptiveRoadmap.length > 0 ? adaptiveRoadmap : sampleRoadmap;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <GitMerge className="w-3.5 h-3.5" />
            <span>Dynamic Feedback & Adaptive Remediation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dynamic & Adaptive Learning Engine
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time skill gap detection mapped directly to personalized, remedial learning modules.
          </p>
        </div>
      </header>

      {/* Target Evaluation Form */}
      <Card className="p-5">
        <form onSubmit={handleEvaluate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Candidate / Cohort Identifier</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none"
              placeholder="e.g. STUDENT-001"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Industry Job Role</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900 outline-none font-semibold cursor-pointer"
            >
              <option value="Software Engineer">Full-Stack Cloud Software Engineer</option>
              <option value="AI Specialist">Frontier AI & RAG Engineer</option>
              <option value="Cloud Architect">Site Reliability Engineer (SRE)</option>
            </select>
          </div>

          <div>
            <Button type="submit" variant="primary" size="md" className="w-full flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Compute Adaptive Path
            </Button>
          </div>
        </form>
      </Card>

      {/* Skill Gap Matrix & Adaptive Path Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Skill Gap Radar Chart */}
        <Card title="Skill Gap Diagnostic Matrix" subtitle="Comparison of current candidate proficiency vs industry target">
          <div className="p-2">
            <SkillGapChart
              data={skillGapData?.metrics || [
                { skill: 'React 19', current: 90, target: 85 },
                { skill: 'Node.js', current: 85, target: 85 },
                { skill: 'Docker', current: 65, target: 80 },
                { skill: 'Kubernetes', current: 45, target: 75 },
                { skill: 'System Design', current: 70, target: 85 },
                { skill: 'PostgreSQL', current: 60, target: 80 },
              ]}
              chartType={chartType}
            />
          </div>
        </Card>

        {/* Right: Adaptive Learning Pathway */}
        <Card title="Personalized Remedial Learning Pathway" subtitle="Automated sequence generated to bridge identified gaps">
          <div className="space-y-3 pt-1">
            {roadmapItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h4>
                    <span className="badge-amber px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
                      {item.tag || 'Remedial'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-600" /> {item.duration || '2 Weeks'}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> {item.status || 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Industry Feedback Submission Panel */}
      <section>
        <FeedbackForm />
      </section>
    </div>
  );
}
