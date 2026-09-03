import Skill from './skill.model.js';
import ApiError from '../../utils/ApiError.js';
import { getPaginationOptions, formatPaginatedResponse } from '../../utils/pagination.js';

export const getAllSkills = async (query = {}) => {
  const { page, limit, skip } = getPaginationOptions(query);

  const filter = { isActive: true };
  if (query.category) filter.category = query.category;
  if (query.demandLevel) filter.demandLevel = query.demandLevel;
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { aliases: { $regex: query.search, $options: 'i' } },
    ];
  }

  const [skills, total] = await Promise.all([
    Skill.find(filter).sort({ benchmarkWeight: -1, name: 1 }).skip(skip).limit(limit),
    Skill.countDocuments(filter),
  ]);

  return formatPaginatedResponse({ data: skills, total, page, limit });
};

export const getSkillById = async (id) => {
  const skill = await Skill.findById(id);
  if (!skill) {
    throw new ApiError(404, `Skill not found with id: ${id}`);
  }
  return skill;
};

export const createSkill = async (skillData) => {
  const existingSkill = await Skill.findOne({
    name: { $regex: new RegExp(`^${skillData.name.trim()}$`, 'i') },
  });

  if (existingSkill) {
    throw new ApiError(409, `Skill with name '${skillData.name}' already exists`);
  }

  const skill = await Skill.create(skillData);
  return skill;
};

export const updateSkill = async (id, updateData) => {
  const skill = await Skill.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!skill) {
    throw new ApiError(404, `Skill not found with id: ${id}`);
  }

  return skill;
};

export const deleteSkill = async (id) => {
  const skill = await Skill.findByIdAndUpdate(
    id,
    { $set: { isActive: false } },
    { new: true }
  );

  if (!skill) {
    throw new ApiError(404, `Skill not found with id: ${id}`);
  }

  return skill;
};

export default {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
