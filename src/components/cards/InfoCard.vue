
<template>
  <article class="card">
    <div v-if="icon" class="card__icon" aria-hidden="true">{{ icon }}</div>
    <h3 class="card__title">{{ title }}</h3>
    <RichText :content="text" class="card__body" />
  </article>
</template>

<script setup>
import RichText from '@/components/base/RichText.vue'

defineProps({
  icon:  { type: String, default: '' },
  title: { type: String, required: true },
  text:  { type: String, required: true }
})
</script>
