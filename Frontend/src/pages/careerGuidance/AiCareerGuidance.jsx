import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCareerRecommendations,
  fetchRoleRoadmap,
  sendCareerAdvisorMessage,
  clearActiveRoadmap,
  clearChatHistory,
  clearCareerError,
  selectCareerRecommendations,
  selectActiveRoadmap,
  selectChatHistory,
  selectCareerLoading,
  selectChatLoading,
  selectRoadmapLoading,
  selectCareerError,
} from '../../redux/slices/careerSlice';
import { EXPERIENCE_LEVELS } from '../../utils/constants';
import { formatScore, capitalize } from '../../utils/formatters';
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
  const activeRoadmap = useSelector(selectActiveRoadmap);
  const chatHistory = useSelector(selectChatHistory);
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
      sendCareerAdvisorMessage({
        prompt: trimmed,
        context: { targetDomain, currentSkills, experienceLevel },
      })
    );
    setChatPrompt('');
  };

  const handleQuickPrompt = (prompt) => {
    dispatch(
      sendCareerAdvisorMessage({
        prompt,
        context: { targetDomain, currentSkills, experienceLevel },
      })
    );
  };

  return (
    <div className="career-guidance-container p-6 space-y-8">
      {/* Header */}
      <header className="career-guidance-header">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Compass size={24} /> AI Career Guidance & Roadmap Assistant
        </h1>
        <p className="text-sm text-gray-500">
          Discover personalized role pathways, milestone learning roadmaps, and intelligent career advising.
        </p>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="error-banner p-4 border border-red-300 bg-red-50 text-red-700 rounded flex justify-between items-center">
          <span>{error}</span>
          <Button variant="secondary" onClick={() => dispatch(clearCareerError())}>
            Dismiss
          </Button>
        </div>
      )}

      {/* Section 1: Career Aspirations Input */}
      <Card className="career-input-card p-6 space-y-4">
        <h2 className="text-lg font-bold">1. Define Your Career Aspirations</h2>
        <form onSubmit={handleAnalyzeCareers} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Target Role or Domain</label>
              <input
                type="text"
                placeholder="e.g. Full Stack Engineer, Cloud Architect, Data Scientist"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Current Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value="">Select Experience Level</option>
                <option value={EXPERIENCE_LEVELS.ENTRY}>Entry Level / Fresher</option>
                <option value={EXPERIENCE_LEVELS.MID}>Mid Level (1-3 years)</option>
                <option value={EXPERIENCE_LEVELS.SENIOR}>Senior Level (4+ years)</option>
              </select>
            </div>
          </div>

          {/* Current Skills Tags */}
          <div>
            <label className="block text-xs font-semibold mb-1">Your Current Skills</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type skill and press Add (e.g. JavaScript, SQL, Git)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              />
              <Button type="button" variant="secondary" onClick={handleAddSkill}>
                Add Skill
              </Button>
            </div>
            {currentSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {currentSkills.map((skill) => (
                  <span
                    key={skill}
                    className="badge px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="font-bold cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" variant="primary" disabled={loading} className="w-full md:w-auto">
            {loading ? 'Analyzing...' : 'Generate Career Recommendations'}
          </Button>
        </form>
      </Card>

      {/* Section 2: Recommended Roles */}
      <section className="recommendations-section space-y-4">
        <h2 className="text-lg font-bold">2. Recommended Career Pathways</h2>

        {loading ? (
          <Loader message="Analyzing market demand & generating role recommendations..." />
        ) : recommendations.length === 0 ? (
          <Card className="p-8 text-center space-y-2">
            <Sparkles size={32} className="mx-auto text-gray-400" />
            <h3 className="text-md font-semibold">No recommendations yet</h3>
            <p className="text-xs text-gray-500">
              Submit your career domain and skills above to receive AI-curated role recommendations.
            </p>
          </Card>
        ) : (
          <div className="recommendations-grid grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec) => {
              const roleId = rec.id || rec.roleId || rec.title;
              return (
                <Card key={roleId} className="recommendation-card p-4 border rounded space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base">{rec.title || rec.role}</h3>
                      <span className="badge px-2 py-0.5 text-xs font-bold border rounded">
                        {formatScore(rec.matchScore ?? rec.readinessScore ?? 0)} Match
                      </span>
                    </div>

                    <p className="text-xs text-gray-500">{rec.description}</p>

                    {rec.marketDemand && (
                      <div className="text-xs flex items-center gap-1 text-green-700">
                        <TrendingUp size={14} /> Market Demand: <strong>{rec.marketDemand}</strong>
                      </div>
                    )}

                    {rec.requiredSkills && rec.requiredSkills.length > 0 && (
                      <div className="skills-tags pt-1">
                        <span className="text-xs font-semibold block mb-1">Key Competencies:</span>
                        <div className="flex flex-wrap gap-1">
                          {rec.requiredSkills.map((skill, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="primary"
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
      <Card className="ai-advisor-card p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <MessageSquare size={20} /> 3. Interactive AI Career Advisor
          </h2>
          {chatHistory.length > 0 && (
            <Button
              variant="secondary"
              onClick={() => dispatch(clearChatHistory())}
              className="text-xs"
            >
              Clear Chat
            </Button>
          )}
        </div>

        {/* Quick Prompts */}
        {chatHistory.length === 0 && (
          <div className="quick-prompts space-y-2">
            <p className="text-xs text-gray-500">Suggested questions to ask your career advisor:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Thread */}
        <div className="chat-thread p-4 border rounded min-h-48 max-h-96 overflow-y-auto space-y-3">
          {chatHistory.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-6">
              Ask any question about career pathways, market demands, certifications, or interview prep.
            </p>
          ) : (
            chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-bubble p-3 rounded text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-50 dark:bg-blue-950 ml-8 text-right border'
                    : 'bg-gray-100 dark:bg-gray-800 mr-8 text-left border'
                }`}
              >
                <strong className="block text-xs text-gray-500 mb-1">
                  {msg.role === 'user' ? 'You' : 'AI Career Advisor'}
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
            className="w-full p-2 border rounded text-sm"
          />
          <Button type="submit" variant="primary" disabled={chatLoading} className="flex items-center gap-1">
            <Send size={16} /> Send
          </Button>
        </form>
      </Card>

      {/* Learning Roadmap Modal */}
      {activeRoadmap && (
        <Modal
          isOpen={Boolean(activeRoadmap)}
          onClose={() => dispatch(clearActiveRoadmap())}
          title={activeRoadmap.roleTitle || activeRoadmap.title || 'Learning Roadmap'}
        >
          <div className="roadmap-modal-content space-y-4">
            {roadmapLoading && <Loader message="Loading roadmap milestones..." />}

            {activeRoadmap.description && (
              <p className="text-xs text-gray-600 dark:text-gray-300">{activeRoadmap.description}</p>
            )}

            {activeRoadmap.estimatedDuration && (
              <div className="text-xs flex items-center gap-1 font-semibold">
                <Clock size={14} /> Estimated Timeline: {activeRoadmap.estimatedDuration}
              </div>
            )}

            {/* Milestones */}
            {activeRoadmap.milestones && activeRoadmap.milestones.length > 0 ? (
              <div className="milestones-list space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider">Milestone Breakdown:</h4>
                {activeRoadmap.milestones.map((milestone, idx) => (
                  <div key={idx} className="milestone-item p-3 border rounded text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>Step {idx + 1}: {milestone.title}</span>
                      {milestone.duration && <span className="text-gray-400">{milestone.duration}</span>}
                    </div>
                    {milestone.description && (
                      <p className="text-gray-500">{milestone.description}</p>
                    )}
                    {milestone.topics && milestone.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {milestone.topics.map((topic, tIdx) => (
                          <span key={tIdx} className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-2xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">Roadmap milestones will appear here when loaded.</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AiCareerGuidance;
