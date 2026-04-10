/**
 * data/footerLinks.js
 *
 * Footer link groups. Each group has a heading and an array of links.
 * Internal links use `to` (Vue Router path); external links use `href`.
 */

export const footerLinkGroups = [
  {
    heading: 'Low Vision Kreis',
    links: [
      { label: 'Startseite', to: '/' },
      { label: 'Mission & Ziele', to: '/mission-and-goals' },
      { label: 'Info & Partner', to: '/info-and-partners' }
    ]
  },
  {
    heading: 'Beratung & Hilfsmittel',
    links: [
      { label: 'Experten in meiner Nähe', to: '/experts-near-you' },
      { label: 'Brillen & Hilfsmittel', to: '/glasses-and-aids' },
      { label: 'Downloads', to: '/downloads' }
    ]
  },
  {
    heading: 'Rechtliches',
    links: [
      { label: 'Impressum', to: '/legal-notice' },
      { label: 'Datenschutzerklärung', to: '/privacy-policy' },
      { label: 'Barrierefreiheit', to: '/accessibility' }
    ]
  }
]
