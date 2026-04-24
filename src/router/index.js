

import { createRouter, createWebHashHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')
const ExpertsNearYouView = () => import('@/views/ExpertsNearYouView.vue')
const GlassesAndAidsView = () => import('@/views/GlassesAndAidsView.vue')
const MissionAndGoalsView = () => import('@/views/MissionAndGoalsView.vue')
const InfoAndPartnersView = () => import('@/views/InfoAndPartnersView.vue')
const DownloadsView = () => import('@/views/DownloadsView.vue')
const LegalNoticeView = () => import('@/views/LegalNoticeView.vue')
const PrivacyPolicyView = () => import('@/views/PrivacyPolicyView.vue')
const AccessibilityView = () => import('@/views/AccessibilityView.vue')
const MembersView = () => import('@/views/MembersView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: { title: 'Low Vision Kreis – Startseite' }
  },
  {
    path: '/experts-near-you',
    component: ExpertsNearYouView,
    meta: { title: 'Experten in meiner Nähe – Low Vision Kreis' }
  },
  {
    path: '/glasses-and-aids',
    component: GlassesAndAidsView,
    meta: { title: 'Brillen & Hilfsmittel – Low Vision Kreis' }
  },
  {
    path: '/mission-and-goals',
    component: MissionAndGoalsView,
    meta: { title: 'Mission & Ziele – Low Vision Kreis' }
  },
  {
    path: '/info-and-partners',
    component: InfoAndPartnersView,
    meta: { title: 'Info & Partner – Low Vision Kreis' }
  },
  {
    path: '/downloads',
    component: DownloadsView,
    meta: { title: 'Downloads – Low Vision Kreis' }
  },
  {
    path: '/members',
    component: MembersView,
    meta: { title: 'Mitglieder – Low Vision Kreis' }
  },
  {
    path: '/legal-notice',
    component: LegalNoticeView,
    meta: { title: 'Impressum – Low Vision Kreis' }
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicyView,
    meta: { title: 'Datenschutzerklärung – Low Vision Kreis' }
  },
  {
    path: '/accessibility',
    component: AccessibilityView,
    meta: { title: 'Barrierefreiheit – Low Vision Kreis' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Seite nicht gefunden – Low Vision Kreis' }
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
