
<template>
  <div class="search-bar-wrapper">
    <form
      class="search-bar"
      role="search"
      @submit.prevent="handleSubmit"
    >
      <label for="partner-search-input" class="sr-only">
        Stadt oder Postleitzahl eingeben
      </label> 
      <input
        id="partner-search-input"
        v-model="query"
        type="search"
        class="search-bar__input"
        :placeholder="placeholder"
        autocomplete="on"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        :disabled="loading"
        @input="onInput"
      />
      <BaseButton
        type="submit"
        variant="primary"
        size="base"
        class="search-bar__btn"
        :disabled="loading || !query.trim()"
      >
        {{ loading ? 'Suche …' : buttonLabel }}
      </BaseButton>
    </form>

    <p v-if="helperText" class="search-bar__helper" aria-live="polite">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps({
  placeholder: { type: String, default: 'Postleitzahl oder Ort eingeben …' },
  buttonLabel: { type: String, default: 'Suchen' },
  helperText:  { type: String, default: '' },
  loading:     { type: Boolean, default: false }
})

const emit = defineEmits(['search', 'reset'])

const query = ref('')

function handleSubmit() {
  const trimmed = query.value.trim()
  if (!trimmed) return
  emit('search', trimmed)
}

function onInput() {
  if (!query.value.trim()) {
    emit('reset')
  }
}
</script>
