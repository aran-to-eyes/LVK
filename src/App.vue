<!--
  App.vue
  Root component. Renders the persistent shell (header + footer) around
  the router-driven page content.

  The #main-content id is targeted by the skip-navigation link in index.html,
  allowing keyboard users to bypass the header on every page load.
-->
<template>
  <div id="app-root">
    <!-- Persistent site header with navigation -->
    <AppHeader />

    <!-- Page content injected here by Vue Router -->
    <main id="main-content" tabindex="-1">
      <RouterView />
    </main>
    
    <HotlineBanner/>
    <!-- Persistent site footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HotlineBanner from './components/sections/HotlineBanner.vue'
</script>

<style>
/*
  Global app-root styles.
  Using a flex column layout to ensure the footer is always pushed to the
  bottom even on short pages.
*/
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
