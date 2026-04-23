
<template>
  <div class="state-box" role="status" aria-live="polite">
    <div class="state-box__icon" aria-hidden="true">{{ icon }}</div>
    <span class="state-box__title">{{ title }}</span>
    <p v-if="message" class="state-box__body">{{ message }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  icon:    { type: String, default: '🔍' },
  title:   { type: String, default: 'Keine Ergebnisse gefunden' },
  message: { type: String, default: '' }
})
</script>

