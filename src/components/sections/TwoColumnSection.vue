
<template>
  <BaseSection :variant="variant">
    <div
      class="two-col"
      :class="{
        'two-col--reversed': reversed,
        'two-col--wide-left': layout === 'wide-left',
        'two-col--wide-right': layout === 'wide-right'
      }"
    >
      <div class="two-col__left">
        <slot name="left" />
      </div>
      <div class="two-col__right">
        <slot name="right" />
      </div>
    </div>
  </BaseSection>
</template>

<script setup>
import BaseSection from '@/components/base/BaseSection.vue'

defineProps({
  variant:  { type: String, default: '' },
  reversed: { type: Boolean, default: false },
  layout:   { type: String, default: 'equal' }
})
</script>
