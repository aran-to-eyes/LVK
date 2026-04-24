
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

const cleanPhone = computed(() =>
  (props.partner.Tel || '').replace(/\s/g, '')
)

// OSM or fallback map URL
const mapLink = computed(() => getPartnerMapLink(props.partner))
</script>
