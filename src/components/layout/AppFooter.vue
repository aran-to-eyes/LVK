
<template>
  <footer class="site-footer" role="contentinfo">
    <BaseContainer>
      <!-- Bottom bar -->
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
.footer-brand__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inverse);
  text-decoration: none;
  margin-bottom: var(--space-4);
}

.footer-brand__tagline {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.65);
  line-height: var(--line-height-relaxed);
  max-width: 30ch;
  margin-bottom: var(--space-4);
}

.footer-brand__contact {
  font-style: normal;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.footer-contact-link {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-contact-link:hover {
  color: var(--color-text-inverse);
}

.footer-group__heading {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: var(--space-4);
}

.footer-group__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
}

.footer-link:hover,
.footer-link.router-link-active {
  color: var(--color-text-inverse);
}

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
