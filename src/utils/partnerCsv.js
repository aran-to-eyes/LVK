/**
 * utils/partnerCsv.js
 *
 * Fetches and parses the partner CSV dataset using Papa Parse.
 *
 * WHY runtime parsing?
 * The CSV is the operational dataset maintained separately from the codebase.
 * Fetching it at runtime means the data file can be replaced on the server
 * without a rebuild. The file is served from /public/data/ as a static asset.
 *
 * CSV facts (from real file inspection):
 *   - Delimiter: semicolon (;)
 *   - Encoding: UTF-8
 *   - First row: header
 *   - Day-order in columns: So, Mo, Di, Mi, Do, Fr, Sa  (Sunday first)
 *   - Some PLZ values are stored without leading zero (e.g. "3044" → "03044")
 *   - Coordinates are stored as decimal strings in Lat / Lng columns
 *
 * After parsing, each partner object is post-processed:
 *   - PLZ is normalised to a 5-character zero-padded string
 *   - Lat / Lng are kept as strings (parseFloat happens in distance.js)
 *   - All whitespace in Bezeichnung / Ort / Strasse is trimmed
 */

import Papa from 'papaparse'
import { normalizePostalCode } from '@/utils/normalize.js'

/** Path to the CSV file served from /public */
const CSV_URL = '${import.meta.env.BASE_URL}/data/Lowvision-partner_Stand_2023-5-010.csv'

/**
 * fetchAndParsePartners()
 *
 * Fetches the CSV and returns a promise that resolves to an array of
 * cleaned partner objects.
 *
 * Throws if the fetch fails or PapaParse reports critical errors.
 *
 * @returns {Promise<object[]>}
 */
export async function fetchAndParsePartners() {
  const response = await fetch(CSV_URL)

  if (!response.ok) {
    throw new Error(
      `Partnerdaten konnten nicht geladen werden (HTTP ${response.status}). ` +
        `Stellen Sie sicher, dass die Datei unter ${CSV_URL} erreichbar ist.`
    )
  }

  const csvText = await response.text()

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      // First row is the header — Papa uses column names as object keys
      header: true,

      // Semicolons delimit columns in this file
      delimiter: ';',

      // Trim whitespace from every field value
      transformHeader: (header) => header.trim(),

      // Skip blank lines that sometimes appear at the end of exported CSVs
      skipEmptyLines: true,

      complete(result) {
        if (result.errors && result.errors.length > 0) {
          // Log non-fatal errors (row-level parse issues) but continue
          console.warn('[partnerCsv] PapaParse reported errors:', result.errors)
        }

        const cleaned = result.data.map(cleanPartnerRow)
        resolve(cleaned)
      },

      error(err) {
        reject(new Error(`CSV-Parsing fehlgeschlagen: ${err.message}`))
      }
    })
  })
}

/**
 * cleanPartnerRow(row)
 *
 * Normalises a single parsed CSV row:
 *   - Trims all string field values
 *   - Zero-pads PLZ to 5 digits
 *   - Ensures Ident is a string
 *
 * All other fields (opening-hour flags, Lat, Lng, Email, Tel) are left
 * as strings — the consuming code handles its own type coercion.
 *
 * @param {object} row – raw object from PapaParse
 * @returns {object}   – cleaned partner object
 */
function cleanPartnerRow(row) {
  const cleaned = {}

  for (const [key, value] of Object.entries(row)) {
    cleaned[key] = typeof value === 'string' ? value.trim() : value
  }

  // Zero-pad PLZ: "3044" → "03044", "72070" → "72070"
  if (cleaned.PLZ !== undefined) {
    cleaned.PLZ = normalizePostalCode(cleaned.PLZ)
  }

  return cleaned
}
