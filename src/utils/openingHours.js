/**
 * utils/openingHours.js
 *
 * Parses the binary opening-hour columns from the partner CSV into
 * human-readable time-range strings.
 *
 * CSV column format:
 *   {Day}_{Hour}_Uhr  where:
 *     Day  = Mo | Di | Mi | Do | Fr | Sa | So
 *     Hour = 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
 *   Value = "1" (open during that hour) | "0" (closed)
 *
 * Interpretation:
 *   Mo_9_Uhr = "1" means the business is open during 09:00–10:00.
 *   Mo_17_Uhr = "1" means open during 17:00–18:00.
 *
 * So a consecutive run of 1s from hour H_start to H_end (exclusive) produces
 * the range "HH:00–HH:00" where the end time is the first non-active hour.
 * Example: Mo_9–Mo_17 all "1", Mo_18 "0"  →  09:00–18:00
 *
 * Multiple separate blocks in one day are supported:
 *   Mo_9–Mo_11 "1", Mo_12 "0", Mo_13–Mo_17 "1"
 *   → ["09:00–12:00", "13:00–18:00"]
 *
 * NOTE on the last possible slot (19):
 *   If 19_Uhr = 1, the slot represents 19:00–20:00. We display it as ending
 *   at 20:00 since 19:00 is the last column we can read.
 */

// Day definitions: key = CSV column prefix, label = display name
export const WEEKDAYS = [
  { key: 'So', label: 'Sonntag', short: 'So' },
  { key: 'Mo', label: 'Montag', short: 'Mo' },
  { key: 'Di', label: 'Dienstag', short: 'Di' },
  { key: 'Mi', label: 'Mittwoch', short: 'Mi' },
  { key: 'Do', label: 'Donnerstag', short: 'Do' },
  { key: 'Fr', label: 'Freitag', short: 'Fr' },
  { key: 'Sa', label: 'Samstag', short: 'Sa' }
]

// All possible hour slots in the CSV (9 through 19 inclusive)
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

/**
 * zeroPad(n)
 * Formats a single-digit hour as a zero-padded 2-char string.
 * @param {number} n
 * @returns {string}
 */
function zeroPad(n) {
  return String(n).padStart(2, '0')
}

/**
 * getRangesForDay(partner, dayKey)
 *
 * Reads all hour-slot columns for a given day from a partner object and
 * returns an array of formatted time-range strings.
 *
 * Returns an empty array if all slots are 0 / absent (= closed all day).
 *
 * @param {object} partner – parsed partner row from the CSV
 * @param {string} dayKey  – day key, e.g. "Mo"
 * @returns {string[]}     – e.g. ["09:00–18:00"] or ["09:00–12:00", "14:00–17:00"]
 */
export function getRangesForDay(partner, dayKey) {
  const ranges = []
  let rangeStart = null

  for (let i = 0; i < HOURS.length; i++) {
    const hour = HOURS[i]
    const colName = `${dayKey}_${hour}_Uhr`
    // Accept both numeric 1 and string "1" as "open"
    const isOpen = partner[colName] == 1

    if (isOpen && rangeStart === null) {
      // Start of a new open block
      rangeStart = hour
    } else if (!isOpen && rangeStart !== null) {
      // End of an open block — the current hour is the first closed one
      ranges.push(`${zeroPad(rangeStart)}:00–${zeroPad(hour)}:00`)
      rangeStart = null
    }
  }

  // Handle a block that extends all the way to the last slot (19_Uhr = 1)
  // The slot represents 19:00–20:00 so we display the end time as 20:00
  if (rangeStart !== null) {
    const lastHour = HOURS[HOURS.length - 1] // 19
    ranges.push(`${zeroPad(rangeStart)}:00–${zeroPad(lastHour + 1)}:00`)
  }

  return ranges
}

/**
 * getOpeningHoursForPartner(partner)
 *
 * Returns a full weekly schedule for a partner as an array of day objects.
 * Days with no open slots are included with an empty `ranges` array.
 *
 * @param {object} partner
 * @returns {Array<{key: string, label: string, short: string, ranges: string[], isOpen: boolean}>}
 */
export function getOpeningHoursForPartner(partner) {
  return WEEKDAYS.map((day) => {
    const ranges = getRangesForDay(partner, day.key)
    return {
      key: day.key,
      label: day.label,
      short: day.short,
      ranges,
      isOpen: ranges.length > 0
    }
  })
}

/**
 * getCompactOpeningHours(partner)
 *
 * Returns a compact display-friendly summary string, e.g.:
 *   "Mo–Fr 09:00–18:00, Sa 09:00–13:00"
 *
 * This is used in the PartnerCard for a one-line overview.
 * Days without hours are omitted. Consecutive days with identical hours
 * are collapsed into a range (e.g. Mo–Fr).
 *
 * @param {object} partner
 * @returns {string}
 */
export function getCompactOpeningHours(partner) {
  const schedule = getOpeningHoursForPartner(partner).filter((d) => d.isOpen)

  if (schedule.length === 0) return ''

  // Collapse consecutive days with the same hours
  const collapsed = []
  let group = null

  for (const day of schedule) {
    const rangesStr = day.ranges.join(', ')

    if (!group) {
      group = { start: day, end: day, ranges: rangesStr }
    } else if (rangesStr === group.ranges) {
      // Same hours as the previous group — extend the group end
      group.end = day
    } else {
      collapsed.push(group)
      group = { start: day, end: day, ranges: rangesStr }
    }
  }
  if (group) collapsed.push(group)

  return collapsed
    .map((g) => {
      const dayLabel =
        g.start.key === g.end.key
          ? g.start.short
          : `${g.start.short}–${g.end.short}`
      return `${dayLabel} ${g.ranges}`
    })
    .join(', ')
}
