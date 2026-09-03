import fs from 'fs';
import Skill from '../skills/skill.model.js';
import StudentProfile from '../students/student.model.js';
import { ROLE_BENCHMARKS } from '../skillGaps/skillGap.service.js';
import ApiError from '../../utils/ApiError.js';

export const analyzeResumeContent = async ({ filePath, originalName, targetRole = 'Software Engineer', userId }) => {
  if (!filePath && !originalName) {
    throw new ApiError(400, 'Resume file is required');
  }

  // Read file text content
  let textContent = '';
  if (filePath && fs.existsSync(filePath)) {
    try {
      textContent = fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      // If binary PDF/Doc, extract printable ASCII text sequences
      const buffer = fs.readFileSync(filePath);
      textContent = buffer.toString('binary').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
    }
  } else {
    textContent = originalName;
  }

  const normalizedText = textContent.toLowerCase();

  // Fetch skill catalog to match against
  const skills = await Skill.find({ isActive: true });

  const matchedKeywords = [];
  const matchedSkillsMap = new Set();

  skills.forEach((skillObj) => {
    const skillName = skillObj.name.toLowerCase();
    const regex = new RegExp(`\\b${skillName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');

    if (regex.test(normalizedText)) {
      matchedKeywords.push(skillObj.name);
      matchedSkillsMap.add(skillObj.name.toLowerCase());
    } else if (skillObj.aliases && skillObj.aliases.length > 0) {
      for (const alias of skillObj.aliases) {
        const aliasRegex = new RegExp(`\\b${alias.toLowerCase()}\\b`, 'i');
        if (aliasRegex.test(normalizedText)) {
          matchedKeywords.push(skillObj.name);
          matchedSkillsMap.add(skillObj.name.toLowerCase());
          break;
        }
      }
    }
  });

  // Compare matched skills against target role benchmarks
  const benchmarks = ROLE_BENCHMARKS[targetRole] || ROLE_BENCHMARKS['Software Engineer'];
  const missingKeywords = [];
  let roleMatchCount = 0;

  benchmarks.forEach((b) => {
    if (matchedSkillsMap.has(b.skill.toLowerCase())) {
      roleMatchCount += 1;
    } else {
      missingKeywords.push(b.skill);
    }
  });

  // Calculate ATS Score %
  const totalBenchmarks = benchmarks.length || 1;
  const matchRatio = roleMatchCount / totalBenchmarks;
  // Keyword density and presence of projects/education adds up to 100
  let atsScore = Math.round(matchRatio * 75);
  if (/education|degree|university|college/i.test(normalizedText)) atsScore += 10;
  if (/project|experience|developed|implemented/i.test(normalizedText)) atsScore += 10;
  if (/github|linkedin|portfolio/i.test(normalizedText)) atsScore += 5;

  atsScore = Math.min(100, Math.max(15, atsScore));

  // Construct actionable suggestions
  const suggestions = [];
  if (missingKeywords.length > 0) {
    suggestions.push(
      `Add missing target role competencies: ${missingKeywords.slice(0, 4).join(', ')}.`
    );
  }
  if (!/github/i.test(normalizedText)) {
    suggestions.push('Include your GitHub profile link to provide verifiable code evidence.');
  }
  if (!/metric|reduced|improved|increased|%/i.test(normalizedText)) {
    suggestions.push('Quantify your project outcomes with metrics (e.g. improved speed by 30%, reduced latency).');
  }

  // If authenticated student, link resume path to profile
  if (userId && filePath) {
    await StudentProfile.findOneAndUpdate(
      { user: userId },
      { $set: { resumeUrl: filePath } }
    );
  }

  return {
    fileName: originalName,
    targetRole,
    atsScore,
    matchedCount: matchedKeywords.length,
    matchedKeywords,
    missingKeywords,
    suggestions,
    analyzedAt: new Date(),
  };
};

export default {
  analyzeResumeContent,
};
