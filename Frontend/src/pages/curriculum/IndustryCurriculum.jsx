import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BookOpenCheck,
  Search,
  Building,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import {
  fetchIndustryCurriculums,
  setSelectedCurriculum,
  clearCurriculumErrors,
} from '../../redux/slices/curriculumSlice';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';

export default function IndustryCurriculum() {
  const dispatch = useDispatch();
  const {
    curriculums = [],
    selectedCurriculum,
    loading,
    error,
  } = useSelector((state) => state.curriculum);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchIndustryCurriculums({ search: searchQuery, role: roleFilter }));
  }, [dispatch, searchQuery, roleFilter]);

  const handleSelectCurriculum = (curriculum) => {
    dispatch(setSelectedCurriculum(curriculum));
  };

  const sampleCurricula = [
    {
      id: 'curr-1',
      title: 'Full-Stack Cloud & AI Engineering Track',
      targetRole: 'Software Engineer',
      industryPartner: 'AWS Academy & NexSkill Industry Alliance',
      duration: '14 Weeks',
      matchScore: 96,
      description: 'Comprehensive industry curriculum co-designed with top tech employers covering React 19, Node.js microservices, and Docker/Kubernetes container orchestration.',
      modules: ['Modern React & State Architecture', 'REST & GraphQL Backend Microservices', 'Containerization with Docker & Kubernetes', 'LLM Agent & RAG System Integration'],
      prerequisites: 'Foundational JavaScript and Data Structures',
    },
    {
      id: 'curr-2',
      title: 'Enterprise AI & Large Language Model Systems',
      targetRole: 'AI Specialist',
      industryPartner: 'OpenAI Academic & NASSCOM FutureSkills',
      duration: '12 Weeks',
      matchScore: 98,
      description: 'Production generative AI engineering track covering embeddings, vector databases, LangChain orchestration, and evaluation benchmarks.',
      modules: ['Deep Learning & Vector Embeddings', 'RAG Design with Qdrant & Pinecone', 'Autonomous Agent Workflows (CrewAI)', 'LLMOps, Quantization & High-Throughput Serving'],
      prerequisites: 'Python programming and linear algebra basics',
    },
    {
      id: 'curr-3',
      title: 'Site Reliability Engineering & DevOps Masterclass',
      targetRole: 'Cloud Architect',
      industryPartner: 'Cloud Native Computing Foundation (CNCF)',
      duration: '10 Weeks',
      matchScore: 92,
      description: 'Production infrastructure curriculum focusing on Terraform infrastructure as code, continuous deployment pipelines, and observability.',
      modules: ['Linux Kernel & eBPF Networking', 'Kubernetes Architecture & Helm', 'Terraform & Multi-cloud Automation', 'Prometheus & OpenTelemetry Monitoring'],
      prerequisites: 'Command line proficiency and networking fundamentals',
    },
  ];

  const displayList = curriculums && curriculums.length > 0 ? curriculums : sampleCurricula;

  const filteredList = displayList.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industryPartner?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || c.targetRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>Co-Designed Industry Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Industry-Aligned Curriculum Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verified, industry-standard learning tracks mapped directly to employer hiring requirements.
          </p>
        </div>
      </header>

      {/* Search & Filter Controls */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 flex items-center gap-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search curriculum tracks by keyword, tech stack, or partner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 outline-none"
            />
          </div>

          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full py-2.5 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white text-slate-900 outline-none font-semibold cursor-pointer"
            >
              <option value="All">All Target Roles</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="AI Specialist">AI Specialist</option>
              <option value="Cloud Architect">Cloud Architect</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Curriculum Grid */}
      <section className="space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
          <span>Showing {filteredList.length} verified learning tracks</span>
          <span>Co-designed with 40+ corporate hiring partners</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((track) => (
            <Card
              key={track.id || track._id}
              className="p-5 border border-slate-200 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="badge-indigo px-2.5 py-0.5 text-xs font-bold rounded-lg">
                    {track.targetRole || 'Engineering'}
                  </span>
                  <span className="badge-emerald px-2 py-0.5 text-[11px] font-bold rounded-md">
                    {track.matchScore || 95}% Industry Match
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">{track.title}</h3>

                {track.industryPartner && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <strong>{track.industryPartner}</strong>
                  </p>
                )}

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {track.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" /> {track.duration || '12 Weeks'}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Accredited
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSelectCurriculum(track)}
                className="w-full text-xs flex items-center justify-center gap-1"
              >
                View Syllabus & Modules <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Syllabus Modal */}
      {selectedCurriculum && (
        <Modal
          isOpen={Boolean(selectedCurriculum)}
          onClose={() => dispatch(setSelectedCurriculum(null))}
          title={selectedCurriculum.title}
        >
          <div className="space-y-4 text-xs">
            <div>
              <span className="badge-indigo px-2.5 py-0.5 rounded-lg text-xs font-bold">
                {selectedCurriculum.targetRole}
              </span>
              <p className="text-slate-500 mt-1">Co-Designed with: <strong>{selectedCurriculum.industryPartner}</strong></p>
            </div>

            <div>
              <strong className="text-slate-900 block mb-1">Track Description:</strong>
              <p className="text-slate-600 leading-relaxed">{selectedCurriculum.description}</p>
            </div>

            {selectedCurriculum.modules && (
              <div>
                <strong className="text-slate-900 block mb-2">Curriculum Learning Modules:</strong>
                <div className="space-y-2">
                  {selectedCurriculum.modules.map((mod, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 font-semibold text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCurriculum.prerequisites && (
              <div>
                <strong className="text-slate-900 block mb-1">Prerequisites:</strong>
                <p className="text-slate-500">{selectedCurriculum.prerequisites}</p>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => dispatch(setSelectedCurriculum(null))}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={() => dispatch(setSelectedCurriculum(null))}>
                Enroll Track
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
