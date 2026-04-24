
<template>
  <div class="download-list">
    <template v-if="showCategories && groupedItems.length">
      <section
        v-for="group in groupedItems"
        :key="group.category"
        class="download-list__group"
      >
        <h3 class="download-list__category-heading">{{ group.category }}</h3>
        <div class="download-list__items">
          <DownloadItem
            v-for="item in group.items"
            :key="item.file"
            v-bind="item"
          />
        </div>
      </section>
    </template>

    <template v-else>
      <div class="download-list__items">
        <DownloadItem
          v-for="item in items"
          :key="item.file"
          v-bind="item"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DownloadItem from '@/components/cards/DownloadItem.vue'

const props = defineProps({
  items:          { type: Array, default: () => [] },
  showCategories: { type: Boolean, default: true }
})

const groupedItems = computed(() => {
  const map = new Map()
  for (const item of props.items) {
    const cat = item.category || 'Sonstige'
    if (!map.has(cat)) map.set(cat, [])
    map.get(cat).push(item)
  }
  return Array.from(map.entries()).map(([category, items]) => ({ category, items }))
})
</script>

<style scoped>
.download-list__group {
  margin-bottom: var(--space-10);
}

.download-list__group:last-child {
  margin-bottom: 0;
}

.download-list__category-heading {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semi);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: var(--border-width) solid var(--color-border);
}

.download-list__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
</style>
