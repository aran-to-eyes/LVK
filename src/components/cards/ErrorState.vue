
<template>
  <div class="state-box state-box--error" role="alert">
    <div class="state-box__icon" aria-hidden="true">⚠️</div>
    <p class="state-box__title">{{ title }}</p>
    <p v-if="message" class="state-box__body">{{ message }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title:   { type: String, default: 'Ein Fehler ist aufgetreten' },
  message: { type: String, default: '' }
})
</script>
