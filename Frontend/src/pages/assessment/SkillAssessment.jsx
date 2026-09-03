import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  ShieldCheck,
  Flag,
  ChevronRight,
  ChevronLeft,
  PauseCircle,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Layers,
  Award,
  Cpu
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export default function SkillAssessment() {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(6); // 7th question (0-indexed)
  const [selectedOption, setSelectedOption] = useState('B');
  const [flaggedQuestions, setFlaggedQuestions] = useState([2]); // Q3 flagged
  const [answeredMap, setAnsweredMap] = useState({
    0: 'A',
    1: 'C',
    2: 'B',
    3: 'D',
    4: 'A',
    5: 'C',
    6: 'B',
  });

  const questions = [
    {
      id: 1,
      topic: 'Core React & Virtual DOM',
      complexity: 'Medium Complexity',
      points: 3.0,
      question: 'How does React 19 handle concurrent rendering and action transitions under high-frequency state updates?',
      options: [
        { key: 'A', title: 'Synchronously flushing entire state trees', desc: 'Blocks the main execution thread until render completes.' },
        { key: 'B', title: 'Using non-blocking concurrent transitions with automatic batching', desc: 'Yields execution to main thread to keep UI interactive.' },
        { key: 'C', title: 'Spawning dedicated Web Workers for every setState', desc: 'Offloads JSX reconciliation entirely out of JavaScript engine.' },
        { key: 'D', title: 'Reverting to direct DOM mutation bypassing fibers', desc: 'Disables virtual DOM reconciliation for speed.' },
      ],
    },
    {
      id: 7,
      topic: 'System Design & Distributed Cloud Architecture',
      complexity: 'High Complexity',
      points: 5.0,
      question: 'When architecting a fault-tolerant microservices backend for high-frequency event streaming, which pattern best prevents cascading failures when downstream database latency spikes?',
      hint: 'Select the single best architectural strategy. You can review or modify your answer before final submission. All choices are recorded with strict idempotency.',
      options: [
        {
          key: 'A',
          title: 'Client-side retry loop with exponential backoff and aggressive jitter',
          desc: 'Relies solely on caller retries without buffering or isolating upstream threads from degraded nodes.',
        },
        {
          key: 'B',
          title: 'Distributed Circuit Breaker with asynchronous fallback queue & bulkhead isolation',
          desc: 'Trips open when error/latency thresholds cross, immediately degrading gracefully to non-blocking persistent dead-letter buffers while isolating execution resource thread pools.',
        },
        {
          key: 'C',
          title: 'Synchronous point-to-point HTTP/2 polling with increased timeout threshold',
          desc: 'Extends client connection holds, multiplying thread exhaustion across upstream ingress nodes.',
        },
        {
          key: 'D',
          title: 'Database connection pooling scaling up to thread saturation limit',
          desc: 'Over-allocates persistent sockets without circuit breaks, leading to memory depletion and database connection crashes.',
        },
      ],
    },
  ];

  const currentQ = questions[1];
  const totalQuestions = 20;

  const handleSelect = (key) => {
    setSelectedOption(key);
    setAnsweredMap((prev) => ({ ...prev, [currentQuestionIndex]: key }));
  };

  const toggleFlag = () => {
    if (flaggedQuestions.includes(currentQuestionIndex)) {
      setFlaggedQuestions(flaggedQuestions.filter((q) => q !== currentQuestionIndex));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestionIndex]);
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto px-1 sm:px-2 pb-12">
      {/* 1. Live Session Top Bar */}
      <div className="app-card px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-wider uppercase text-indigo-600">
                LIVE EXAMINATION UNIT
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Synchronized Live Session
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
              Full-Stack System Architecture & Cloud Assessment
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-right">
            <div>
              <div className="text-xs font-bold text-slate-900">Aarav Sharma</div>
              <div className="text-[10px] font-mono text-slate-400">ID: NX-2026-8841</div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              AS
            </div>
          </div>
          <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
            <PauseCircle className="w-4 h-4 text-slate-500" /> Pause Break
          </button>
        </div>
      </div>

      {/* 2. Subheader Progress & Telemetry Bar */}
      <div className="app-card px-6 py-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-extrabold text-slate-900">
              Question <span className="text-indigo-600">{currentQuestionIndex + 1}</span> of {totalQuestions}
            </h2>
            <span className="px-3 py-1 rounded-full text-xs font-semibold badge-indigo flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> {currentQ.topic}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold font-mono">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>REMAINING 60:00</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Telemetry Verified
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
            <span>Completion Progress</span>
            <span className="text-indigo-600 font-bold">35% Finished (7 / 20 Completed)</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              style={{ width: '35%' }}
            />
          </div>
        </div>
      </div>

      {/* 3. Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Question Card (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="app-card p-6 md:p-8 flex flex-col gap-6">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
                Q7 • Single Select
              </span>
              <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                ⚡ High Complexity
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                Points: {currentQ.points.toFixed(1)}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Hint alert */}
            {currentQ.hint && (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-900 text-xs flex items-start gap-2.5 leading-relaxed">
                <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{currentQ.hint}</span>
              </div>
            )}

            {/* Option Selection List */}
            <div className="flex flex-col gap-3.5 mt-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.key;
                return (
                  <div
                    key={opt.key}
                    onClick={() => handleSelect(opt.key)}
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.key}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {opt.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {opt.desc}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleFlag}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    flaggedQuestions.includes(currentQuestionIndex)
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  {flaggedQuestions.includes(currentQuestionIndex) ? 'Flagged for Review' : 'Flag for Review'}
                </button>
                <button
                  type="button"
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Skip for Now
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/resume-analyzer')}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  Save & Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Question Palette Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="app-card p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  Question Palette
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-600">
                7 of 20 Active
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-snug">
              Quickly switch between questions. Status indicators reflect live candidate responses.
            </p>

            {/* 20 Question Grid */}
            <div className="grid grid-cols-5 gap-2.5">
              {Array.from({ length: totalQuestions }).map((_, i) => {
                const isCurrent = i === currentQuestionIndex;
                const isAnswered = answeredMap[i] !== undefined;
                const isFlagged = flaggedQuestions.includes(i);

                let btnClass = 'palette-btn-unvisited';
                if (isCurrent) {
                  btnClass = 'palette-btn-active';
                } else if (isAnswered) {
                  btnClass = 'palette-btn-answered';
                } else if (isFlagged) {
                  btnClass = 'palette-btn-flagged';
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentQuestionIndex(i)}
                    className={`palette-btn ${btnClass} relative`}
                  >
                    {i + 1}
                    {isFlagged && !isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-indigo-600" />
                <span>Current (Active)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600" />
                <span>Answered ({Object.keys(answeredMap).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-400" />
                <span>Flagged ({flaggedQuestions.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-200" />
                <span>Unvisited ({totalQuestions - Object.keys(answeredMap).length})</span>
              </div>
            </div>

            {/* Final Submission */}
            <Button
              variant="outline"
              className="w-full justify-center text-xs font-bold py-2.5 mt-2"
              onClick={() => navigate('/credential-tracker')}
            >
              Review All Responses & Finish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
