export function getOsmLink(lat, lng, label) {
  const latNum = parseFloat(lat)
  const lngNum = parseFloat(lng)
  if (isNaN(latNum) || isNaN(lngNum)) return null

  const base = 'https://www.openstreetmap.org'
  const params = new URLSearchParams({
    mlat: latNum.toFixed(6),
    mlon: lngNum.toFixed(6)
  })
  return `${base}/?${params.toString()}#map=16/${latNum.toFixed(4)}/${lngNum.toFixed(4)}`
}

export function getGoogleMapsLink(street, postalCode, city) {
  const query = encodeURIComponent(`${street}, ${postalCode} ${city}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export function getPartnerMapLink(partner) {
  const lat = parseFloat(partner.Lat)
  const lng = parseFloat(partner.Lng)

  if (!isNaN(lat) && !isNaN(lng)) {
    return getOsmLink(lat, lng, partner.Bezeichnung)
  }

  if (partner.Strasse && partner.PLZ && partner.Ort) {
    return getGoogleMapsLink(partner.Strasse, partner.PLZ, partner.Ort)
  }

  return null
}
