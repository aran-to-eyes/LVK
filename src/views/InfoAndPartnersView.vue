
<template>
  <div>

    <HeroSection
    :headline="c.hero.headline"
    :body="c.hero.body"
    :backgroundImage="c.hero.backgroundImage"
    :overlayOpacity="c.hero.overlayOpacity"
    />

    <BaseSection
      v-for="(block, index) in infoBlocksResolved"
      :key="block.id"
      :variant="index % 2 === 0 ? 'default' : 'alt'"
    >
      <HomeImageTextBlock v-bind="block" />
    </BaseSection>

    <NextExpert/>

   

    <!-- Useful external links -->
    <BaseSection :variant = "'alt'">

      <h2 class="usefulLinks-headline">{{ c.usefulLinks.headline }}</h2>
      <ul class="useful-links">
        <li
          v-for="link in c.usefulLinks.links"
          :key="link.href"
          class="useful-links__item"
        >
          <a
            :href="link.href"
            class="useful-links__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
            <span class="sr-only">(öffnet in neuem Tab)</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </li>
      </ul>
    </BaseSection>

  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import { infoContent as c } from '@/data/siteContent.js'

import BaseSection  from '@/components/base/BaseSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import infoBlocksRaw from '@/data/infoBlocks.json'
const infoBlocksResolved = infoBlocksRaw.map(b => ({ ...b, imageUrl: import.meta.env.BASE_URL + b.imageUrl.replace(/^\//, '') }))
import HomeImageTextBlock from '@/components/home/HomeImageTextBlock.vue'
import NextExpert from '@/components/sections/NextExpert.vue'

useMeta({
  title: 'Info & Partner',
  description:
    'Informationen über das Low-Vision-Kreis-Partnernetzwerk und Möglichkeiten zur Zusammenarbeit.'
})
</script>

<style scoped>

.usefulLinks-headline{
  text-align: center;
  display:block;
  margin-bottom: var(--space-10);
}
.useful-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  align-items: center;
}

.useful-links__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-primary-light);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--transition-fast), box-shadow var(--transition-fast);
}

.useful-links__link:hover {
  background: var(--color-primary-bg);
  box-shadow: var(--shadow-sm);
}
</style>
