const UMLAUT_MAP = {
  ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss',
  Ä: 'ae', Ö: 'oe', Ü: 'ue',
  '\u00e4': 'ae', '\u00f6': 'oe', '\u00fc': 'ue', '\u00df': 'ss'
}

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

export function normalizePostalCode(input) {
  if (input === null || input === undefined) return ''
  const digits = String(input).trim().replace(/\D/g, '')
  return digits.padStart(5, '0')
}

export function normalizeSearchInput(input) {
  if (!input || typeof input !== 'string') return ''
  return input.trim().replace(/\s+/g, ' ')
}
