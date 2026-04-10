<!--
  MainNav.vue

  Horizontal desktop navigation bar.
  Reads link data from src/data/navigation.js.

  RouterLink applies .router-link-active automatically when the current
  route starts with the link's `to` path. We use `exact-active-class` for
  the home route ("/") to prevent it from matching every route.
-->
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
