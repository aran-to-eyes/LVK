
<template>
  <div class="page-header">
    <BaseContainer>
      <h1 class="page-header__title">{{ title }}</h1>
      <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
    </BaseContainer>
  </div>
</template>

<script setup>
import BaseContainer from '@/components/base/BaseContainer.vue'

defineProps({
  title:       { type: String, required: true },
  subtitle:    { type: String, default: '' },
  breadcrumbs: { type: Array, default: () => [] }
})
</script>
