
<template>
  <p
    v-if="status !== 'idle'"
    class="search-status"
    :class="`search-status--${status}`"
    role="status"
    aria-live="polite"
  >
    <template v-if="status === 'loading'">
      <span class="search-status__dot search-status__dot--pulse" aria-hidden="true" />
      Suche läuft …
    </template>

    <template v-else-if="status === 'resolved' && resultCount > 0">
      <span class="search-status__dot search-status__dot--success" aria-hidden="true" />
      {{ resultCount }} {{ resultCount === 1 ? 'Ergebnis' : 'Ergebnisse' }}
      <template v-if="resolvedLocation">
        in der Nähe von
        <strong>{{ resolvedLocation.postalCode || '' }} {{ resolvedLocation.city }}</strong>
      </template>
    </template>

    <template v-else-if="status === 'resolved' && resultCount === 0">
      <span class="search-status__dot search-status__dot--warn" aria-hidden="true" />
      Keine Partner in diesem Bereich gefunden.
    </template>

    <template v-else-if="status === 'not-found'">
      <span class="search-status__dot search-status__dot--warn" aria-hidden="true" />
      Ort nicht gefunden. Bitte Schreibweise prüfen.
    </template>

    <template v-else-if="status === 'error'">
      <span class="search-status__dot search-status__dot--error" aria-hidden="true" />
      Suche fehlgeschlagen. Bitte später erneut versuchen.
    </template>
  </p>
</template>

<script setup>
defineProps({
  status:          { type: String, default: 'idle' },
  resolvedLocation: { type: Object, default: null },
  resultCount:     { type: Number, default: 0 }
})
</script>

<style scoped>
.search-status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  margin-top: var(--space-3);
  color: var(--color-text-secondary);
}

.search-status__dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.search-status__dot--pulse {
  background: var(--color-primary-light);
  animation: pulse 1.2s ease-in-out infinite;
}

.search-status__dot--success { background: var(--color-success); }
.search-status__dot--warn    { background: var(--color-warning); }
.search-status__dot--error   { background: var(--color-error); }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
</style>
