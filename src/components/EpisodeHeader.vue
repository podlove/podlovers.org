<template>
   <div id="header" class="episode-header w-full px-8 pt-20 pb-40 bg-gray-900 flex items-center justify-center relative shadow">
      <div class="w-app flex font-light items-center flex-col">
        <div class="flex">
          <div class="h-48 w-48 mr-8 relative">
            <g-image v-if="poster" :src="poster" class="rounded shadow-lg" />
            <div
              class="absolute h-48 w-48 inset-0 flex items-center justify-center opacity-25 hover:opacity-100 transition ease-in duration-100"
            >
              <play-button :size="150" color="rgba(255, 255, 255)" background="rgba(44, 82, 130, 0.5)" :id="id" />
            </div>
          </div>
          <div>
            <div>
              <span class="text-gray-500 font-mono text-sm text-white">{{ date(publicationDate) }}</span>
              <span class="text-gray-500 font-mono text-sm text-white mx-2">・</span>
              <span class="text-gray-500 font-mono text-sm text-white">{{ toHumanTime(duration) }}</span>
            </div>
            <g-link :to="path"><h1 v-if="title" class="text-white text-3xl mb-5" v-html="title" /></g-link>
            <div class="w-full">
              <div class="flex items-center">
                <div
                  class="text-center mx-1 flex flex-col items-center mx-2 mb-2"
                  :class="{ 'ml-0': index === 0 }"
                  v-for="(contributor, index) in contributors"
                  :key="`contributor-${contributor.id}`"
                >
                  <contributor class="block w-12" :contributor="contributor" />
                  <span class="text-gray-300 truncate">{{ contributor.name.split(" ").shift() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <slot />
      </div>
    </div>
</template>

<script>
import { toHumanTime } from "@podlove/utils/time";

import PlayButton from "./PlayButton";
import Contributor from "./Contributor";

export default {
  components: { PlayButton, Contributor },

  props: {
    id: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    poster: {
      type: String,
      default: null
    },
    contributors: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: null
    },
    publicationDate: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    }
  },

  methods: {
    toHumanTime,
    date(date) {
      return new Date(date).toLocaleDateString();
    }
  }
}
</script>

<style scoped>
.episode-header {
  background-image: url("/bg-pattern.png");
}

</style>
