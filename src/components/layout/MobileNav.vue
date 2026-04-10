<!--
  MobileNav.vue  (used as SidebarNav in AppHeader)

  Off-canvas sidebar navigation panel. Works on all breakpoints.

  Behaviour:
  - Renders via <Teleport to="body"> to avoid z-index stacking issues with
    the sticky header.
  - A semi-transparent backdrop covers the page; clicking it closes the sidebar.
  - The sidebar slides in from the right.
  - Closes on: backdrop click, close button, Escape key, nav link click.

  Props:
    open – controls visibility (controlled by AppHeader)
    id   – applied to the panel for aria-controls reference

  Emits:
    close – parent should set open to false
-->
<template>
  <Teleport to="body">
    <!-- Backdrop — fades in, closes sidebar on click -->
    <Transition name="fade">
      <div
        v-if="open"
        class="nav-backdrop"
        aria-hidden="true"
        @click="$emit('close')"
      />
    </Transition>

    <!-- Sidebar panel — slides in from the right -->
    <Transition name="sidebar-slide">
      <div
        v-if="open"
        :id="id"
        class="sidebar-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >

       
        <!-- Primary navigation links -->
        <nav class="sidebar-nav__nav" aria-label="Hauptnavigation">
          <RouterLink
            v-for="item in mainNav"
            :key="item.to"
            :to="item.to"
            class="sidebar-nav__link"
            @click="$emit('close')"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

      </div>
    </Transition>

  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { mainNav } from '@/data/navigation.js'

defineProps({
  open: { type: Boolean, default: false },
  id:   { type: String, default: 'sidebar-nav' }
})

const emit = defineEmits(['close'])

/** Close sidebar on Escape key press */
function handleKeydown(e) {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>
