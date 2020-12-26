<template>
  <div>
    <div class="flex">
      <div class="player-tile-button w-20 h-20 mr-4 relative flex-shrink-0 mt-1">
        <g-image
          v-if="episode.poster"
          :src="require(`!!assets-loader?width=100&height=100!@images/${episode.poster}`)"
          class="rounded w-20 h-20 shadow-xs"
        />
        <div
          class="absolute flex opacity-50 hover:opacity-100 items-center justify-center w-20 h-20 inset-0"
        >
          <play-button
            color="rgba(255, 255, 255)"
            background="rgba(44, 82, 130)"
            :size="50"
            :id="episode.id"
          />
        </div>
      </div>
      <div class="flex flex-col overflow-hidden">
        <div class="h-20 mb-2 sm:h-auto sm:mb-0">
          <g-link
            :to="episode.path"
            v-if="episode.title"
            class="leading-tight sm:leading block text-xl mb-1 uppercase whitespace-no-wrap truncate"
            >{{ episode.mnemonic }} {{ episode.title }}</g-link
          >
          <div class="block md:flex mb-2">
            <div class="flex mb-2 md:mb-0">
              <contributor
                class="mr-1 w-6"
                v-for="contributor in contributors"
                :contributor="contributor"
                :key="`contributor-${contributor.id}`"
                :popover="`popover-contributor-${episode.id}-${contributor.id}`"
              />
              <contributor-popover
                v-for="contributor in contributors"
                :key="`popover-contributor-${contributor.id}`"
                :name="contributor.name"
                :role="contributor.role"
                :id="`popover-contributor-${episode.id}-${contributor.id}`"
              />
            </div>
            <div class="flex">
              <span class="text-gray-500 mx-1 hidden md:inline" v-if="contributors.length > 0"
                >・</span
              >
              <span
                class="block font-light text-gray-500 text-base"
                v-if="episode.publicationDate"
                >{{ date(episode.publicationDate) }}</span
              >
              <span class="text-gray-500 mx-1" v-if="episode.duration">・</span>
              <span class="block font-light text-gray-500" v-if="episode.duration">{{
                toHumanTime(episode.duration)
              }}</span>
            </div>
          </div>
        </div>
        <div class="summary font-light hidden md:block" v-if="summary" v-html="summary"></div>
      </div>
    </div>
    <div class="summary font-light block md:hidden" v-if="summary" v-html="summary"></div>
  </div>
</template>

<script>
import { compose, pathOr, path } from 'ramda'
import { toHumanTime } from '@podlove/utils/time'
import truncate from 'trunc-text'

import { selectors } from '~/store/reducers'

import Contributor from './Contributor'
import ContributorPopover from './ContributorPopover'
import PlayButton from './PlayButton'

export default {
  components: {
    PlayButton,
    Contributor,
    ContributorPopover
  },

  props: {
    episode: {
      type: Object,
      default: () => ({
        id: null,
        title: null,
        mnemonic: null,
        summary: null,
        publicationDate: null,
        poster: null,
        show: null,
        path: null,
        contributors: [],
        duration: null
      })
    }
  },

  computed: {
    summary() {
      return truncate(pathOr('', ['episode', 'summary'], this), 400)
    },
    contributors() {
      return pathOr([], ['episode', 'contributors'], this).map((contributor) => ({
        id: path(['details', 'id'], contributor),
        slug: path(['details', 'slug'], contributor),
        name: path(['details', 'name'], contributor),
        avatar: path(['details', 'avatar'], contributor),
        role: path(['role', 'title'], contributor)
      }))
    }
  },

  methods: {
    date(date) {
      return new Date(date).toLocaleDateString()
    },
    toHumanTime
  }
}
</script>

<style scoped>
.summary {
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

.player-tile-button {
  width: 85px;
  height: 85px;
}
</style>
