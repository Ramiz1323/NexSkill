import StudentSkill from './skillProfile.model.js';
import Skill from '../skills/skill.model.js';
import ApiError from '../../utils/ApiError.js';

export const getStudentSkills = async (studentId) => {
  const skills = await StudentSkill.find({ student: studentId })
    .populate('skill', 'name category demandLevel benchmarkWeight')
    .sort({ proficiencyScore: -1 });

  return skills;
};

export const upsertStudentSkill = async (studentId, data) => {
  const { skillId, proficiencyScore, isVerified, assessmentSource, evidenceUrl } = data;

  const skillExists = await Skill.findById(skillId);
  if (!skillExists) {
    throw new ApiError(404, `Skill not found with id: ${skillId}`);
  }

  let studentSkill = await StudentSkill.findOne({ student: studentId, skill: skillId });

  if (studentSkill) {
    if (proficiencyScore !== undefined) studentSkill.proficiencyScore = proficiencyScore;
    if (isVerified !== undefined) studentSkill.isVerified = isVerified;
    if (assessmentSource) studentSkill.assessmentSource = assessmentSource;
    if (evidenceUrl !== undefined) studentSkill.evidenceUrl = evidenceUrl;
    studentSkill.lastEvaluatedAt = new Date();
    await studentSkill.save();
  } else {
    studentSkill = await StudentSkill.create({
      student: studentId,
      skill: skillId,
      proficiencyScore: proficiencyScore || 0,
      isVerified: Boolean(isVerified),
      assessmentSource: assessmentSource || 'Self-Reported',
      evidenceUrl: evidenceUrl || '',
      lastEvaluatedAt: new Date(),
    });
  }

  return await studentSkill.populate('skill', 'name category demandLevel benchmarkWeight');
};

export const batchUpdateStudentSkills = async (studentId, skillsArray = []) => {
  const operations = skillsArray.map((item) =>
    upsertStudentSkill(studentId, item)
  );
  return await Promise.all(operations);
};

export const deleteStudentSkill = async (studentId, skillId) => {
  const deleted = await StudentSkill.findOneAndDelete({ student: studentId, skill: skillId });
  if (!deleted) {
    throw new ApiError(404, 'Student skill mapping not found');
  }
  return deleted;
};

export default {
  getStudentSkills,
  upsertStudentSkill,
  batchUpdateStudentSkills,
  deleteStudentSkill,
};
