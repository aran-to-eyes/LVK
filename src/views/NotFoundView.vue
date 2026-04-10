
<template>
  <div>
    <BaseSection size="lg">
      <div class="not-found">
        <p class="not-found__code" aria-hidden="true">404</p>
        <h1 class="not-found__title">Seite nicht gefunden</h1>
        <p class="not-found__body lead">
          Die gesuchte Seite existiert leider nicht oder wurde verschoben.
        </p>
        <div class="not-found__actions">
          <BaseButton to="/" variant="primary" size="lg">
            Zur Startseite
          </BaseButton>
          <BaseButton to="/experts-near-you" variant="secondary" size="lg">
            Experten suchen
          </BaseButton>
        </div>
      </div>
    </BaseSection>
  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import BaseSection from '@/components/base/BaseSection.vue'
import BaseButton from '@/components/base/BaseButton.vue'

useMeta({ title: 'Seite nicht gefunden' })
</script>

<style scoped>
.not-found {
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}

.not-found__code {
  font-size: 6rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-border-strong);
  line-height: 1;
  margin-bottom: var(--space-4);
  user-select: none;
}

.not-found__title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-4);
}

.not-found__body {
  margin-bottom: var(--space-8);
  max-width: 45ch;
  margin-left: auto;
  margin-right: auto;
}

.not-found__actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}
</style>
