/**
 * composables/usePartners.js
 *
 * Provides reactive access to the partner dataset.
 *
 * The partners array is loaded once per page session and shared across all
 * component instances via module-level reactive state. Subsequent calls to
 * usePartners() return the same cached state without re-fetching.
 *
 * Usage:
 *   const { partners, loading, error, loadPartners } = usePartners()
 *   // loadPartners() is called automatically on first use
 *
 * State shape:
 *   partners  – reactive array of cleaned partner objects (see partnerCsv.js)
 *   loading   – boolean, true while the fetch is in progress
 *   error     – string or null, set if loading fails
 */

import { ref, readonly } from 'vue'
import { fetchAndParsePartners } from '@/utils/partnerCsv.js'

// ---------------------------------------------------------------------------
// Module-level singleton state
// Shared across all component instances so the CSV is fetched exactly once.
// ---------------------------------------------------------------------------
const partners = ref([])
const loading = ref(false)
const error = ref(null)
let loadPromise = null   // prevents concurrent fetch calls

/**
 * usePartners()
 *
 * Returns reactive partner state. Automatically initiates loading if the
 * data has not been fetched yet.
 *
 * Returns:
 *   partners  – readonly reactive array of partner objects
 *   loading   – readonly reactive boolean
 *   error     – readonly reactive string | null
 *   loadPartners – function to manually trigger (re)loading
 */
export function usePartners() {
  // Kick off loading automatically on first composable use
  if (partners.value.length === 0 && !loading.value && !error.value) {
    loadPartners()
  }

  return {
    partners: readonly(partners),
    loading: readonly(loading),
    error: readonly(error),
    loadPartners
  }
}

/**
 * loadPartners()
 *
 * Fetches and parses the partner CSV.
 * Deduplicates concurrent calls — if loading is already in progress,
 * returns the existing promise.
 *
 * @returns {Promise<void>}
 */
async function loadPartners() {
  // Already loaded or loading in progress
  if (loadPromise) return loadPromise
  if (partners.value.length > 0) return

  loading.value = true
  error.value = null

  loadPromise = fetchAndParsePartners()
    .then((data) => {
      partners.value = data
    })
    .catch((err) => {
      console.error('[usePartners] Failed to load partners:', err)
      error.value =
        'Die Partnerdaten konnten leider nicht geladen werden. ' +
        'Bitte versuchen Sie es später erneut.'
    })
    .finally(() => {
      loading.value = false
      loadPromise = null
    })

  return loadPromise
}
