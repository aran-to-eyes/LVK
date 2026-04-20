const EARTH_RADIUS_KM = 6371

function toRadians(deg) {
  return (deg * Math.PI) / 180
}

export function haversineDistance(lat1, lon1, lat2, lon2) {
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(km) {
  if (km < 1) return '< 1 km'
  if (km < 10) return `${km.toFixed(1)} km`
  return `${Math.round(km)} km`
}

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
