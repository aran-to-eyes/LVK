
<template>
  <article class="partner-card" :aria-label="partner.Bezeichnung">

    <!-- Header row: name + distance badge -->
    <div class="partner-card__header">
      <h3 class="partner-card__name">{{ partner.Bezeichnung }}</h3>
      <span class="partner-card__distance" aria-label="Entfernung">
        {{ formattedDistance }}
      </span>
    </div>

    <!-- Address -->
    <address class="partner-card__address" style="font-style: normal">
      {{ partner.Strasse }}<br />
      {{ partner.PLZ }} {{ partner.Ort }}
    </address>

    <!-- Contact links -->
    <div class="partner-card__contacts">
      <a
        v-if="partner.Tel"
        :href="`tel:${cleanPhone}`"
        class="partner-card__contact-link"
        :aria-label="`Telefon: ${partner.Tel}`"
      >
        <span aria-hidden="true">📞</span>
        {{ partner.Tel }}
      </a>
      <a
        v-if="partner.Email"
        :href="`mailto:${partner.Email}`"
        class="partner-card__contact-link"
        :aria-label="`E-Mail: ${partner.Email}`"
      >
        <span aria-hidden="true">✉</span>
        {{ partner.Email }}
      </a>
    </div>

    <!-- Opening hours compact summary -->
    <div v-if="openingHoursSummary" class="partner-card__hours">
      <strong>Öffnungszeiten:</strong> {{ openingHoursSummary }}
    </div>

    <!-- Open in maps link -->
    <a
      v-if="mapLink"
      :href="mapLink"
      class="partner-card__map-link"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`${partner.Bezeichnung} auf Karte anzeigen`"
    >
      🗺 Auf Karte anzeigen
    </a>

  </article>
</template>

<script setup>
import { computed } from 'vue'
import { formatDistance } from '@/utils/distance.js'
import { getCompactOpeningHours } from '@/utils/openingHours.js'
import { getPartnerMapLink } from '@/utils/maps.js'

const props = defineProps({
  /**
   * Partner object: cleaned CSV row + distanceKm added by sortPartnersByDistance.
   * All original CSV column names (Bezeichnung, Strasse, PLZ, Ort, Tel, Email,
   * Lat, Lng, Mo_9_Uhr, ...) are present.
   */
  partner: { type: Object, required: true }
})

const formattedDistance = computed(() => formatDistance(props.partner.distanceKm))

// Strip whitespace from phone number for the tel: href
const cleanPhone = computed(() =>
  (props.partner.Tel || '').replace(/\s/g, '')
)

// Compact opening hours string, e.g. "Mo–Fr 09:00–18:00, Sa 09:00–13:00"
const openingHoursSummary = computed(() =>
  getCompactOpeningHours(props.partner)
)

// OSM or fallback map URL
const mapLink = computed(() => getPartnerMapLink(props.partner))
</script>
