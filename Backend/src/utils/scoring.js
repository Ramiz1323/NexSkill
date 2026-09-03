export const computeWeightedScore = (items = []) => {
  if (!items || items.length === 0) return 0;
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  if (totalWeight === 0) return 0;
  const earned = items.reduce((sum, item) => sum + (item.score || 0) * (item.weight || 1), 0);
  return Math.round(earned / totalWeight);
};

export const normalizeScore = (score, min = 0, max = 100) => {
  return Math.min(max, Math.max(min, Math.round(score)));
};

export default {
  computeWeightedScore,
  normalizeScore,
};
