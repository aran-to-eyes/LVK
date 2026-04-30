<template>
  <div class="search-results" aria-live="polite" aria-atomic="false">

    <template v-if="status === 'idle'">
      <slot name="idle" />
    </template>

    <LoadingState
      v-else-if="status === 'loading'"
      message="Partner in Ihrer Nähe werden gesucht …"
    />

    <template v-else-if="status === 'resolved' && results.length > 0">
      <div class="search-results__grid">
        <MemberCard
          v-for="partner in results"
          :key="partner.Ident"
          :member="partner"
        />
      </div>
    </template>

    <EmptyState
      v-else-if="status === 'resolved' && results.length === 0"
      icon="🔍"
      title="Keine Partner gefunden"
      :message="noResultsText"
    />

    <EmptyState
      v-else-if="status === 'not-found'"
      icon="📍"
      title="Ort nicht gefunden"
      message="Bitte prüfen Sie die Schreibweise oder geben Sie eine 5-stellige Postleitzahl ein."
    />

    <ErrorState
      v-else-if="status === 'error'"
      title="Suche fehlgeschlagen"
      message="Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
    />

  </div>
  <div class="search-results_divider"></div>
</template>

<script setup>
import MemberCard from '@/components/cards/MemberCard.vue'
import LoadingState from '@/components/cards/LoadingState.vue'
import EmptyState from '@/components/cards/EmptyState.vue'
import ErrorState from '@/components/cards/ErrorState.vue'

defineProps({
  status:          { type: String, default: 'idle' },
  results:         { type: Array, default: () => [] },
  resolvedLocation: { type: Object, default: null },
  noResultsText:   {
    type: String,
    default:
      'Für diesen Ort konnten keine Partner gefunden werden. ' +
      'Bitte prüfen Sie die Schreibweise oder versuchen Sie einen benachbarten Ort.'
  }
})
</script>

<style scoped>
.search-results__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-8);
}

@media (max-width: 640px) {
  .search-results__grid {
    grid-template-columns: 1fr;
  }
}

.search-results_divider{
  display: block;
  margin-top: var(--space-12);
  margin-right: 20%;
  margin-left: 20%;
  height: 1px;
  background-color: var(--color-border);
  box-shadow: var(--shadow-sm);
}
</style>
