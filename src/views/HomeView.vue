
<template>
  <div>
    <HeroSection
      :tagline="c.hero.tagline"
      :headline="c.hero.headline"
      :body="c.hero.body"
      :ctaText="c.hero.ctaText"
      :ctaTo="c.hero.ctaTo"
      :secondaryText="c.hero.secondaryCtaText"
      :secondaryTo="c.hero.secondaryCtaTo"
      :backgroundImage = "c.hero.backgroundImage"
    />

    <BaseSection variant="alt">
      <div class="container">
        <div>
          <span class="section-intro__label">{{ c.missionTeaser.label }}</span>
          <h2 class="mission-headline">{{ c.missionTeaser.headline }}</h2>
          <RichText :content="c.missionTeaser.body" class="lead" />
        </div>
      </div>
    </BaseSection>
    
    <NextExpert/>

    <BaseSection
      v-for="(block, index) in homeBlocksResolved"
      :key="block.id"
      :variant="index % 2 === 0 ? 'default' : 'alt'"
    >
      <HomeImageTextBlock v-bind="block" />
    </BaseSection>

  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import { homeContent as c } from '@/data/siteContent.js'
import homeBlocksRaw from '@/data/homeBlocks.json'
const homeBlocksResolved = homeBlocksRaw.map(b => ({ ...b, imageUrl: import.meta.env.BASE_URL + b.imageUrl.replace(/^\//, '') }))

import RichText           from '@/components/base/RichText.vue'
import BaseSection        from '@/components/base/BaseSection.vue'
import HeroSection        from '@/components/sections/HeroSection.vue'
import HomeImageTextBlock from '@/components/home/HomeImageTextBlock.vue'
import NextExpert         from '@/components/sections/NextExpert.vue'

useMeta({
  title: 'Low Vision Kreis',
  description:
    'Low Vision Kreis – Spezialisierte Beratung und Hilfsmittel für Menschen mit Sehbehinderung. Finden Sie zertifizierte Experten in Ihrer Nähe.'
})
</script>

<style scoped>
.mission-headline {
  margin: var(--space-3) 0 var(--space-6);
}
</style>
