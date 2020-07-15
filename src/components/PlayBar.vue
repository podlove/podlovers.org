<template>
  <custom-transition type="playbar">
    <div
      v-if="active && !scrolledToBottom"
      class="w-screen fixed bottom-0 play-bar mb-0"
    >
      <div class="w-full absolute progress-bar px-4">
        <div class="font-shadow flex justify-between text-xs -mt-4 font-bold">
          <timer :time="ghost ? ghost : playtime" />
          <timer :time="duration - (ghost ? ghost : playtime)" :remaining="true" />
        </div>
        <progress-bar
          @input="store.dispatch"
          @simulate="store.dispatch"
          @ghost="store.dispatch"
          progressColor="rgba(42, 67, 101)"
          thumbColor="rgba(255, 255, 255)"
          highlightColor="rgba(44, 82, 130)"
          :duration="duration"
          :time="playtime"
          :ghost="ghost"
          :buffer="buffer"
          :chapters="chapters"
          :quantiles="quantiles"
        />
      </div>
      <div class="px-4 py-2 pt-8">
        <div class="flex w-full h-16">
          <div class="flex w-3/4 sm:w-1/2 md:w-1/3">
            <g-image v-if="poster" :src="poster" class="w-16 h-16 mr-2 border rounded border-white shadow-md" />
            <div class="overflow-hidden">
              <g-link :to="episodeLink"
                ><h4 class="text-lg text-white uppercase truncate">{{ title }}</h4></g-link
              >
              <g-link
                :to="episodeLink"
                class="block w-full text-gray-400 text-sm truncate"
                v-if="currentChapter && currentChapter.index"
                >{{ currentChapter.title }}</g-link
              >
            </div>
          </div>
          <div class="w-1/4 sm:w-1/2 md:w-1/3 flex items-center justify-center">
            <chapter-button
              v-if="chapters.length > 0"
              type="previous"
              color="rgba(255, 255, 255)"
              class="mx-2 hidden sm:block"
              @click="store.dispatch"
            />
            <stepper-button type="backwards" class="mx-2 hidden sm:block" @click="store.dispatch" />
            <play-button
              color="rgba(44, 82, 130)"
              background="rgba(255, 255, 255)"
              class="mx-2 rounded-full shadow-none hover:shadow-md"
              :type="buttonType"
              @click="store.dispatch"
            />
            <stepper-button type="forward" class="mx-2 hidden sm:block" @click="store.dispatch" />
            <chapter-button
              v-if="chapters.length > 0"
              type="next"
              color="rgba(255, 255, 255)"
              class="mx-2 hidden sm:block"
              @click="store.dispatch"
            />
          </div>
          <div class="justify-center items-end w-1/3 flex-col hidden md:flex">
            <div class="flex items-center">
              <button v-if="followContentButton" @click="toggleFollowContent" class="mx-2">
                <lock class="mr-2" color="rgba(255, 255, 255)" title="Follow Transcripts" :active="followContent" />
              </button>
              <button @click="toggleMute" class="mx-2"><icon color="rgba(255, 255, 255)" :type="volumeIcon" /></button>
              <div class="w-40 mx-2">
                <input-slider
                  :min="0"
                  :max="1"
                  :value="volume"
                  @input="setVolume"
                  :step="0.001"
                  background="rgba(255, 255, 255)"
                  borderColor="rgba(255, 255, 255)"
                />
              </div>
              <button class="mx-2" @click="nextRate" @dblclick="setRate(1)">
                <ClientOnly><icon color="rgba(255, 255, 255)" :type="rateIcon" /></ClientOnly>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </custom-transition>
</template>

<script>
import { path, max } from "ramda";
import { throttle } from "throttle-debounce";
import queryString from "query-string";
import urlify from "lodash.kebabcase";
import { mapState, mapActions } from "redux-vuex";

import { Icon, PlayButton, ProgressBar, StepperButton, ChapterButton, InputSlider, Timer } from "~/components/Externals";

import CustomTransition from "~/components/CustomTransition";
import Lock from "~/components/icon/Lock";

import { selectors } from "~/store/reducers";

export default {
  data() {
    return {
      scrolledToBottom: false,
      ...this.mapState({
        active: selectors.playbar.active,
        episode: selectors.current.episode,
        buttonType: selectors.playbar.button,
        duration: selectors.player.duration,
        playtime: selectors.player.playtime,
        ghost: selectors.player.ghost.time,
        buffer: selectors.player.buffer,
        chapters: selectors.player.chapters.list,
        currentChapter: selectors.player.chapters.current,
        quantiles: selectors.player.quantiles,
        title: selectors.player.title,
        poster: selectors.player.image,
        volumeIcon: selectors.playbar.volume,
        volumeSlider: selectors.playbar.volumeSlider,
        volume: selectors.player.audio.volume,
        rateIcon: selectors.playbar.rate,
        followContent: selectors.playbar.followContent,
        episodeLink: selectors.playbar.path
      })
    };
  },
  components: { InputSlider, PlayButton, ProgressBar, Timer, StepperButton, ChapterButton, Icon, Lock, CustomTransition },
  methods: {
    ...mapActions("setVolume", "setRate", "nextRate", "toggleMute", "toggleFollowContent"),
    scroll() {
      this.scrolledToBottom =
        max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight + 5 >
        document.documentElement.offsetHeight;
    }
  },
  computed: {
    followContentButton() {
      return path(["$page", "episode", "id"], this) === this.episode;
    }
  },
  mounted() {
    const scrollListener = throttle(100, this.scroll.bind(this));
    document.addEventListener("scroll", scrollListener);
  }
};
</script>

<style scoped>
.play-bar {
  background: rgba(44, 82, 130, 0.92);
}

.progress-bar {
  margin-top: -10px;
}

.font-shadow {
  text-shadow: 0 0 3px white;
}
</style>
