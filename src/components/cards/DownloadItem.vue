
<template>
  <a
    :href="file"
    :download="fileName"
    class="download-item"
    :aria-label="`${title} herunterladen (${type}, ${size})`"
  >
    <span class="download-item__icon" aria-hidden="true">
      {{ typeIcon }}
    </span>

    <div class="download-item__info">
      <p class="download-item__title">{{ title }}</p>
      <p class="download-item__meta">
        {{ type }} · {{ size }}
        <span v-if="date"> · Aktualisiert: {{ formattedDate }}</span>
      </p>
    </div>

    <span class="download-item__type">{{ type }}</span>
  </a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title:    { type: String, required: true },
  file:     { type: String, required: true },
  type:     { type: String, default: 'PDF' },
  size:     { type: String, default: '' },
  category: { type: String, default: '' },
  date:     { type: String, default: '' }
})

const fileName = computed(() => props.file.split('/').pop())

const typeIcon = computed(() => {
  const icons = { PDF: '📄', ZIP: '📦', DOCX: '📝', XLSX: '📊' }
  return icons[props.type.toUpperCase()] || '📎'
})

const formattedDate = computed(() => {
  if (!props.date) return ''
  try {
    return new Date(props.date).toLocaleDateString('de-DE', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    })
  } catch {
    return props.date
  }
})
</script>
