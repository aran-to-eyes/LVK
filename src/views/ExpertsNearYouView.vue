
<template>
  <div>
    <HeroSection
      :tagline="c.hero.tagline"
      :headline="c.hero.headline"
      :body="c.hero.body"
      :backgroundImage = "c.hero.backgroundImage"
    />

    <BaseSection variant="alt" size="sm">
      <div class="search-intro">
        <div class="search-intro__copy">
          <h2 class="search-intro__title">{{ c.intro.headline }}</h2>
          <RichText :content="c.intro.body" class="lead" />
        </div>

        <!-- Data loading error (CSV could not load) -->
        <ErrorState
          v-if="partnersError"
          title="Partnerdaten nicht verfügbar"
          :message="partnersError"
        />

        <!-- Search form -->
        <div v-else class="search-intro__form">
          <PartnerSearchBar
            :placeholder="c.searchPlaceholder"
            :button-label="c.searchButtonLabel"
            :helper-text="c.helperText"
            :loading="searchStatus === 'loading' || partnersLoading"
            @search="runSearch"
            @reset="resetSearch"
          />

          <!-- Inline status feedback below the input -->
          <SearchStatus
            :status="searchStatus"
            :resolved-location="resolvedLocation"
            :result-count="searchResults.length"
          />
        </div>
      </div>
    </BaseSection>

    <BaseSection v-if="searchStatus !== 'idle'">
      <h2 v-if="searchStatus === 'resolved' && searchResults.length > 0" class="results-heading">
        {{ c.resultsHeadline }}
      </h2>

      <PartnerSearchResults
        :status="searchStatus"
        :results="searchResults"
        :resolved-location="resolvedLocation"
        :no-results-text="c.noResultsText"
      />
    </BaseSection>

  </div>
</template>

<script setup>
import { useMeta } from '@/composables/useMeta.js'
import { usePartners } from '@/composables/usePartners.js'
import { usePartnerFinder } from '@/composables/usePartnerFinder.js'
import { expertsContent as c } from '@/data/siteContent.js'

import RichText    from '@/components/base/RichText.vue'
import BaseSection  from '@/components/base/BaseSection.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import PartnerSearchBar from '@/components/search/PartnerSearchBar.vue'
import PartnerSearchResults from '@/components/search/PartnerSearchResults.vue'
import SearchStatus from '@/components/cards/SearchStatus.vue'
import ErrorState from '@/components/cards/ErrorState.vue'
import HeroSection from '../components/sections/HeroSection.vue'

useMeta({
  title: 'Experten in meiner Nähe',
  description:
    'Finden Sie den nächstgelegenen Low-Vision-Spezialisten. ' +
    'Geben Sie Ihre Postleitzahl oder Ihren Ort ein.'
})

// Load partner data (singleton — only fetched once per session)
const { partners, loading: partnersLoading, error: partnersError } = usePartners()

// Search logic
const {
  status: searchStatus,
  results: searchResults,
  resolvedLocation,
  search,
  reset
} = usePartnerFinder(partners)

function runSearch(query) {
  search(query)
}

function resetSearch() {
  reset()
}
</script>

<style scoped>
/* Center the entire search intro block like the page headers */
.search-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-8);
  max-width: 720px;
  margin: 0 auto;
}

.search-intro__copy {
  max-width: 60ch;
}

.search-intro__title {
  margin-bottom: var(--space-4);
}

/* Form wrapper centers the search bar and status text */
.search-intro__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Results heading centered to match */
.results-heading {
  text-align: center;
  margin-bottom: var(--space-6);
}
</style>
