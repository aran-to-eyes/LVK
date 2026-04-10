
<template>
  <BaseSection :variant="variant" :size="size">
    <h2 v-if="title" class="content-section__title">{{ title }}</h2>
    <div class="content-section__body">
      <slot />
    </div>
  </BaseSection>
</template>

<script setup>
import BaseSection from '@/components/base/BaseSection.vue'

defineProps({
  title:   { type: String, default: '' },
  variant: { type: String, default: '' },
  size:    { type: String, default: '' }
})
</script>

<style scoped>
.content-section__title {
  margin-bottom: var(--space-8);
}

.content-section__body {
  max-width: var(--container-narrow);
}
</style>
