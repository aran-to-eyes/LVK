
<template>
  <div>

    <PageHeader
      :title="c.pageHeader.title"
      :subtitle="c.pageHeader.subtitle"
      :breadcrumbs="[{ label: c.pageHeader.title }]"
    />

    <BaseSection>
      <div class="container--narrow prose">

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>{{ op.name }}</strong><br />
          {{ op.street }}<br />
          {{ op.city }}
        </p>

        <h2>Vertreten durch</h2>
        <p>{{ op.representedBy }}</p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a :href="`tel:${op.phone.replace(/\s/g, '')}`">{{ op.phone }}</a><br />
          E-Mail: <a :href="`mailto:${op.email}`">{{ op.email }}</a>
        </p>

        <h2>Registereintrag</h2>
        <p>
          Registergericht: {{ op.registerCourt }}<br />
          Registernummer: {{ op.registerNumber }}
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          {{ op.ustId }}
        </p>

        <h2>Haftungsausschluss</h2>
        <h3>Haftung für Inhalte</h3>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
          keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG
          für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich.
        </p>

        <h3>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
          wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
          keine Gewähr übernehmen.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
          unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
          Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
          bzw. Erstellers.
        </p>

      </div>
    </BaseSection>

  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import { legalContent as c } from '@/data/siteContent.js'

import BaseSection from '@/components/base/BaseSection.vue'
import PageHeader from '@/components/sections/PageHeader.vue'

const op = c.operator

useMeta({ title: 'Impressum' })
</script>

<style scoped>
/* Prose styles for long-form legal text */
.prose h2 {
  font-size: var(--font-size-xl);
  margin-top: var(--space-10);
  margin-bottom: var(--space-4);
}

.prose h3 {
  font-size: var(--font-size-lg);
  margin-top: var(--space-6);
  margin-bottom: var(--space-3);
}

.prose p {
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}

.prose :first-child {
  margin-top: 0;
}
</style>
