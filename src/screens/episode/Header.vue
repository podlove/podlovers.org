<template>
  <header-container :class="{ 'pb-40': expanded }">
    <div class="w-app flex font-light items-center flex-col mt-6">
      <div class="flex flex-col items-center md:items-start md:flex-row">
        <div class="episode-poster relative mb-4 md:mb-0 md:mr-8">
          <res-image
            :src="poster"
            :width="180"
            :height="180"
            class="rounded shadow-lg border border-primary-700"
          />
          <div
            class="absolute w-full h-full inset-0 flex items-center justify-center opacity-75 hover:opacity-100 transition ease-in duration-100"
          >
            <ClientOnly>
              <play-button
                :size="150"
                :id="id"
              />
            </ClientOnly>
          </div>
        </div>
        <div class="flex flex-col items-center md:block">
          <div class="text-gray-500 font-mono text-sm py-1">
            <span>{{ date(publicationDate) }}</span>
            <span class="mx-2">・</span>
            <span>{{ toHumanTime(duration) }}</span>
          </div>
          <g-link :to="path" class="text-center md:text-left">
            <h1 v-if="title" class="text-gray-100 text-3xl mb-5" v-html="title" />
          </g-link>
          <div class="w-full flex flex-wrap justify-center md:justify-start">
            <div
              class="text-center flex flex-col items-center mx-2 mb-2 w-16"
              :class="{ 'ml-0': index === 0 }"
              v-for="(contributor, index) in contributors"
              :key="`contributor-${contributor.id}`"
            >
              <contributor class="block w-12 mb-1" :contributor="contributor" />
              <span class="text-gray-300 truncate">{{ contributor.nickname }}</span>
            </div>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </header-container>
</template>

<script>
import { toHumanTime } from '@podlove/utils/time'

import HeaderContainer from '~/components/Header';
import PlayButton from '~/components/PlayButton'
import Contributor from '~/components/Contributor'
import ResImage from '~/components/ResImage'

export default {
  components: { HeaderContainer, PlayButton, Contributor, ResImage },

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
      return new Date(date).toLocaleDateString()
    }
  },

  computed: {
    expanded() {
      return !!this.$slots.default
    }
  }
}
</script>

<style scoped>
.episode-poster {
  width: 180px;
  height: 180px;
}
</style>
