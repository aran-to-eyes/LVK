<template>
  <div>

    <HeroSection
      :tagline="c.hero.tagline"
      :headline="c.hero.headline"
      :body="c.hero.body"
      :backgroundImage = "c.hero.backgroundImage"
    />


    <BaseSection
      v-for="(cat, idx) in c.categories"
      :key="cat.title"
      :variant="idx % 2 === 1 ? 'alt' : ''"
    >
      <h2 class="aids-category-title">{{ cat.title }}</h2>
      <div class="aids-category-tagline">{{ cat.tagline }}</div>
      <div class="card-grid card-grid--2">
        <article
          v-for="item in cat.items"
          :key="item.name"
          class="card"
        >
          <img  v-if="item.img" :src = "item.img" class="card__image"/>
          <h3 class="card__title">{{ item.name }}</h3>
          <RichText :content="item.description" class="card__body" />
          <p class="aids-card-img-source">(Foto: {{ item.img_source }})</p>
        </article>
      </div>
    </BaseSection>

    <NextExpert/>


  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import { aidsContent as c } from '@/data/siteContent.js'

import RichText    from '@/components/base/RichText.vue'
import BaseSection  from '@/components/base/BaseSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import NextExpert from '@/components/sections/NextExpert.vue'

useMeta({
  title: 'Brillen & Hilfsmittel',
  description:
    'Optische und elektronische Sehhilfen für Menschen mit Low Vision: Lupenbrille, ' +
    'Bildschirmlesegeräte, Handlupen, Filter und mehr.'
})
</script>

<style scoped>


.aids-overview-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.aids-category-title {
  display: block;
  text-align: center;
  margin-bottom: var(--space-6);
}
.aids-category-tagline {
  display: block;
  text-align: center;
  margin-bottom: var(--space-10)
}

.aids-card-img-source{
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
