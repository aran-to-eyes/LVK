import { onMounted } from 'vue'
import { defaultMeta } from '@/data/meta.js'

export function useMeta(options = {}) {
  onMounted(() => {
    if (options.title) {
      document.title = options.title.includes(defaultMeta.titleSuffix)
        ? options.title
        : options.title + defaultMeta.titleSuffix
    }

    const description = options.description || defaultMeta.description
    setMetaTag('name', 'description', description)
    setMetaTag('property', 'og:description', description)

    if (options.title) {
      setMetaTag('property', 'og:title', options.title)
    }

    const ogImage = options.ogImage || defaultMeta.ogImage
    setMetaTag('property', 'og:image', ogImage)
  })
}

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
