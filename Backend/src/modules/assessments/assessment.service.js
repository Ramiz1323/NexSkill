import { Assessment, AssessmentResult } from './assessment.model.js';
import skillProfileService from '../skillProfiles/skillProfile.service.js';
import ApiError from '../../utils/ApiError.js';
import { getPaginationOptions, formatPaginatedResponse } from '../../utils/pagination.js';

export const getAllAssessments = async (query = {}) => {
  const { page, limit, skip } = getPaginationOptions(query);

  const filter = { isActive: true };
  if (query.skillId) filter.targetSkill = query.skillId;
  if (query.difficulty) filter.difficulty = query.difficulty;

  const [assessments, total] = await Promise.all([
    Assessment.find(filter)
      .populate('targetSkill', 'name category benchmarkWeight')
      .select('-questions.correctAnswerIndex')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Assessment.countDocuments(filter),
  ]);

  return formatPaginatedResponse({ data: assessments, total, page, limit });
};

export const getAssessmentById = async (id, includeAnswers = false) => {
  let query = Assessment.findById(id).populate('targetSkill', 'name category');

  if (!includeAnswers) {
    query = query.select('-questions.correctAnswerIndex');
  }

  const assessment = await query;
  if (!assessment) {
    throw new ApiError(404, `Assessment not found with id: ${id}`);
  }
  return assessment;
};

export const createAssessment = async (data) => {
  const assessment = await Assessment.create(data);
  return assessment;
};

export const submitAssessment = async (assessmentId, studentId, userAnswers = []) => {
  const assessment = await Assessment.findById(assessmentId);
  if (!assessment) {
    throw new ApiError(404, 'Assessment not found');
  }

  const totalQuestions = assessment.questions.length;
  if (totalQuestions === 0) {
    throw new ApiError(400, 'Assessment has no questions configured');
  }

  let totalWeight = 0;
  let earnedWeight = 0;
  let correctCount = 0;

  const reviewBreakdown = assessment.questions.map((q, idx) => {
    const userAnswerObj = userAnswers.find((a) => a.questionIndex === idx) || {};
    const selectedOption = userAnswerObj.selectedOptionIndex;
    const isCorrect = selectedOption === q.correctAnswerIndex;
    const weight = q.weight || 1;

    totalWeight += weight;
    if (isCorrect) {
      earnedWeight += weight;
      correctCount += 1;
    }

    return {
      questionIndex: idx,
      questionText: q.questionText,
      selectedOptionIndex: selectedOption ?? null,
      correctAnswerIndex: q.correctAnswerIndex,
      isCorrect,
      explanation: q.explanation || '',
    };
  });

  const finalScore = Math.round((earnedWeight / totalWeight) * 100);
  const passed = finalScore >= assessment.passingScore;

  // Compute awarded level based on final score
  let awardedLevel = 'BEGINNER';
  if (finalScore >= 85) {
    awardedLevel = 'EXPERT';
  } else if (finalScore >= 70) {
    awardedLevel = 'ADVANCED';
  } else if (finalScore >= 50) {
    awardedLevel = 'INTERMEDIATE';
  }

  // Save result
  const result = await AssessmentResult.create({
    student: studentId,
    assessment: assessmentId,
    targetSkill: assessment.targetSkill,
    score: finalScore,
    passed,
    awardedLevel,
    totalQuestions,
    correctAnswersCount: correctCount,
  });

  // Automatically update student skill profile & award verified status
  await skillProfileService.upsertStudentSkill(studentId, {
    skillId: assessment.targetSkill,
    proficiencyScore: finalScore,
    isVerified: passed,
    assessmentSource: `NexSkill Verified Test (${assessment.title})`,
  });

  return {
    resultId: result._id,
    score: finalScore,
    passed,
    awardedLevel,
    passingScore: assessment.passingScore,
    totalQuestions,
    correctAnswersCount: correctCount,
    breakdown: reviewBreakdown,
  };
};

export const getStudentAssessmentHistory = async (studentId) => {
  const history = await AssessmentResult.find({ student: studentId })
    .populate('assessment', 'title difficulty')
    .populate('targetSkill', 'name category')
    .sort({ createdAt: -1 });

  return history;
};

export default {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  submitAssessment,
  getStudentAssessmentHistory,
};
