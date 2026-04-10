
<template>
  <div class="cta-banner" >
    <BaseContainer>
      <div class="cta-banner__inner">
        <h2 class="cta-banner__headline">{{ headline }}</h2>
        <RichText v-if="body" :content="body" class="cta-banner__body" />
        <BaseButton
          v-if="ctaText && (ctaTo || ctaHref)"
          :to="ctaTo || undefined"
          :href="ctaHref || undefined"
          :variant="'white'"
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


const headline ='Finden Sie den nächsten Low-Vision-Experten'
const body ='Unser Suchsystem berechnet auf Grundlage Ihrer Postleitzahl oder Ihres Ortsnamens die nächstgelegenen Fachbetriebe in unserem Netzwerk.'
const ctaText ='Jetzt suchen'
const ctaTo ='/experts-near-you'
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
