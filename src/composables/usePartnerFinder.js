/**
 * composables/usePartnerFinder.js
 *
 * Implements the nearest-partner search feature.
 *
 * SEARCH FLOW:
 *   1. User provides a query string (city name or postal code)
 *   2. We detect whether it looks like a 5-digit German postal code
 *   3a. Postal code → resolveByPostalCode() in gazetteer.js
 *   3b. City name   → resolveByCity() in gazetteer.js (exact → normalised → fuzzy)
 *   4. If the gazetteer returns nothing → optional fallback geocoder
 *   5. We now have a reference coordinate { latitude, longitude }
 *   6. sortPartnersByDistance() computes Haversine distance to every partner
 *   7. We return the 3 nearest partners as the result
 *
 * STATUS values:
 *   'idle'        – no search has been performed yet
 *   'loading'     – search is in progress
 *   'resolved'    – results found successfully (may return 0–3 partners)
 *   'not-found'   – the gazetteer and fallback could not resolve the input
 *   'error'       – an unexpected error occurred (network failure etc.)
 *
 * Usage:
 *   const { status, results, resolvedLocation, suggestions, search, reset } =
 *     usePartnerFinder(partners)
 *
 * @param {import('vue').Ref<object[]>} partnersRef – reactive partner array from usePartners()
 */

import { ref, readonly } from 'vue'
import { isGermanPostalCode, normalizeSearchInput } from '@/utils/normalize.js'
import { resolveByPostalCode, resolveByCity, centroidOf } from '@/utils/gazetteer.js'
import { sortPartnersByDistance } from '@/utils/distance.js'
import { tryFallbackGeocode } from '@/services/geocoderFallback.js'

/** Number of nearest partners to return */
const RESULT_COUNT = 3

/**
 * usePartnerFinder(partnersRef)
 *
 * @param {import('vue').Ref<object[]>} partnersRef
 */
export function usePartnerFinder(partnersRef) {
  const status = ref('idle')
  const results = ref([])
  const resolvedLocation = ref(null)   // { latitude, longitude, city, postalCode? }
  const suggestions = ref([])          // non-empty when multiple city matches exist

  // ---------------------------------------------------------------------------
  // search(queryString)
  // ---------------------------------------------------------------------------
  /**
   * Runs the full search pipeline for the given user input.
   * Updates status, results, and resolvedLocation reactively.
   *
   * @param {string} queryString – raw input from the search box
   */
  async function search(queryString) {
    const query = normalizeSearchInput(queryString)
    if (!query) return

    status.value = 'loading'
    results.value = []
    resolvedLocation.value = null
    suggestions.value = []

    try {
      const coordinate = await resolveCoordinate(query)

      if (!coordinate) {
        status.value = 'not-found'
        return
      }

      resolvedLocation.value = coordinate

      // Compute distances and sort partners
      const sorted = sortPartnersByDistance(
        partnersRef.value,
        coordinate.latitude,
        coordinate.longitude
      )

      results.value = sorted.slice(0, RESULT_COUNT)
      status.value = 'resolved'
    } catch (err) {
      console.error('[usePartnerFinder] Search error:', err)
      status.value = 'error'
    }
  }

  // ---------------------------------------------------------------------------
  // reset()
  // ---------------------------------------------------------------------------
  /**
   * Resets the search state back to idle.
   * Call this when the user clears the input.
   */
  function reset() {
    status.value = 'idle'
    results.value = []
    resolvedLocation.value = null
    suggestions.value = []
  }

  return {
    status: readonly(status),
    results: readonly(results),
    resolvedLocation: readonly(resolvedLocation),
    suggestions: readonly(suggestions),
    search,
    reset
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * resolveCoordinate(query)
 *
 * Runs the coordinate resolution pipeline for the cleaned query string.
 * Returns { latitude, longitude, city, postalCode? } or null.
 *
 * @param {string} query – normalised (trimmed) user input
 * @returns {Promise<object|null>}
 */
async function resolveCoordinate(query) {
  // --- Branch A: postal code ---
  if (isGermanPostalCode(query)) {
    /*const entry = await resolveByPostalCode(query)
    if (entry) {
      return {
        latitude: entry.latitude,
        longitude: entry.longitude,
        city: entry.city,
        postalCode: entry.postalCode
      }
    }*/
    // Postal code not in local gazetteer → try fallback geocoder
    return tryFallbackGeocode(query)
  }

  /*
  // --- Branch B: city name ---
  const entries = await resolveByCity(query)

  if (entries.length > 0) {
    // Multiple entries for the same city are expected (one per PLZ area).
    // Use the centroid so that partners on all sides of a large city are
    // weighted equally.
    const coord = centroidOf(entries)
    return {
      latitude: coord.latitude,
      longitude: coord.longitude,
      city: coord.city
    }
  }
*/
  // City not found locally → try fallback geocoder
  return tryFallbackGeocode(query)
}
