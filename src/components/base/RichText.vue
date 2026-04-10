
<template>
  <div class="rich-text" v-html="html" />
</template>

<script setup>
import { computed } from 'vue'
import { marked, parseInline } from 'marked'

// Renderer with target="_blank" on external links
const renderer = new marked.Renderer()
renderer.link = ({ href, title, tokens }) => {
  const text = tokens.map(t => t.raw).join('')
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'))
  const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
  const titleAttr = title ? ` title="${title}"` : ''
  return `<a href="${href}"${titleAttr}${attrs}>${text}</a>`
}

marked.use({ renderer })

const props = defineProps({
  content: { type: String, default: '' },
  inline:  { type: Boolean, default: false }
})

const html = computed(() => {
  if (!props.content) return ''
  return props.inline
    ? parseInline(props.content)
    : marked.parse(props.content)
})
</script>

<style>
/* Global (not scoped) so the styles reach the v-html subtree */

.rich-text p {
  margin-bottom: var(--space-4);
  /* Remove the global 72ch ceiling — the parent controls width here.
     text-align: inherit ensures centred/right-aligned parents flow through. */
  max-width: none;
  text-align: inherit;
}

.rich-text p:last-child {
  margin-bottom: 0;
}

.rich-text strong {
  font-weight: var(--font-weight-bold);
}

.rich-text em {
  font-style: italic;
}

.rich-text ul,
.rich-text ol {
  padding-left: var(--space-6);
  margin-bottom: var(--space-4);
}

.rich-text ul {
  list-style: disc;
}

.rich-text ol {
  list-style: decimal;
}

.rich-text li {
  margin-bottom: var(--space-2);
  line-height: var(--line-height-relaxed);
}

.rich-text a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.rich-text a:hover {
  opacity: 0.8;
}
</style>
