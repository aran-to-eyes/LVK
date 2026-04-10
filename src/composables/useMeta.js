/**
 * composables/useMeta.js
 *
 * Lightweight head/meta management for a static SPA.
 *
 * WHY not a dedicated library?
 * For a site this size, updating document.title and a handful of <meta> tags
 * directly is simpler and has zero dependencies. A library like @vueuse/head
 * or unhead would be justified if the site grows to need many dynamic tags
 * per page (e.g. canonical URLs, structured data, per-image OG tags).
 *
 * Usage inside a view component:
 *
 *   import { useMeta } from '@/composables/useMeta.js'
 *
 *   useMeta({
 *     title: 'Experten in meiner Nähe',
 *     description: 'Finden Sie den nächsten Low-Vision-Experten.',
 *   })
 *
 * The router's afterEach guard in router/index.js already handles the basic
 * title update from route meta. Call useMeta() in a view when you need to
 * set a custom description or override the title with more specific copy.
 */

import { onMounted } from 'vue'
import { defaultMeta } from '@/data/meta.js'

/**
 * useMeta(options)
 *
 * Sets document.title and updates relevant <meta> tags when the component mounts.
 *
 * @param {object} options
 * @param {string} [options.title]       – page title (the suffix from defaultMeta is appended automatically)
 * @param {string} [options.description] – meta description
 * @param {string} [options.ogImage]     – open-graph image URL
 */
export function useMeta(options = {}) {
  onMounted(() => {
    // --- Title ---
    if (options.title) {
      document.title = options.title.includes(defaultMeta.titleSuffix)
        ? options.title
        : options.title + defaultMeta.titleSuffix
    }

    // --- Description ---
    const description = options.description || defaultMeta.description
    setMetaTag('name', 'description', description)
    setMetaTag('property', 'og:description', description)

    // --- OG title ---
    if (options.title) {
      setMetaTag('property', 'og:title', options.title)
    }

    // --- OG image ---
    const ogImage = options.ogImage || defaultMeta.ogImage
    setMetaTag('property', 'og:image', ogImage)
  })
}

/**
 * setMetaTag(attrName, attrValue, content)
 *
 * Finds an existing <meta> tag matching the given attribute selector and
 * updates its content. Creates the tag if it does not exist.
 *
 * @param {string} attrName  – the attribute to query on, e.g. 'name' or 'property'
 * @param {string} attrValue – the attribute value to match, e.g. 'description'
 * @param {string} content   – the content value to set
 */
function setMetaTag(attrName, attrValue, content) {
  if (!content) return

  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`)

  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }

  el.setAttribute('content', content)
}
