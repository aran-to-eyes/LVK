
<template>
  <div>

    <PageHeader
      :title="c.pageHeader.title"
      :subtitle="c.pageHeader.subtitle"
    />

    <BaseSection>

      <LoadingState v-if="loading" message="Mitgliederdaten werden geladen …" />

      <ErrorState
        v-else-if="error"
        title="Mitgliederdaten nicht verfügbar"
        :message="error"
      />

      <template v-else-if="sortedMembers.length > 0">
        <p class="member-count">{{ sortedMembers.length }} Mitgliedsbetriebe</p>
        <div class="member-grid">
          <MemberCard
            v-for="member in sortedMembers"
            :key="member.Ident"
            :member="member"
          />
        </div>
      </template>

      <EmptyState
        v-else
        icon="🏪"
        title="Keine Mitglieder gefunden"
        message="Es sind derzeit keine Mitgliedsdaten verfügbar."
      />

    </BaseSection>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMeta } from '@/composables/useMeta.js'
import { usePartners } from '@/composables/usePartners.js'
import { membersContent as c } from '@/data/siteContent.js'

import PageHeader   from '@/components/sections/PageHeader.vue'
import BaseSection  from '@/components/base/BaseSection.vue'
import MemberCard   from '@/components/cards/MemberCard.vue'
import LoadingState from '@/components/cards/LoadingState.vue'
import EmptyState   from '@/components/cards/EmptyState.vue'
import ErrorState   from '@/components/cards/ErrorState.vue'

useMeta({
  title: 'Mitglieder',
  description:
    'Alle Mitgliedsbetriebe des Low Vision Kreises – Adressen, Telefon und E-Mail auf einen Blick.'
})

const { partners, loading, error } = usePartners()

const sortedMembers = computed(() =>
  [...partners.value].sort((a, b) =>
    (a.Bezeichnung || '').localeCompare(b.Bezeichnung || '', 'de')
  )
)
</script>

<style scoped>
.member-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
}

@media (max-width: 480px) {
  .member-grid {
    grid-template-columns: 1fr;
  }
}
</style>
