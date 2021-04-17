<template>
  <transition name="fade">
    <div
      v-if="visible"
      @click="hide"
      class="search w-full h-full fixed left-0 top-0 bg-gray-400 z-50 bg-opacity-75 opacity-100"
    >
      <div
        ref="content"
        class="relative w-11/12 lg:w-7/12 max-w-4xl mt-16 mb-16 bg-gray-100 border-gray-400 rounded shadow-lg mx-auto"
        @mouseleave="selectSearchResult(null)"
      >
        <button
          class="absolute top-0 right-0 -mt-12 lg:-mr-10 lg:-mt-10 text-gray-100"
          @click="hideSearch"
        >
          <icon type="close" :size="35" />
        </button>
        <div class="w-full flex px-5 py-2">
          <loader class="text-gray-500 mt-2" :size="35" v-if="loading" />
          <icon type="search" class="text-gray-500 mt-1" :size="35" v-else />
          <input
            v-if="initialized"
            type="text"
            class="font-light text-2xl text-gray-500 w-full p-2 focus:outline-none"
            @input="search($event.target.value)"
            ref="search"
            id="search-input"
            :placeholder="$t(`SEARCH.PLACEHOLDER`)"
            :value="query"
          />
          <span v-else class="font-light text-2xl text-gray-500 w-full p-2">{{ $t(`SEARCH.INDEXING`) }}</span>
          <button class="text-gray-500 -ml-5" @click="search('')">
            <icon v-if="query && query.length > 0" type="search-clear" color="white" :size="35" />
          </button>
        </div>
        <transition name="fadeHeight" mode="out-in">
          <div
            class="border-t border-gray-300 px-6 py-6 text-gray-600 text-center"
            v-if="!hasResults && query && query.length > 0"
          >
            {{ $t('SEARCH.NO_RESULTS') }}
          </div>
          <div
            class="results border-t border-gray-300 px-3 py-3 overflow-y-auto"
            v-if="hasResults"
            ref="results"
          >
            <div class="text-gray-800 tracking-wide" v-if="contributors.length > 0">
              <span class="font-normal px-3 mt-3 text-primary-700 opacity-75">
                {{ $t(`SEARCH.CATEGORY.CONTRIBUTOR`) }}
              </span>
              <button
                @click="selectContributor(result)"
                class="flex items-center px-3 py-3 m-1 focus: font-normal w-full rounded-lg focus:outline-none"
                v-for="result in contributors"
                :class="{ 'bg-gray-200': focused === result.node.id }"
                :key="result.node.id"
                :data-result="result.node.id"
                @mouseover="selectSearchResult(result.node.id)"
                @focus="selectSearchResult(result.node.id)"
              >
                <res-image
                  :src="result.node.avatar"
                  :width="30"
                  :height="30"
                  class="rounded-full mr-2"
                />

                {{ result.node.name }}
              </button>
            </div>
            <div class="text-gray-800 tracking-wide" v-if="episodes.length > 0">
              <span class="font-normal px-3 mt-3 text-primary-700 opacity-75">
                {{ $t(`SEARCH.CATEGORY.EPISODE`) }}
              </span>
              <button
                @click="selectEpisode(result)"
                class="flex items-center px-3 py-3 m-1 font-normal w-full rounded-lg focus:outline-none"
                v-for="result in episodes"
                :class="{ 'bg-gray-200': focused === result.node.id }"
                :key="result.node.id"
                :data-result="result.node.id"
                @mouseover="selectSearchResult(result.node.id)"
                @focus="selectSearchResult(result.node.id)"
              >
                <span class="rounded-lg bg-primary-600 text-gray-100 px-2 p-1 mr-2 text-sm">{{
                  result.node.mnemonic
                }}</span>
                {{ result.node.title }}
              </button>
            </div>
            <div class="text-gray-800 tracking-wide" v-if="transcripts.length > 0">
              <span class="font-normal px-3 mt-3 text-primary-700 opacity-75">
                {{ $t(`SEARCH.CATEGORY.TRANSCRIPT`) }}
              </span>
              <button
                @click="selectTranscript(result)"
                class="flex items-center px-3 py-2 m-1 font-normal rounded-lg w-full justify-start text-left focus:outline-none"
                v-for="result in transcripts"
                :class="{ 'bg-gray-200': focused === result.node.id }"
                :key="result.node.id"
                :data-result="result.node.id"
                @mouseover="selectSearchResult(result.node.id)"
                @focus="selectSearchResult(result.node.id)"
              >
              <res-image :src="result.node.speaker.avatar" :width="30" :height="30" class="rounded-full mr-2" />
                <div class="truncate leading-tight">
                  <div class="italic truncate">{{ result.node.text }}</div>
                  <div class="text-sm text-gray-400 font-light">
                    {{ result.node.episode.mnemonic }} - {{ result.node.episode.title }}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from 'redux-vuex'

import { Icon } from '~/externals'
import { selectors } from '~/store/reducers'
import Loader from './icon/Loader'
import ResImage from './ResImage'

export default {
  data: mapState({
    visible: selectors.search.visible,
    query: selectors.search.query,
    contributors: selectors.search.contributors,
    episodes: selectors.search.episodes,
    transcripts: selectors.search.transcripts,
    initialized: selectors.search.initialized,
    loading: selectors.search.loading,
    hasResults: selectors.search.hasResults,
    focused: selectors.search.selectedResult
  }),
  components: {
    Icon,
    Loader,
    ResImage
  },
  methods: {
    ...mapActions(
      'search',
      'selectSearchResult',
      'selectTranscript',
      'selectContributor',
      'selectEpisode',
      'hideSearch'
    ),
    hide(event) {
      if (!event.target.contains(this.$refs.content)) {
        return
      }
      event.preventDefault()
      this.hideSearch()
    }
  }
}
</script>

<style scoped>
.results {
  max-height: calc(100vh - 52px - 64px - 64px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter,
.fade-leave-to {
  display: block;
  opacity: 0;
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: max-height 300ms;
  max-height: calc(100vh - 52px - 64px - 64px);
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
