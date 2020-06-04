<template>
  <div class="flex">
    <div class="w-20 h-20 mr-4 relative flex-shrink-0 mt-1">
      <g-image v-if="episode.poster" :src="episode.poster" class="rounded w-20 h-20" />
      <div class="absolute flex opacity-0 hover:opacity-100 items-center justify-center w-20 h-20 inset-0">
        <play-button color="rgba(255, 255, 255)" background="rgba(44, 82, 130)" :id="episode.id" />
      </div>
    </div>
    <div>
      <g-link :to="episode.path" v-if="episode.title" class="block text-xl mb-1 uppercase">{{ episode.title }}</g-link>
      <div class="flex mb-2 items-center">
        <contributor
          class="mr-1 w-6"
          v-for="contributor in episode.contributors"
          :contributor="contributor"
          :key="`contributor-${contributor.id}`"
        />
        <span class="text-gray-500 mx-1" v-if="episode.contributors.length > 0">・</span>
        <span class="block font-light text-gray-500" v-if="episode.duration">{{ duration(episode.duration) }}</span>
        <span class="text-gray-500 mx-1" v-if="episode.duration">・</span>
        <span class="block font-light text-gray-500 text-base" v-if="episode.publicationDate">{{
          date(episode.publicationDate)
        }}</span>
      </div>
      <p class="summary font-light" v-if="episode.summary" v-html="episode.summary"></p>
    </div>
  </div>
</template>

<script>
import { compose } from "ramda";
import { toPlayerTime, toHumanTime } from "@podlove/utils/time";

import { selectors } from "~/store/reducers";
import Contributor from "./Contributor";
import PlayButton from "./PlayButton";

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
        contributors: null,
        publicationDate: null,
        poster: null,
        show: null,
        path: null,
        contributors: [],
        duration: null
      })
    }
  },

  methods: {
    date(date) {
      return new Date(date).toLocaleDateString();
    },
    duration: compose(
      toHumanTime,
      toPlayerTime
    )
  }
};
</script>

<style scoped>
.summary {
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}
</style>
