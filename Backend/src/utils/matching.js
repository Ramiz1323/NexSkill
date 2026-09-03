export const calculateKeywordMatchRatio = (targetKeywords = [], text = '') => {
  if (!targetKeywords || targetKeywords.length === 0) return 0;
  const lowerText = text.toLowerCase();

  const matched = targetKeywords.filter((kw) =>
    new RegExp(`\\b${kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(lowerText)
  );

  return {
    matchedCount: matched.length,
    totalCount: targetKeywords.length,
    matchPercentage: Math.round((matched.length / targetKeywords.length) * 100),
    matchedKeywords: matched,
  };
};

export default {
  calculateKeywordMatchRatio,
};
