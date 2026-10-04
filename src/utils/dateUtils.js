// Date utility functions for Seasonal and Metadata operations

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Returns current 1-indexed month number (1 - 12)
 */
export function getCurrentMonthNumber() {
  return new Date().getMonth() + 1;
}

/**
 * Get short or full month name from 1-indexed number
 */
export function getMonthName(monthNumber, short = false) {
  const index = Math.max(0, Math.min(11, monthNumber - 1));
  return short ? MONTH_SHORT[index] : MONTH_NAMES[index];
}

/**
 * Generate dynamic seasonal chip label for current calendar month
 * e.g., "🍂 Oct Past Years" or "🍂 October Memories"
 */
export function getSeasonalChipLabel() {
  const currentMonthNum = getCurrentMonthNumber();
  const shortName = getMonthName(currentMonthNum, true);
  return `🍂 ${shortName} Past Years`;
}

/**
 * Format date string into human readable string e.g. "Oct 14, 2024"
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const shortMonth = MONTH_SHORT[d.getMonth()];
    return `${shortMonth} ${d.getDate()}, ${d.getFullYear()}`;
  } catch (err) {
    return dateString;
  }
}
