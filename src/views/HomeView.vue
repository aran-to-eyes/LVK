
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
      v-for="(block, index) in homeBlocks"
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
import homeBlocks from '@/data/homeBlocks.json'

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

/* Mission visual — stat boxes */
.mission-visual {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.mission-stat {
  background: var(--color-bg);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-2);
}

.mission-stat__number {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.mission-stat__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Aids visual */
.aids-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.aids-icon-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.aids-icon-grid span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  background: var(--color-primary-bg);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  line-height: 1;
}

@media (max-width: 768px) {
  .aids-visual {
    display: none;
  }
}
</style>
