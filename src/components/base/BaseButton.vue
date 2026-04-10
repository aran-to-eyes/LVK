
<template>
  <!-- RouterLink for internal navigation -->
  <RouterLink
    v-if="to"
    :to="to"
    :class="buttonClasses"
    :aria-disabled="disabled || undefined"
  >
    <slot />
  </RouterLink>

  <!-- Anchor tag for external URLs -->
  <a
    v-else-if="href"
    :href="href"
    :class="buttonClasses"
    target="_blank"
    rel="noopener noreferrer"
    :aria-disabled="disabled || undefined"
  >
    <slot />
    <!-- Screen-reader notice for external link -->
    <span class="sr-only">(öffnet in neuem Tab)</span>
  </a>

  <!-- Native button for actions (default) -->
  <button
    v-else
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant:  { type: String, default: 'primary' },
  size:     { type: String, default: 'base' },
  to:       { type: [String, Object], default: null },
  href:     { type: String, default: null },
  disabled: { type: Boolean, default: false },
  type:     { type: String, default: 'button' }
})

const buttonClasses = computed(() => [
  'btn',
  `btn--${props.variant}`,
  props.size !== 'base' && `btn--${props.size}`,
  props.disabled && 'btn--disabled'
].filter(Boolean))
</script>
