
<template>
  <component
    :is="tag"
    :class="containerClasses"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  narrow: { type: Boolean, default: false },
  wide:   { type: Boolean, default: false },
  tag:    { type: String, default: 'div' }
})

const containerClasses = computed(() => [
  'container',
  props.narrow && 'container--narrow',
  props.wide && 'container--wide'
].filter(Boolean))
</script>
