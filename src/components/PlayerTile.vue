<template>
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
    <div class="flex flex-col">
      <div class="h-20 mb-2 sm:h-auto sm:mb-0">
        <g-link
          :to="episode.path"
          v-if="episode.title"
          class="leading-tight sm:leading block text-xl mb-1 uppercase whitespace-no-wrap truncate"
          >{{ episode.title }}</g-link
        >
        <div class="block md:flex mb-2">
          <div class="flex mb-2 md:mb-0">
            <contributor
              class="mr-1 w-6"
              v-for="contributor in episode.contributors"
              :contributor="contributor"
              :key="`contributor-${contributor.details.id}`"
            />
          </div>
          <div class="flex">
            <span class="text-gray-500 mx-1 hidden md:inline" v-if="episode.contributors.length > 0"
              >・</span
            >
            <span class="block font-light text-gray-500 text-base" v-if="episode.publicationDate">{{
              date(episode.publicationDate)
            }}</span>
            <span class="text-gray-500 mx-1" v-if="episode.duration">・</span>
            <span class="block font-light text-gray-500" v-if="episode.duration">{{
              toHumanTime(episode.duration)
            }}</span>
          </div>
        </div>
      </div>
      <div class="summary font-light -ml-24 sm:ml-0" v-if="summary" v-html="summary"></div>
    </div>
  </div>
</template>

<script>
import { compose, pathOr } from 'ramda'
import { toHumanTime } from '@podlove/utils/time'
import truncate from 'trunc-text'

import { selectors } from '~/store/reducers'

import Contributor from './Contributor'
import PlayButton from './PlayButton'

export default {
  components: {
    PlayButton,
    Contributor
  },

  props: {
    episode: {
      type: Object,
      default: () => ({
        id: null,
        title: null,
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
