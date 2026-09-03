import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCareerRecommendations,
  fetchRoleRoadmap,
  sendAdvisorMessage,
  clearRoadmap,
  clearChatHistory,
  clearCareerError,
  selectCareerRecommendations,
  selectCareerRoadmap,
  selectCareerChatHistory,
  selectCareerLoading,
  selectChatLoading,
  selectRoadmapLoading,
  selectCareerError,
} from '../../redux/slices/careerSlice';
import { EXPERIENCE_LEVELS } from '../../utils/constants';
import { formatScore } from '../../utils/formatters';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import {
  Compass,
  Send,
  Sparkles,
  Map,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';

const QUICK_PROMPTS = [
  'What are high-growth tech roles in 2026?',
  'How do I transition from Full Stack to AI Engineering?',
  'What portfolio projects impress hiring managers most?',
];

const AiCareerGuidance = () => {
  const dispatch = useDispatch();

  const recommendations = useSelector(selectCareerRecommendations);
  const activeRoadmap = useSelector(selectCareerRoadmap);
  const chatHistory = useSelector(selectCareerChatHistory);
  const loading = useSelector(selectCareerLoading);
  const chatLoading = useSelector(selectChatLoading);
  const roadmapLoading = useSelector(selectRoadmapLoading);
  const error = useSelector(selectCareerError);

  const [targetDomain, setTargetDomain] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [currentSkills, setCurrentSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [chatPrompt, setChatPrompt] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !currentSkills.includes(trimmed)) {
      setCurrentSkills([...currentSkills, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setCurrentSkills(currentSkills.filter((s) => s !== skillToRemove));
  };

  const handleAnalyzeCareers = (e) => {
    e.preventDefault();
    dispatch(
      fetchCareerRecommendations({
        targetDomain,
        currentSkills,
        experienceLevel,
      })
    );
  };

  const handleViewRoadmap = (roleId) => {
    dispatch(fetchRoleRoadmap(roleId));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmed = chatPrompt.trim();
    if (!trimmed) return;
    dispatch(
      sendAdvisorMessage({
        prompt: trimmed,
        context: { targetDomain, currentSkills, experienceLevel },
      })
    );
    setChatPrompt('');
  };

  const handleQuickPrompt = (prompt) => {
    dispatch(
      sendAdvisorMessage({
        prompt,
        context: { targetDomain, currentSkills, experienceLevel },
      })
    );
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>AI Career Guidance & Roadmap Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Career Pathway Navigator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover personalized role pathways, milestone learning roadmaps, and intelligent career advising.
          </p>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="p-4 border border-rose-200 bg-rose-50 text-rose-700 rounded-2xl flex justify-between items-center text-xs">
          <span>{error}</span>
          <Button variant="secondary" size="sm" onClick={() => dispatch(clearCareerError())}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Section 1: Career Aspirations Input */}
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">1. Define Your Career Aspirations</h2>
        <form onSubmit={handleAnalyzeCareers} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700">Target Role or Domain</label>
              <input
                type="text"
                placeholder="e.g. Full Stack Engineer, Cloud Architect, Data Scientist"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700">Current Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
              >
                <option value="">Select Experience Level</option>
                {EXPERIENCE_LEVELS && (
                  <>
                    <option value={EXPERIENCE_LEVELS.ENTRY}>Entry Level / Fresher</option>
                    <option value={EXPERIENCE_LEVELS.MID}>Mid Level (1-3 years)</option>
                    <option value={EXPERIENCE_LEVELS.SENIOR}>Senior Level (4+ years)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Current Skills Tags */}
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700">Your Current Skills</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type skill and press Add (e.g. JavaScript, SQL, Git)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
              />
              <Button type="button" variant="secondary" size="sm" onClick={handleAddSkill}>
                Add Skill
              </Button>
            </div>
            {currentSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {currentSkills.map((skill) => (
                  <span
                    key={skill}
                    className="badge-indigo px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="font-bold cursor-pointer hover:text-rose-600 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" variant="primary" size="md" disabled={loading} className="w-full md:w-auto">
            {loading ? 'Analyzing...' : 'Generate Career Recommendations'}
          </Button>
        </form>
      </Card>

      {/* Section 2: Recommended Roles */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">2. Recommended Career Pathways</h2>

        {loading ? (
          <Loader message="Analyzing market demand & generating role recommendations..." />
        ) : recommendations.length === 0 ? (
          <Card className="p-8 text-center space-y-2">
            <Sparkles size={32} className="mx-auto text-slate-400" />
            <h3 className="text-md font-semibold text-slate-800">No recommendations yet</h3>
            <p className="text-xs text-slate-500">
              Submit your career domain and skills above to receive AI-curated role recommendations.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec) => {
              const roleId = rec.id || rec.roleId || rec.title;
              return (
                <Card key={roleId} className="p-5 border border-slate-200 rounded-2xl space-y-3 flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base text-slate-900">{rec.title || rec.role}</h3>
                      <span className="badge-emerald px-2.5 py-0.5 text-xs font-bold rounded-lg">
                        {formatScore ? formatScore(rec.matchScore ?? rec.readinessScore ?? 0) : `${rec.matchScore || 0}%`} Match
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{rec.description}</p>

                    {rec.marketDemand && (
                      <div className="text-xs flex items-center gap-1 text-emerald-700 font-semibold pt-1">
                        <TrendingUp size={14} /> Market Demand: <strong>{rec.marketDemand}</strong>
                      </div>
                    )}

                    {rec.requiredSkills && rec.requiredSkills.length > 0 && (
                      <div className="pt-2">
                        <span className="text-xs font-semibold text-slate-500 block mb-1">Key Competencies:</span>
                        <div className="flex flex-wrap gap-1">
                          {rec.requiredSkills.map((skill, idx) => (
                            <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleViewRoadmap(roleId)}
                    className="w-full text-xs flex items-center justify-center gap-1 mt-3"
                  >
                    <Map size={14} /> View Learning Roadmap
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 3: Interactive AI Career Advisor Assistant */}
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare size={20} className="text-indigo-600" /> 3. Interactive AI Career Advisor
          </h2>
          {chatHistory.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => dispatch(clearChatHistory())}
              className="text-xs"
            >
              Clear Chat
            </Button>
          )}
        </div>

        {/* Quick Prompts */}
        {chatHistory.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-slate-500">Suggested questions to ask your career advisor:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs p-2.5 border border-slate-200 bg-slate-50 hover:bg-indigo-50 rounded-xl text-left text-slate-700 transition-colors cursor-pointer"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Thread */}
        <div className="p-4 border border-slate-200 bg-slate-50/50 rounded-2xl min-h-48 max-h-96 overflow-y-auto space-y-3">
          {chatHistory.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">
              Ask any question about career pathways, market demands, certifications, or interview prep.
            </p>
          ) : (
            chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-xs leading-relaxed ${
                  msg.sender === 'user' || msg.role === 'user'
                    ? 'bg-indigo-50 text-indigo-950 ml-8 text-right border border-indigo-200'
                    : 'bg-white text-slate-800 mr-8 text-left border border-slate-200 shadow-sm'
                }`}
              >
                <strong className="block text-[10px] text-slate-500 mb-1">
                  {msg.sender === 'user' || msg.role === 'user' ? 'You' : 'AI Career Advisor'}
                </strong>
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            ))
          )}
          {chatLoading && <Loader message="AI Advisor is thinking..." />}
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask your AI Career Advisor..."
            value={chatPrompt}
            onChange={(e) => setChatPrompt(e.target.value)}
            className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white text-slate-900"
          />
          <Button type="submit" variant="primary" size="sm" disabled={chatLoading} className="flex items-center gap-1">
            <Send size={14} /> Send
          </Button>
        </form>
      </Card>

      {/* Learning Roadmap Modal */}
      {activeRoadmap && (
        <Modal
          isOpen={Boolean(activeRoadmap)}
          onClose={() => dispatch(clearRoadmap())}
          title={activeRoadmap.roleTitle || activeRoadmap.title || 'Learning Roadmap'}
        >
          <div className="space-y-4 text-xs">
            {roadmapLoading && <Loader message="Loading roadmap milestones..." />}

            {activeRoadmap.description && (
              <p className="text-slate-600">{activeRoadmap.description}</p>
            )}

            {activeRoadmap.estimatedDuration && (
              <div className="flex items-center gap-1 font-semibold text-indigo-700">
                <Clock size={14} /> Estimated Timeline: {activeRoadmap.estimatedDuration}
              </div>
            )}

            {/* Milestones */}
            {activeRoadmap.milestones && activeRoadmap.milestones.length > 0 ? (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Milestone Breakdown:</h4>
                {activeRoadmap.milestones.map((milestone, idx) => (
                  <div key={idx} className="p-3 border border-slate-200 bg-slate-50 rounded-xl space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Step {idx + 1}: {milestone.title}</span>
                      {milestone.duration && <span className="text-slate-400 font-normal">{milestone.duration}</span>}
                    </div>
                    {milestone.description && (
                      <p className="text-slate-600">{milestone.description}</p>
                    )}
                    {milestone.topics && milestone.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {milestone.topics.map((topic, tIdx) => (
                          <span key={tIdx} className="bg-white border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-700">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">Roadmap milestones will appear here when loaded.</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AiCareerGuidance;
