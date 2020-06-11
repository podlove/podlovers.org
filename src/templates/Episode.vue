<template>
  <Layout>
    <div class="episode-header w-full px-8 py-40 bg-gray-900 flex items-center justify-center relative shadow">
      <div class="w-app flex font-light items-center flex-col">
        <div class="flex">
          <div class="h-48 w-48 mr-8 relative">
            <g-image :src="$page.episode.poster" class="rounded shadow-lg" />
            <div class="absolute h-48 w-48 inset-0 flex items-center justify-center opacity-25 hover:opacity-100 transition ease-in duration-100">
              <play-button :size="150" color="rgba(255, 255, 255)" background="rgba(44, 82, 130, 0.5)" :id="id" />
            </div>
          </div>
          <div>
            <div>
              <span class="text-gray-500 font-mono text-sm text-white">{{ date($page.episode.publicationDate) }}</span>
              <span class="text-gray-500 font-mono text-sm text-white mx-2">・</span>
              <span class="text-gray-500 font-mono text-sm text-white">{{ duration($page.episode.duration) }}</span>
            </div>
            <h1 class="text-white text-3xl mb-5" v-html="$page.episode.title" />
            <div class="w-full">
              <div class="flex items-center">
                <div
                  class="text-center mx-1 flex flex-col items-center mx-2 mb-2"
                  :class="{ 'ml-0': index === 0 }"
                  v-for="(contributor, index) in $page.episode.contributors"
                  :key="`contributor-${contributor.id}`"
                >
                  <contributor class="block w-12" :contributor="contributor" />
                  <span class="text-gray-300 truncate">{{ contributor.name.split(" ").shift() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="episode-header-bottom left"></div>
        <div class="episode-header-bottom shadow left"></div>
        <div class="episode-header-bottom right"></div>
        <div class="episode-header-bottom shadow right"></div>
        <div
          class="absolute text-white bottom-0 h-20 flex justify-center items-center py-4 px-8"
        >
          <!-- Discuss -->
          <button class="mx-4 font-thin flex items-center">
            <svg
              class="mr-3"
              data-v-21801504=""
              data-v-07745886=""
              width="25"
              height="25"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="1.414"
              background="currentColor"
              aria-hidden="true"
              data-v-43f471ac=""
            >
              <g fill="currentColor">
                <path d="M4 10v26h12v10l12-10h18V10H4zm2 2h38v22H27.009L18 41.7V34H6V12z"></path>
                <circle cx="15" cy="23" r="2.5"></circle>
                <circle cx="25" cy="23" r="2.5"></circle>
                <circle cx="35" cy="23" r="2.5"></circle>
              </g>
            </svg>
            <span class="uppercase">Discuss</span>
          </button>
          <!-- Subscribe -->
          <button class="mx-4 font-thin flex items-center">
            <icon class="mr-3" type="subscribe" />
            <span class="uppercase">Subscribe</span>
          </button>
          <!-- Share -->
          <button class="mx-4 font-thin flex items-center">
            <icon class="mr-3" type="share" />
            <span class="uppercase">Share</span>
          </button>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center pt-20">
      <div class="w-app">
        <div class="font-light border-gray-400 border-b mb-12 pt-6 pb-12 px-12">{{ $page.episode.summary }}</div>
        <h3 class="font-mono inline-block border-gray-400 border-b-2 mb-6 mx-2">Timeline</h3>
        <timeline class="font-light border-gray-400 border-b mb-12 pb-12 px-12" :id="$page.episode.id" :chapters="$page.episode.chapters" :duration="$page.episode.duration"/>

        <h3 class="font-mono inline-block border-gray-400 border-b-2 mb-6 mx-2">Shownotes</h3>
        <div class="font-light episode-content border-gray-400 border-b mb-12 pb-12 px-12" v-html="$page.episode.content"></div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  episode(id: $id) {
    id,
    title,
    summary,
    publicationDate,
    poster,
    duration,
    content,
    show {
      poster,
      title,
      subtitle,
      link
    },
    audio {
      url,
      size,
      title,
      mimeType
    },
    chapters {
      start,
      end,
      title,
      href,
      image
    },
    contributors {
      id,
      name
      avatar
    }
  }
}
</page-query>

<script>
import { mapActions, mapState } from 'redux-vuex'
import { compose, path } from "ramda";
import Icon from "@podlove/components/icons";
import { toPlayerTime, toHumanTime } from "@podlove/utils/time";

import { selectors } from '~/store/reducers'
import PlayButton from "~/components/PlayButton";
import Contributor from "~/components/Contributor";
import Timeline from "~/components/Timeline";

export default {
  data: mapState({
    episode: selectors.current.episode
  }),

  components: { Timeline, PlayButton, Contributor, Icon },

  computed: {
    id() {
      return path(["episode", "id"], this.$page);
    },
  },

  methods: {
    ...mapActions('playEpisode'),
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

<style>
.episode-header {
  background-image: url('/bg-pattern.png')
}

.episode-content ul {
  list-style-type: disc !important;
}

.episode-content li {
  margin-bottom: 0.5em;
}

.episode-content a {
  border-bottom: 1px solid rgba(203, 213, 224);
  padding-bottom: 1px;
}

.episode-header-bottom {
  position: absolute;
  background: white;
  width: calc(50% - 250px);
}

.episode-header-bottom.left {
  left: 0;
  bottom: -1em;
  height: 4em;
}

.episode-header-bottom.right {
  right: 0;
  bottom: -1em;
  height: 4em;
}

.episode-header-bottom.shadow.left {
  height: 1px;
  bottom: 3em;
  margin-top: -1px;
}

.episode-header-bottom.shadow.right {
  height: 1px;
  bottom: 3em;
  margin-top: -1px;
}
</style>
