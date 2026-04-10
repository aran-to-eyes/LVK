/**
 * data/contact.js
 *
 * Organisation contact information used across multiple components
 * (footer, contact block, legal notice).
 *
 * Centralising here means a single change updates every usage site.
 */

export const contact = {
  organisationName: 'Low Vision Kreis',
  street: 'Musterstraße 1',
  postalCode: '70000',
  city: 'Stuttgart',
  phone: '+49 711 000000',
  email: 'info@low-vision-kreis.de',

  // Social / external links (set to null to hide)
  social: {
    facebook: null,
    instagram: null,
    youtube: null
  }
}
