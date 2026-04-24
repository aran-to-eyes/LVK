
<template>
  <article class="partner-card" :aria-label="member.Bezeichnung">

    <div v-if="member.Image" class="partner-card__image-wrap">
      <img
        :src="baseUrl + member.Image"
        :alt="member.Bezeichnung"
        class="partner-card__image"
      />
    </div>

    <div class="partner-card__header">
      <h3 class="partner-card__name">{{ member.Bezeichnung }}</h3>
    </div>

    <address class="partner-card__address" style="font-style: normal">
      <span v-if="member.Strasse">{{ member.Strasse }}<br /></span>
      {{ member.PLZ }} {{ member.Ort }}
    </address>

    <div v-if="member.Tel || member.Email" class="partner-card__contacts">
      <a
        v-if="member.Tel"
        :href="`tel:${cleanPhone}`"
        class="partner-card__contact-link"
        :aria-label="`Telefon: ${member.Tel}`"
      >
        <span aria-hidden="true">📞</span>
        {{ member.Tel }}
      </a>
      <a
        v-if="member.Email"
        :href="`mailto:${member.Email}`"
        class="partner-card__contact-link"
        :aria-label="`E-Mail: ${member.Email}`"
      >
        <span aria-hidden="true">✉</span>
        {{ member.Email }}
      </a>
    </div>

  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  member: { type: Object, required: true }
})

const baseUrl = import.meta.env.BASE_URL

const cleanPhone = computed(() =>
  (props.member.Tel || '').replace(/\s/g, '')
)
</script>
