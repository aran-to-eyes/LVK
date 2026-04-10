
<template>
  <div class="cta-banner" :class="{ 'cta-banner--light': !dark }">
    <BaseContainer>
      <div class="cta-banner__inner">
        <h2 class="cta-banner__headline">{{ headline }}</h2>
        <RichText v-if="body" :content="body" class="cta-banner__body" />
        <BaseButton
          v-if="ctaText && (ctaTo || ctaHref)"
          :to="ctaTo || undefined"
          :href="ctaHref || undefined"
          :variant="dark ? 'white' : 'primary'"
          size="lg"
        >
          {{ ctaText }}
        </BaseButton>
      </div>
    </BaseContainer>
  </div>
</template>

<script setup>
import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseButton    from '@/components/base/BaseButton.vue'
import RichText      from '@/components/base/RichText.vue'

defineProps({
  headline: { type: String, required: true },
  body:     { type: String, default: '' },
  ctaText:  { type: String, default: '' },
  ctaTo:    { type: String, default: '' },
  ctaHref:  { type: String, default: '' },
  dark:     { type: Boolean, default: true }
})
</script>

<style scoped>
.cta-banner--light {
  background: var(--color-primary-bg);
}

.cta-banner--light .cta-banner__headline {
  color: var(--color-primary);
}

.cta-banner--light .cta-banner__body {
  color: var(--color-text-secondary);
}

.cta-banner__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
