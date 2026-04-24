<template>
  <ul class="main-nav" role="list">
    <span v-for="item in mainNav" :key="item.to">
      <RouterLink
        :to="item.to"
        class="main-nav__link"
        :exact-active-class="item.to === '/' ? 'router-link-exact-active' : undefined"
        :active-class="item.to !== '/' ? 'router-link-active' : undefined"
      >
        {{ item.label }}
      </RouterLink>
    </span>
  </ul>
</template>

<script setup>
import { mainNav } from '@/data/navigation.js'
</script>
