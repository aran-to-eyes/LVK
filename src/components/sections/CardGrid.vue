
<template>
  <BaseSection :variant="variant">
    <SectionIntro
      v-if="title"
      :label="label"
      :title="title"
      :body="body"
    />
    <div
      class="card-grid"
      :class="{
        'card-grid--2': columns === '2',
        'card-grid--3': columns === '3'
      }"
    >
      <slot />
    </div>
  </BaseSection>
</template>

<script setup>
import BaseSection from '@/components/base/BaseSection.vue'
import SectionIntro from '@/components/sections/SectionIntro.vue'

defineProps({
  label:   { type: String, default: '' },
  title:   { type: String, default: '' },
  body:    { type: String, default: '' },
  columns: { type: String, default: 'auto' },
  variant: { type: String, default: '' }
})
</script>
