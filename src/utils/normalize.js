/**
 * utils/normalize.js
 *
 * String normalisation utilities used by the gazetteer lookup and partner search.
 *
 * WHY this exists:
 * German city names contain umlauts (ä, ö, ü) and the sharp-s (ß). Users may type
 * "Munchen", "München" or "Muenchen" for the same city. We normalise both the
 * stored data and user input to a common form so matching works regardless of how
 * the user spells the name.
 *
 * The canonical normalised form is:
 *   lowercase + trimmed + umlauts → ASCII digraphs (ae, oe, ue, ss)
 *
 * This is also the format stored in each gazetteer entry's `normalizedCity` field.
 */

/**
 * Map of German special characters to their ASCII equivalents.
 * Used for deterministic umlaut-to-digraph substitution.
 */
const UMLAUT_MAP = {
  ä: 'ae',
  ö: 'oe',
  ü: 'ue',
  ß: 'ss',
  Ä: 'ae',
  Ö: 'oe',
  Ü: 'ue',
  // Some source data uses the combining diaeresis variant
  '\u00e4': 'ae',
  '\u00f6': 'oe',
  '\u00fc': 'ue',
  '\u00df': 'ss'
}

/**
 * normalizeGerman(str)
 *
 * Converts a German string to its lowercase ASCII-digraph form.
 * Strips leading/trailing whitespace and collapses internal multi-space gaps.
 *
 * Examples:
 *   "München"  → "muenchen"
 *   "Görlitz"  → "goerlitz"
 *   "Köln"     → "koeln"
 *   "Straße"   → "strasse"
 *   "MÜNCHEN"  → "muenchen"
 *
 * @param {string} str
 * @returns {string}
 */
export function normalizeGerman(str) {
  if (!str || typeof str !== 'string') return ''
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .split('')
    .map((ch) => UMLAUT_MAP[ch] ?? ch)
    .join('')
    .toLowerCase()
}

/**
 * isGermanPostalCode(input)
 *
 * Returns true if the input looks like a German 5-digit postal code.
 * German PLZ are exactly 5 digits (may start with 0: e.g. "01067" for Dresden).
 *
 * We accept strings with optional leading/trailing whitespace.
 *
 * @param {string} input
 * @returns {boolean}
 */
export function isGermanPostalCode(input) {
  if (!input || typeof input !== 'string') return false
  return /^\s*\d{5}\s*$/.test(input)
}

/**
 * normalizePostalCode(input)
 *
 * Trims and zero-pads a PLZ string to exactly 5 digits.
 * Handles cases where CSV data has stored "3044" instead of "03044".
 *
 * @param {string|number} input
 * @returns {string} 5-character zero-padded string, e.g. "03044"
 */
export function normalizePostalCode(input) {
  if (input === null || input === undefined) return ''
  const digits = String(input).trim().replace(/\D/g, '')
  return digits.padStart(5, '0')
}

/**
 * normalizeSearchInput(input)
 *
 * Prepares a raw user search string for lookup:
 *   - trims whitespace
 *   - collapses multiple spaces
 *
 * Does NOT lowercase or convert umlauts here — those transforms happen
 * separately so we can compare against both the original city name and the
 * normalised form.
 *
 * @param {string} input
 * @returns {string}
 */
export function normalizeSearchInput(input) {
  if (!input || typeof input !== 'string') return ''
  return input.trim().replace(/\s+/g, ' ')
}
