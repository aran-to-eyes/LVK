/**
 * utils/maps.js
 *
 * Generates map links for partner locations.
 *
 * WHY OpenStreetMap as default?
 * The partners have lat/lng coordinates in the CSV, so we can link directly
 * to a pin on OpenStreetMap without any API key. OSM is also privacy-friendly
 * (no Google tracking). A Google Maps alternative is provided in comments.
 *
 * Privacy note: these links are opened by the user on demand (click/tap)
 * and are not prefetched. No coordinates are sent to any server until the
 * user explicitly opens a map link.
 */

/**
 * getOsmLink(lat, lng, label)
 *
 * Generates an OpenStreetMap URL that shows a named marker at the given
 * coordinates and zooms to street level (zoom=16).
 *
 * @param {number|string} lat
 * @param {number|string} lng
 * @param {string} [label] – optional marker label / partner name
 * @returns {string} OpenStreetMap URL
 */
export function getOsmLink(lat, lng, label) {
  const latNum = parseFloat(lat)
  const lngNum = parseFloat(lng)
  if (isNaN(latNum) || isNaN(lngNum)) return null

  // OSM "marker" link format
  const base = 'https://www.openstreetmap.org'
  const params = new URLSearchParams({
    mlat: latNum.toFixed(6),
    mlon: lngNum.toFixed(6)
  })
  return `${base}/?${params.toString()}#map=16/${latNum.toFixed(4)}/${lngNum.toFixed(4)}`
}

/**
 * getGoogleMapsLink(street, postalCode, city)
 *
 * Generates a Google Maps search URL for a street address.
 * Use this as an alternative to getOsmLink() if preferred.
 *
 * @param {string} street
 * @param {string} postalCode
 * @param {string} city
 * @returns {string} Google Maps search URL
 */
export function getGoogleMapsLink(street, postalCode, city) {
  const query = encodeURIComponent(`${street}, ${postalCode} ${city}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

/**
 * getPartnerMapLink(partner)
 *
 * Convenience function that returns an OSM link for a partner object if
 * it has valid coordinates, otherwise falls back to a Google Maps address
 * search.
 *
 * @param {object} partner – cleaned partner row from partnerCsv.js
 * @returns {string|null}
 */
export function getPartnerMapLink(partner) {
  const lat = parseFloat(partner.Lat)
  const lng = parseFloat(partner.Lng)

  if (!isNaN(lat) && !isNaN(lng)) {
    return getOsmLink(lat, lng, partner.Bezeichnung)
  }

  // Coordinate-less fallback: address search on Google Maps
  if (partner.Strasse && partner.PLZ && partner.Ort) {
    return getGoogleMapsLink(partner.Strasse, partner.PLZ, partner.Ort)
  }

  return null
}
