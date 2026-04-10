
<template>
  <div>

    <PageHeader
      :title="c.pageHeader.title"
      :subtitle="c.pageHeader.subtitle"
      :breadcrumbs="[{ label: c.pageHeader.title }]"
    />

    <BaseSection>
      <div class="container--narrow prose">

        <h2>Stand der Barrierefreiheit</h2>
        <p>
          Diese Website ist bestrebt, die Anforderungen der
          <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1
          auf Konformitätsstufe AA zu erfüllen.
        </p>

        <h2>Maßnahmen zur Barrierefreiheit</h2>
        <ul>
          <li>Überschriftenhierarchie: jede Seite verwendet eine logische H1–H3-Struktur.</li>
          <li>Farbkontraste: Texte erfüllen das WCAG-AA-Kontrastverhältnis von 4.5:1.</li>
          <li>Tastaturnavigation: alle interaktiven Elemente sind per Tastatur erreichbar.</li>
          <li>Sichtbarer Fokusindikator: alle fokussierbaren Elemente zeigen einen deutlichen Fokusrahmen.</li>
          <li>Skip-Navigation: ein Link am Seitenanfang erlaubt das Überspringen der Hauptnavigation.</li>
          <li>Semantisches HTML: Landmark-Rollen (header, main, nav, footer) sind korrekt gesetzt.</li>
          <li>Responsive Design: die Website ist auf Smartphones, Tablets und Desktop-PCs nutzbar.</li>
          <li>Schriftgrößen: alle Schriftgrößen sind relativ (rem) und skalieren mit der Browser-Einstellung.</li>
        </ul>

        <h2>Bekannte Einschränkungen</h2>
        <ul>
          <li>
            Downloadbare PDF-Dateien sind möglicherweise nicht vollständig barrierefrei
            gestaltet. Wir arbeiten daran, diese sukzessive zu verbessern.
          </li>
          <li>
            Emojis werden als Ikonen eingesetzt und sind mit <code>aria-hidden="true"</code>
            markiert, um Vorleselautsprecher nicht zu stören. An einigen Stellen dienen sie
            jedoch auch als visuelle Orientierungshilfe.
          </li>
        </ul>

        <h2>Feedback und Kontakt</h2>
        <p>
          Wenn Sie Barrieren auf dieser Website feststellen, kontaktieren Sie uns bitte:
        </p>
        <ContactBlock title="" description="" />

        <h2>Schlichtungsverfahren</h2>
        <p>
          Wenn Sie der Ansicht sind, dass Ihr Anliegen zur Barrierefreiheit nicht
          zufriedenstellend bearbeitet wurde, können Sie sich an die
          Schlichtungsstelle nach BGFG wenden.
        </p>

      </div>
    </BaseSection>

  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import { accessibilityContent as c } from '@/data/siteContent.js'

import BaseSection from '@/components/base/BaseSection.vue'
import PageHeader from '@/components/sections/PageHeader.vue'
import ContactBlock from '@/components/sections/ContactBlock.vue'

useMeta({ title: 'Barrierefreiheit' })
</script>

<style scoped>
.prose h2 {
  font-size: var(--font-size-xl);
  margin-top: var(--space-10);
  margin-bottom: var(--space-4);
}
.prose ul {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}
.prose p {
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}
</style>
