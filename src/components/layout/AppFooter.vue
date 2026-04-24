
<template>
  <footer class="site-footer" role="contentinfo">
    <BaseContainer>
      <div class="site-footer__bottom">
        <span>© {{ currentYear }} Low Vision Kreis. Alle Rechte vorbehalten.</span>
        <nav aria-label="Rechtliche Links" class="footer-legal-nav">
          <RouterLink to="/legal-notice" class="footer-legal-link">Impressum</RouterLink>
          <RouterLink to="/privacy-policy" class="footer-legal-link">Datenschutz</RouterLink>
          <RouterLink to="/accessibility" class="footer-legal-link">Barrierefreiheit</RouterLink>
        </nav>
      </div>

    </BaseContainer>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import BaseContainer from '@/components/base/BaseContainer.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-legal-nav {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.footer-legal-link {
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
}

.footer-legal-link:hover {
  color: rgba(255, 255, 255, 0.8);
}
</style>
