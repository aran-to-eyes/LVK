
<template>
  <component
    :is="tag"
    :id="id"
    :class="sectionClasses"
  >
    <BaseContainer v-if="!noContainer">
      <slot />
    </BaseContainer>
    <slot v-else />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import BaseContainer from '@/components/base/BaseContainer.vue'

const props = defineProps({
  variant:     { type: String, default: '' },
  size:        { type: String, default: '' },
  noContainer: { type: Boolean, default: false },
  tag:         { type: String, default: 'section' },
  id:          { type: String, default: null }
})

const sectionClasses = computed(() => [
  'section',
  props.variant && `section--${props.variant}`,
  props.size && `section--${props.size}`
].filter(Boolean))
</script>
