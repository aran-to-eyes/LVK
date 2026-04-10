
<template>
  <div class="state-box state-box--loading" role="status" aria-live="polite">
    <div class="spinner" aria-hidden="true" />
    <p class="state-box__title">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: 'Wird geladen …' }
})
</script>
