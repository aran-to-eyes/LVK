
<template>
  <div>

    <PageHeader
      :title="c.pageHeader.title"
      :subtitle="c.pageHeader.subtitle"
      :breadcrumbs="[{ label: c.pageHeader.title }]"
    />

    <BaseSection>
      <div class="container--narrow prose">

        <h2>1. Datenschutz auf einen Blick</h2>
        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
          personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
          werden können.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          Diese Website verarbeitet von sich aus <strong>keine personenbezogenen Daten</strong>.
          Es werden keine Analyse-Dienste (z.B. Google Analytics), keine Tracking-Cookies
          und keine Werbenetzwerke eingesetzt.
        </p>
        <p>
          Die Postleitzahl oder der Ortsname, den Sie in der Partnersuche eingeben, wird
          ausschließlich lokal in Ihrem Browser verarbeitet. Er wird nicht an unsere Server
          übermittelt. Wenn Sie auf „Auf Karte anzeigen" klicken, wird Ihre Anfrage direkt
          an OpenStreetMap (openstreetmap.org) gesendet.
        </p>

        <h2>2. Hosting</h2>
        <p>
          Diese Website wird als statische Datei auf einem Webserver gehostet. Beim Abruf
          der Website verarbeitet der Hosting-Provider im Rahmen seiner Dienste
          serverseitige Zugriffsprotokolle (IP-Adresse, Zeitstempel, abgerufene Seite).
          Details entnehmen Sie der Datenschutzerklärung Ihres Hosting-Anbieters.
        </p>

        <h2>3. Lokaler Speicher (localStorage)</h2>
        <p>
          Diese Website kann bei aktivierter Geocoder-Fallback-Funktion Ortsnamen und
          die zugehörigen Koordinaten im lokalen Speicher (localStorage) Ihres Browsers
          ablegen. Dabei werden keine personenbezogenen Daten gespeichert. Sie können
          den lokalen Speicher jederzeit in den Einstellungen Ihres Browsers löschen.
        </p>

        <h2>4. Externe Links und Karten</h2>
        <p>
          Wenn Sie auf einen „Auf Karte anzeigen"-Link klicken, werden Sie zu
          OpenStreetMap (betrieben von der OpenStreetMap Foundation, UK) weitergeleitet.
          Dabei werden Ihre IP-Adresse und die Koordinaten des Partners an OpenStreetMap
          übermittelt. Es gilt die
          <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung der OpenStreetMap Foundation
          </a>.
        </p>

        <h2>5. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:<br />
          <strong>{{ contactData.organisationName }}</strong><br />
          {{ contactData.street }}<br />
          {{ contactData.postalCode }} {{ contactData.city }}<br />
          E-Mail: <a :href="`mailto:${contactData.email}`">{{ contactData.email }}</a><br />
          Telefon: <a :href="`tel:${contactData.phone.replace(/\s/g,'')}`">{{ contactData.phone }}</a>
        </p>

        <h2>6. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten
          personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der
          Datenverarbeitung. Außerdem haben Sie das Recht auf Berichtigung oder Löschung
          dieser Daten. Wenn Sie Fragen zum Datenschutz haben, können Sie sich jederzeit
          unter der im Impressum angegebenen Adresse an uns wenden.
        </p>

      </div>
    </BaseSection>

  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import { privacyContent as c } from '@/data/siteContent.js'
import { contact as contactData } from '@/data/contact.js'

import BaseSection from '@/components/base/BaseSection.vue'
import PageHeader from '@/components/sections/PageHeader.vue'

useMeta({ title: 'Datenschutzerklärung' })
</script>

<style scoped>
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
</style>
