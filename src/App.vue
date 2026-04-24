
<template>
  <div id="app-root">
    <AppHeader />

    <main id="main-content" tabindex="-1">
      <RouterView />
    </main>

    <HotlineBanner/>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HotlineBanner from './components/sections/HotlineBanner.vue'
</script>

<style>
#app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main-content {
  flex: 1;
  outline: none;
}
</style>
