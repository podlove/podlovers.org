<template>
  <div
    id="header"
    class="episode-header w-full px-8 pt-20 pb-32 bg-podlove-blue-900 flex items-center justify-center relative shadow"
    :class="{ 'pb-40': expanded }"
  >
    <div class="w-app flex font-light items-center flex-col mt-6">
      <div class="flex flex-col items-center md:items-start md:flex-row">
        <div class="episode-poster relative mb-4 md:mb-0 md:mr-8">
          <g-image v-if="poster" :src="require(`!!assets-loader?width=180&height=180!@images/${poster}`)" class="rounded shadow-lg border border-podlove-blue-700" />
          <div
            class="absolute w-full h-full inset-0 flex items-center justify-center opacity-75 hover:opacity-100 transition ease-in duration-100"
          >
            <play-button :size="150" color="rgba(255, 255, 255)" background="rgba(44, 82, 130, 0.5)" :id="id" />
          </div>
        </div>
        <div class="flex flex-col items-center md:block">
          <div>
            <span class="text-gray-500 font-mono text-sm">{{ date(publicationDate) }}</span>
            <span class="text-gray-500 font-mono text-sm mx-2">・</span>
            <span class="text-gray-500 font-mono text-sm">{{ toHumanTime(duration) }}</span>
          </div>
          <g-link :to="path" class="text-center md:text-left">
            <h1 v-if="title" class="text-gray-100 text-3xl mb-5" v-html="title" />
          </g-link>
          <div class="w-full flex flex-wrap justify-center md:justify-start">
            <div
              class="text-center flex flex-col items-center mx-2 mb-2 w-16"
              :class="{ 'ml-0': index === 0 }"
              v-for="(contributor, index) in contributors"
              :key="`contributor-${contributor.details.id}`"
            >
              <contributor class="block w-12" :contributor="contributor" />
              <span class="text-gray-300 truncate">{{ contributor.details.name.split(" ").shift() }}</span>
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
  },

  computed: {
    expanded() {
      return !!this.$slots.default;
    }
  }
};
</script>

<style scoped>
.episode-header {
  background-image: url("/bg-pattern.png");
}

.episode-poster {
  width: 180px;
  height: 180px;
}
</style>
