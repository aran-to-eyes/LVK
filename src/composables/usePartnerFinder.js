import { ref, readonly } from 'vue'
import { normalizeSearchInput, isGermanPostalCode } from '@/utils/normalize.js'
import { geocode } from '@/services/geocoderFallback.js'
import { sortPartnersByDistance } from '@/utils/distance.js'

const RESULT_COUNT = 3

export function usePartnerFinder(partnersRef) {
  const status = ref('idle')
  const results = ref([])
  const resolvedLocation = ref(null)

  async function search(queryString) {
    const query = normalizeSearchInput(queryString)
    if (!query) return

    status.value = 'loading'
    results.value = []
    resolvedLocation.value = null

    try {
      const coordinate = await resolveCoordinate(query, partnersRef.value)

      if (!coordinate) {
        status.value = 'not-found'
        return
      }

      resolvedLocation.value = coordinate
      const sorted = sortPartnersByDistance(partnersRef.value, coordinate.latitude, coordinate.longitude)
      results.value = sorted.slice(0, RESULT_COUNT)
      status.value = 'resolved'
    } catch (err) {
      console.error('[usePartnerFinder]', err)
      status.value = 'error'
    }
  }

  function reset() {
    status.value = 'idle'
    results.value = []
    resolvedLocation.value = null
  }

  return {
    status: readonly(status),
    results: readonly(results),
    resolvedLocation: readonly(resolvedLocation),
    search,
    reset
  }
}

function resolveCoordinate(query, partners) {
  if (isGermanPostalCode(query)) {
    const match = partners.find((p) => p.PLZ === query.trim())
    if (match) {
      return Promise.resolve({ latitude: match.Lat, longitude: match.Lng, city: match.Ort })
    }
  }
  return geocode(query)
}
