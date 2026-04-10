
<template>
  <div class="section-intro">
    <span v-if="label" class="section-intro__label">{{ label }}</span>
    <component :is="`h${headingLevel}`" class="section-intro__title">{{ title }}</component>
    <RichText v-if="body" :content="body" class="section-intro__body" />
  </div>
</template>

<script setup>
import RichText from '@/components/base/RichText.vue'

defineProps({
  label:        { type: String, default: '' },
  title:        { type: String, required: true },
  body:         { type: String, default: '' },
  headingLevel: { type: String, default: '2' }
})
</script>
