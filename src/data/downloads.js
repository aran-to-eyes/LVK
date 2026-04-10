/**
 * data/downloads.js
 *
 * List of downloadable files shown on the Downloads page.
 *
 * How to add a new download:
 *   1. Place the file in /public/downloads/
 *   2. Add an entry to the array below with the correct `file` path.
 *
 * Fields:
 *   title    – display name
 *   file     – path relative to /public (will be served as a static asset)
 *   type     – short type label shown in the UI (e.g. "PDF", "ZIP")
 *   size     – human-readable file size string (e.g. "1.2 MB")
 *   category – used to group downloads in the UI
 *   date     – last updated date string (YYYY-MM-DD)
 */

export const downloads = [
  {
    title: 'Low Vision Kreis - Beitrittserklärung',
    file: `${import.meta.env.BASE_URL}downloads/2023_Beitrittserkla_rung.pdf`,
    type: 'PDF',
    size: '74 KB',
    category: 'Beitrittserklärung',
    date: '2023-05-01'
  },
  {
    title: 'Low Vision Kreis - Anmeldeformular',
    file: `${import.meta.env.BASE_URL}downloads/Anmeldung_extern.pdf`,
    type: 'PDF',
    size: '375 KB',
    category: 'Formular',
    date: '2023-03-15'
  }
]

/**
 * Returns all unique category strings found in the downloads array.
 * Used by the UI to build filter tabs or section headings.
 */
export function getDownloadCategories() {
  const seen = new Set()
  for (const d of downloads) {
    seen.add(d.category)
  }
  return Array.from(seen)
}
