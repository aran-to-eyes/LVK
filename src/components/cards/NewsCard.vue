
<template>
  <article class="card news-card">
    <div class="news-card__meta">
      <span v-if="category" class="news-card__category">{{ category }}</span>
      <time v-if="date" :datetime="date" class="news-card__date">{{ formattedDate }}</time>
    </div>
    <h3 class="card__title news-card__title">{{ title }}</h3>
    <p class="card__body">{{ summary }}</p>
    <RouterLink v-if="to" :to="to" class="news-card__link">
      Mehr lesen →
    </RouterLink>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date:     { type: String, default: '' },
  category: { type: String, default: '' },
  title:    { type: String, required: true },
  summary:  { type: String, default: '' },
  to:       { type: String, default: '' }
})

const formattedDate = computed(() => {
  if (!props.date) return ''
  try {
    return new Date(props.date).toLocaleDateString('de-DE', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    })
  } catch {
    return props.date
  }
})
</script>

<style scoped>
.news-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.news-card__category {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-primary-light);
  background: var(--color-primary-bg);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
}

.news-card__date {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.news-card__title {
  margin-bottom: var(--space-3);
}

.news-card__link {
  display: inline-block;
  margin-top: var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semi);
  color: var(--color-primary-light);
  text-decoration: none;
}

.news-card__link:hover {
  text-decoration: underline;
}
</style>
