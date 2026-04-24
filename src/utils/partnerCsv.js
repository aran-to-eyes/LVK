import Papa from 'papaparse'
import { normalizePostalCode } from '@/utils/normalize.js'

const CSV_URL = `${import.meta.env.BASE_URL}data/Lowvision-partner_Stand_2023-5-010.csv`

export async function fetchAndParsePartners() {
  const response = await fetch(CSV_URL)

  if (!response.ok) {
    throw new Error(`Partnerdaten konnten nicht geladen werden (HTTP ${response.status}).`)
  }

  const csvText = await response.text()

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      delimiter: ';',
      transformHeader: (h) => h.trim(),
      skipEmptyLines: true,

      complete(result) {
        if (result.errors?.length > 0) {
          console.warn('[partnerCsv] parse errors:', result.errors)
        }
        resolve(result.data.map(cleanPartnerRow))
      },

      error(err) {
        reject(new Error(`CSV-Parsing fehlgeschlagen: ${err.message}`))
      }
    })
  })
}

function parseGermanCoord(raw, isLat) {
  if (!raw) return NaN
  const s = String(raw).trim()
  if ((s.match(/\./g) || []).length <= 1) return parseFloat(s)
  const digits = s.replace(/\./g, '')
  if (!/^\d+$/.test(digits)) return NaN
  const pos = isLat ? 2 : (parseInt(digits.slice(0, 2)) <= 15 ? 2 : 1)
  return parseFloat(digits.slice(0, pos) + '.' + digits.slice(pos))
}

function cleanPartnerRow(row) {
  const cleaned = {}
  for (const [key, value] of Object.entries(row)) {
    cleaned[key] = typeof value === 'string' ? value.trim() : value
  }
  if (cleaned.PLZ !== undefined) {
    cleaned.PLZ = normalizePostalCode(cleaned.PLZ)
  }
  if (cleaned.Lat !== undefined) cleaned.Lat = parseGermanCoord(cleaned.Lat, true)
  if (cleaned.Lng !== undefined) cleaned.Lng = parseGermanCoord(cleaned.Lng, false)
  return cleaned
}
