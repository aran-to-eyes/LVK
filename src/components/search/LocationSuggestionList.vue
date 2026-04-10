<!--
  LocationSuggestionList.vue

  Shown when a city query resolves to multiple distinct city names and the
  user should choose the intended location.

  In the current implementation this component is only rendered by
  ExpertsNearYouView when usePartnerFinder returns suggestions. It is kept
  separate to avoid growing PartnerSearchBar into an unmanageable combo.

  Props:
    suggestions – array of { city, postalCode, state } objects

  Emits:
    select(suggestion) – user has chosen a specific suggestion
-->
<template>
  <div v-if="suggestions.length > 0" class="suggestion-list" role="listbox" aria-label="Meinten Sie …?">
    <p class="suggestion-list__label">Meinten Sie einen dieser Orte?</p>
    <ul class="suggestion-list__items" role="list">
      <li
        v-for="s in suggestions"
        :key="`${s.postalCode}-${s.city}`"
        class="suggestion-list__item"
        role="option"
        tabindex="0"
        @click="$emit('select', s)"
        @keydown.enter="$emit('select', s)"
        @keydown.space.prevent="$emit('select', s)"
      >
        <span class="suggestion-list__city">{{ s.city }}</span>
        <span class="suggestion-list__meta">
          {{ s.postalCode }}<template v-if="s.state"> · {{ s.state }}</template>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  suggestions: { type: Array, default: () => [] }
})

defineEmits(['select'])
</script>

<style scoped>
.suggestion-list {
  margin-top: var(--space-4);
  background: var(--color-bg);
  border: var(--border-width) solid var(--color-border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
  max-width: 400px;
  box-shadow: var(--shadow-md);
}

.suggestion-list__label {
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  border-bottom: var(--border-width) solid var(--color-border);
  margin: 0;
}

.suggestion-list__items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestion-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  border-bottom: var(--border-width) solid var(--color-border);
}

.suggestion-list__item:last-child {
  border-bottom: none;
}

.suggestion-list__item:hover,
.suggestion-list__item:focus {
  background-color: var(--color-primary-bg);
  outline: none;
}

.suggestion-list__city {
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.suggestion-list__meta {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
</style>
