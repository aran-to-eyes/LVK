
<template>
  <div
    class="home-block"
    :class="imagePosition === 'right' ? 'home-block--image-right' : 'home-block--image-left'"
  >
    <div class="home-block__media">
      <img
        :src="imageUrl"
        :alt="imageAlt || ''"
        class="home-block__img"
        loading="lazy"
      />
    </div>

    <div class="home-block__content">
      <h2 v-if="heading" class="home-block__heading">{{ heading }}</h2>
      <!--p class="home-block__body">{{ body }}</p-->
      <RichText :content="body" class="lead" />
    </div>
  </div>
</template>

<script setup>
import RichText      from '@/components/base/RichText.vue'

defineProps({
  imageUrl:      { type: String, required: true },
  imageAlt:      { type: String, default: '' },
  imagePosition: { type: String, default: 'left', validator: v => ['left', 'right'].includes(v) },
  heading:       { type: String, default: '' },
  body:          { type: String, default: '' }
})
</script>

<style scoped>
.home-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: top;
}

.home-block--image-right .home-block__media  { order: 2; }
.home-block--image-right .home-block__content { order: 1; }

.home-block__img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.home-block__heading {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-5);
}

.home-block__body {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

@media (max-width: 768px) {
  .home-block {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .home-block--image-right .home-block__media,
  .home-block--image-right .home-block__content {
    order: unset;
  }

  .home-block__img {
    height: 240px;
  }

  .home-block__heading {
    font-size: var(--font-size-xl);
  }

  .home-block__body {
    font-size: var(--font-size-base);
  }
}
</style>
