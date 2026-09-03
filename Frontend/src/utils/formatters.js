/**
 * NexSkill Formatting Utilities
 */

/**
 * Format currency amount with currency symbol
 * @param {number} amount
 * @param {string} currency - e.g. 'INR', 'USD'
 * @param {string} locale - default 'en-IN'
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  if (amount === null || amount === undefined || isNaN(amount)) return 'N/A';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format ISO date string into readable text
 * @param {string|Date} date
 * @param {Intl.DateTimeFormatOptions} options
 * @param {string} locale
 * @returns {string}
 */
export const formatDate = (
  date,
  options = { year: 'numeric', month: 'short', day: 'numeric' },
  locale = 'en-US'
) => {
  if (!date) return 'N/A';
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return 'Invalid Date';
  return new Intl.DateTimeFormat(locale, options).format(parsed);
};

/**
 * Format raw number to percentage string
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined || isNaN(value)) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Format match/readiness score (e.g., 85 -> "85%")
 * @param {number} score
 * @returns {string}
 */
export const formatScore = (score) => {
  if (score === null || score === undefined || isNaN(score)) return '0%';
  return `${Math.round(score)}%`;
};

/**
 * Truncate long strings with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

/**
 * Format years of experience into user friendly string
 * @param {number} years
 * @returns {string}
 */
export const formatExperience = (years) => {
  if (years === null || years === undefined || isNaN(years)) return 'Fresh Graduate';
  if (years === 0) return 'Fresher (0 years)';
  if (years === 1) return '1 year';
  return `${years} years`;
};

/**
 * Capitalize first letter of every word
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Format candidate status key to readable label
 * @param {string} status
 * @returns {string}
 */
export const formatCandidateStatus = (status) => {
  if (!status) return 'Unknown';
  return capitalize(status.replace(/_/g, ' '));
};
