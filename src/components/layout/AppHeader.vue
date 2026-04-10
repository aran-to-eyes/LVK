<!--
  AppHeader.vue

  Sticky site header.

  Layout:
  - Logo is the primary anchor, displayed prominently on the left.
  - Burger menu button is always visible on ALL breakpoints (desktop included).
    There is no inline horizontal nav — all navigation lives in the sidebar.
  - Clicking the burger opens the SidebarNav (MobileNav.vue).

  The "always-burger" pattern keeps the header clean and consistent across
  breakpoints, and gives the logo maximum visual weight.
-->
<template>
  <header class="site-header" role="banner">
    
      <div class="site-header__inner">

        <!-- Logo — primary visual anchor -->
        <RouterLink
          to="/"
          class="site-header__logo"
          aria-label="Low Vision Kreis – zur Startseite"
        >
          <img
            :src="`${base}images/logo.png`"
            alt="Low Vision Kreis"
            class="site-header__logo-img"
          />
        </RouterLink>

        <!-- Burger button — always visible, all breakpoints -->
        <button
          class="hamburger"
          :class="{ 'hamburger--active': navOpen }"
          :aria-expanded="navOpen.toString()"
          aria-controls="sidebar-nav"
          :aria-label="navOpen ? 'Menü schließen' : 'Menü öffnen'"
          @click="toggleNav"
        >
          <span class="hamburger__line" />
          <span class="hamburger__line" />
          <span class="hamburger__line" />
        </button>

      </div>
    

    <!-- Off-canvas sidebar navigation (teleports to <body>) -->
    <SidebarNav
      id="sidebar-nav"
      :open="navOpen"
      @close="closeNav"
    />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import BaseContainer from '@/components/base/BaseContainer.vue'
import SidebarNav from '@/components/layout/MobileNav.vue'

const base = import.meta.env.BASE_URL
const navOpen = ref(false)

function toggleNav() {
  navOpen.value = !navOpen.value
  // Prevent page scroll when sidebar is open
  document.body.style.overflow = navOpen.value ? 'hidden' : ''
}

function closeNav() {
  navOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
/* Burger button — absolutely positioned to the right so the logo stays centered */
.hamburger {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 25%;
  height: 50%;
  aspect-ratio: 1;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  cursor: pointer;
  background: none;
  border: var(--border-width) solid transparent;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.hamburger:hover {
  background-color: var(--color-bg-alt);
  border-color: var(--color-border);
}

.hamburger:focus-visible {
  outline: var(--border-width-thick) solid var(--color-primary-light);
  outline-offset: 2px;
}

.hamburger__line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  border-radius: 2px;
  transition: transform var(--transition-base), opacity var(--transition-base);
}

/* × animation when active */
.hamburger--active .hamburger__line:nth-child(1) {
  transform: translateY(12px) rotate(45deg);
}
.hamburger--active .hamburger__line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger--active .hamburger__line:nth-child(3) {
  transform: translateY(-12px) rotate(-45deg);
}

/* Logo image — taller than before for stronger visual presence */
.site-header__logo-img {
  height: 100%;
}
</style>
