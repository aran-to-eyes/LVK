/**
 * utils/distance.js
 *
 * Geographic distance calculation using the Haversine formula.
 *
 * WHY Haversine?
 * The Haversine formula gives the great-circle distance between two points on
 * a sphere given their longitudes and latitudes. For the scale of Germany
 * (~900 km north-south) and the use case of finding the "nearest" partner,
 * Haversine accuracy is more than sufficient — the error against an exact
 * ellipsoidal calculation is well under 0.5%.
 *
 * We do NOT use flat-earth distance because distances of 200+ km across
 * Germany would accumulate meaningful error.
 */

/** Earth's mean radius in kilometres (WGS-84 approximation) */
const EARTH_RADIUS_KM = 6371

/**
 * toRadians(degrees)
 * Converts a degree value to radians.
 * @param {number} deg
 * @returns {number}
 */
function toRadians(deg) {
  return (deg * Math.PI) / 180
}

/**
 * haversineDistance(lat1, lon1, lat2, lon2)
 *
 * Returns the great-circle distance in kilometres between two geographic
 * coordinates.
 *
 * Parameters are all decimal degrees (WGS-84).
 *
 * @param {number} lat1 – latitude of point A
 * @param {number} lon1 – longitude of point A
 * @param {number} lat2 – latitude of point B
 * @param {number} lon2 – longitude of point B
 * @returns {number} distance in kilometres
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const sinHalfLat = Math.sin(dLat / 2)
  const sinHalfLon = Math.sin(dLon / 2)

  const a =
    sinHalfLat * sinHalfLat +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * sinHalfLon * sinHalfLon

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_KM * c
}

/**
 * formatDistance(km)
 *
 * Returns a human-readable distance string.
 *
 * Rules:
 *   < 1 km    → "< 1 km"
 *   < 10 km   → one decimal place, e.g. "3.4 km"
 *   ≥ 10 km   → rounded to whole km, e.g. "42 km"
 *
 * @param {number} km
 * @returns {string}
 */
export function formatDistance(km) {
  if (km < 1) return '< 1 km'
  if (km < 10) return `${km.toFixed(1)} km`
  return `${Math.round(km)} km`
}

/**
 * sortPartnersByDistance(partners, refLat, refLng)
 *
 * Takes an array of partner objects (each with numeric .Lat and .Lng fields)
 * and a reference coordinate. Returns a NEW array sorted ascending by
 * Haversine distance, with a `distanceKm` property added to each partner.
 *
 * Partners with invalid coordinates (NaN, null, undefined, or out of
 * plausible German bounds) are filtered out before sorting.
 *
 * "Plausible German bounds" check:
 *   Lat: 47.2 – 55.1   (Germany's southern and northern extents)
 *   Lng:  5.8 – 15.1   (Germany's western and eastern extents)
 * This prevents partners with coordinate errors (e.g. 0,0) from appearing.
 *
 * @param {object[]} partners
 * @param {number} refLat
 * @param {number} refLng
 * @returns {object[]} sorted partners with distanceKm added
 */
export function sortPartnersByDistance(partners, refLat, refLng) {
  return partners
    .filter((p) => {
      const lat = parseFloat(p.Lat)
      const lng = parseFloat(p.Lng)
      if (isNaN(lat) || isNaN(lng)) return false
      if (lat < 47.2 || lat > 55.1) return false
      if (lng < 5.8 || lng > 15.1) return false
      return true
    })
    .map((p) => ({
      ...p,
      distanceKm: haversineDistance(refLat, refLng, parseFloat(p.Lat), parseFloat(p.Lng))
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
}
