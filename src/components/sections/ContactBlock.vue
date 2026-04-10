
<template>
  <div class="contact-block">
    <h3 class="contact-block__title">{{ title }}</h3>
    <p v-if="description" class="contact-block__desc">{{ description }}</p>
    <address class="contact-block__details">
      <p>
        <strong>{{ contact.organisationName }}</strong><br />
        {{ contact.street }}<br />
        {{ contact.postalCode }} {{ contact.city }}
      </p>
      <p>
        <a :href="`tel:${contact.phone.replace(/\s/g, '')}`" class="contact-link">
          📞 {{ contact.phone }}
        </a>
      </p>
      <p>
        <a :href="`mailto:${contact.email}`" class="contact-link">
          ✉ {{ contact.email }}
        </a>
      </p>
    </address>
  </div>
</template>

<script setup>
import { contact } from '@/data/contact.js'

defineProps({
  title:       { type: String, default: 'Kontakt' },
  description: { type: String, default: '' }
})
</script>

<style scoped>
.contact-block__title {
  margin-bottom: var(--space-4);
}

.contact-block__desc {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
}

.contact-block__details {
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.contact-link {
  color: var(--color-primary-light);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.contact-link:hover {
  text-decoration: underline;
}
</style>
