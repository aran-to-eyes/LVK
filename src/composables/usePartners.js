import { ref, readonly } from 'vue'
import { fetchAndParsePartners } from '@/utils/partnerCsv.js'

const partners = ref([])
const loading = ref(false)
const error = ref(null)
let loadPromise = null

export function usePartners() {
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

async function loadPartners() {
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
