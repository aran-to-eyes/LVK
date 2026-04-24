
<template>
  <div>

<HeroSection
      :tagline="c.hero.tagline"
      :headline="c.hero.headline"
      :body="c.hero.body"
      :backgroundImage = "c.hero.backgroundImage"
    />

    <BaseSection>
      <div class="container--wide">
        <h2 style="text-align: center;">{{ c.mission.headline }}</h2>
        <RichText style ="text-align: center;":content="c.mission.body" class="lead mt-4" />
      </div>
    </BaseSection>

    <BaseSection variant="alt">
      <SectionIntro :title="c.goals.headline" />
      <RichText :content="c.goals.richText"  class="lead goals-richText"/> 
      <div class="card-grid card-grid--2">
        <article
          v-for="item in c.goals.items"
          :key="item.title"
          class="card"
        >
          <h3 class="card__title">{{ item.title }}</h3>
          <RichText :content="item.text" class="card__body" />
        </article>
      </div>
    </BaseSection>

    <BaseSection variant="default">
    <div class="contact-us">
      <div class="contact-us__headline">
        <h1>{{ c.contactUs.headline }}</h1>
    </div>
    <div class="contact-us__body">
      <div class ="contact-us__body__block">
        <RichText :content =" c.contactUs.bodyLeft" />
      </div>
      <div class ="contact-us__body__block">
          <RichText :content =" c.contactUs.bodyRight" />
      </div>

    </div>
    </div>
    </BaseSection>

    <NextExpert/>
  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import { missionContent as c } from '@/data/siteContent.js'

import RichText      from '@/components/base/RichText.vue'
import BaseSection   from '@/components/base/BaseSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import SectionIntro  from '@/components/sections/SectionIntro.vue'
import NextExpert from '@/components/sections/NextExpert.vue'

useMeta({
  title: 'Mission & Ziele',
  description:
    'Der Low Vision Kreis verbindet Menschen mit Sehbehinderung mit ' +
    'spezialisierten Fachbetrieben deutschlandweit.'
})
</script>

<style scoped>

.goals-richText{
  text-align: center;
  margin-bottom: var(--space-10);
}

.contact-us__headline{
  text-align: center;
  margin-bottom: var(--space-6);
}
.contact-us__body{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: content;
}
.contact-us__body__block{
  display: inline-block;
  width: 45%;
  padding: 1%;
  line-height: var(--line-height-relaxed);
}

</style>
