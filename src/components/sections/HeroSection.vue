
<template>
  <div class="hero" :class="{ 'hero--has-bg-image': backgroundImage }" role="banner">

    <!-- Background image + overlay (only rendered when prop is set) -->
    <template v-if="backgroundImage">
      <img
        :src="backgroundImage"
        alt=""
        aria-hidden="true"
        class="hero__bg-img"
      />
      <div
        class="hero__overlay"
        :style="{ opacity: overlayOpacity }"
        aria-hidden="true"
      />
    </template>

    <!-- Foreground content -->
    <BaseContainer class="hero__container">
      <div class="hero__content">
        <p v-if="tagline" class="hero__tag">{{ tagline }}</p>
        <h1 class="hero__headline">{{ headline }}</h1>
        <RichText v-if="body" :content="body" class="hero__body" />
        <div class="hero__actions">
          <BaseButton
            v-if="ctaText && ctaTo"
            :to="ctaTo"
            variant="primary"
            size="lg"
          >
            {{ ctaText }}
          </BaseButton>
          <BaseButton
            v-if="secondaryText && secondaryTo"
            :to="secondaryTo"
            variant="ghost"
            size="lg"
          >
            {{ secondaryText }}
          </BaseButton>
        </div>
      </div>
    </BaseContainer>

  </div>
</template>

<script setup>
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseButton    from '@/components/base/BaseButton.vue'
import RichText      from '@/components/base/RichText.vue'

defineProps({
  tagline:         { type: String, default: '' },
  headline:        { type: String, required: true },
  body:            { type: String, default: '' },
  ctaText:         { type: String, default: '' },
  ctaTo:           { type: String, default: '' },
  secondaryText:   { type: String, default: '' },
  secondaryTo:     { type: String, default: '' },
  backgroundImage: { type: String, default: '' },
  overlayOpacity:  { type: Number, default: 0.30 }
})
</script>
