
<template>
  <div>

    <PageHeader
      :title="c.pageHeader.title"
      :subtitle="c.pageHeader.subtitle"
      :breadcrumbs="[{ label: c.pageHeader.title }]"
    />

    <BaseSection>
      <RichText :content="c.intro" class="lead mb-12" />

      <DownloadList
        :items="downloads"
        :show-categories="true"
      />

      <div v-if="downloads.length === 0" class="mt-8">
        <p class="text-secondary">
          Aktuell sind keine Downloads verfügbar. Bitte schauen Sie später wieder vorbei.
        </p>
      </div>
    </BaseSection>

  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import { downloadsIntro as c } from '@/data/siteContent.js'
import { downloads } from '@/data/downloads.js'

import RichText     from '@/components/base/RichText.vue'
import BaseSection   from '@/components/base/BaseSection.vue'
import PageHeader    from '@/components/sections/PageHeader.vue'
import DownloadList  from '@/components/cards/DownloadList.vue'

useMeta({
  title: 'Downloads',
  description:
    'Informationsmaterial, Patienteninformationen und Fachunterlagen des Low Vision Kreises zum Herunterladen.'
})
</script>
