<template>
  <div class="w-full">
    <custom-transition type="playbar">
      <div
        v-if="active && !scrolledToBottom"
        :style="playbarStyle"
        class="w-screen fixed bottom-0 play-bar mb-0 z-50"
      >
        <div class="w-full absolute progress px-4">
          <div class="font-shadow flex justify-between text-xs -mt-4 font-bold">
            <timer :time="isNumber(ghost) ? ghost : playtime" />
            <timer :time="duration - (ghost ? ghost : playtime)" :remaining="true" />
          </div>
          <progress-bar
            @input="store.dispatch"
            @simulate="store.dispatch"
            @ghost="store.dispatch"
            :progressColor="progressColor"
            thumbColor="rgba(255, 255, 255)"
            :highlightColor="highlightColor"
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
              <res-image :src="poster" :width="100" :height="100" class="w-16 h-16 mr-2 rounded shadow-md" />
              <div class="overflow-hidden">
                <g-link :to="episodeLink">
                  <h4 class="text-lg text-gray-100 uppercase truncate">{{ title }}</h4>
                </g-link>
                <g-link
                  :to="{ path: episodeLink, query: { t: toHumanTime(currentChapter.start + 10) } }"
                  class="block w-full text-gray-300 text-sm truncate"
                  v-if="!ghostActive && currentChapter && currentChapter.index"
                  >{{ currentChapter.title }}</g-link
                >
                <g-link
                  class="block w-full text-gray-300 text-sm truncate"
                  v-if="ghostActive && ghostChapter && ghostChapter.index"
                  >{{ ghostChapter.title }}</g-link
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
              <stepper-button
                type="backwards"
                class="mx-2 hidden sm:block"
                @click="store.dispatch"
              />
              <play-button
                :color="highlightColor"
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
                <button
                  class="flex justify-center items-center mx-2 rounded h-8 w-10 border-transparent"
                  v-if="chapters.length > 0"
                  @click="toggleChaptersOverlay"
                  :class="{ 'border-gray-100 border': chaptersOverlay }"
                >
                  <chapter-icon color="rgba(255, 255, 255)" />
                </button>
                <button
                  @click="toggleFollowContent"
                  class="flex justify-center items-center mx-2 h-8 w-10 rounded"
                  :class="{ 'border-gray-100 border': followContent }"
                >
                  <lock-icon color="rgba(255, 255, 255)" title="Follow Transcripts" />
                </button>
                <button @click="toggleMute" class="mx-2 ml-4">
                  <icon color="rgba(255, 255, 255)" :type="volumeIcon" />
                </button>
                <div class="w-40 mx-2 mr-4 hidden lg:flex">
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
                  <icon color="rgba(255, 255, 255)" :type="rateIcon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </custom-transition>
    <custom-transition type="chapters">
      <div
        v-if="chaptersOverlay"
        class="fixed z-10 chapters-overlay rounded-t text-left font-light text-gray-100"
        :style="playbarStyle"
      >
        <div class="w-full px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h3 class="uppercase text-lg font-normal leading-none">Chapters</h3>
          <button @click="toggleChaptersOverlay">
            <icon type="close" color="rgba(255, 255, 255)" />
          </button>
        </div>
        <div class="w-full p-2 chapters-list">
          <chapter
            v-for="(chapter, index) in chapters"
            :chapter="chapter"
            :index="index"
            :key="`chapter-${index}`"
          />
        </div>
      </div>
    </custom-transition>
  </div>
</template>

<script>
import { max, is } from 'ramda'
import { throttle } from 'throttle-debounce'
import { mapActions } from 'redux-vuex'
import { toHumanTime } from '@podlove/utils/time'

import {
  Icon,
  PlayButton,
  ProgressBar,
  StepperButton,
  ChapterButton,
  InputSlider,
  Timer
} from '~/externals'
import { selectors } from '~/store/reducers'

import colors from '~/colors'
import CustomTransition from './CustomTransition'
import LockIcon from './icon/Lock'
import ChapterIcon from './icon/Chapter'
import Chapter from './Chapter'
import ResImage from './ResImage'

export default {
  data() {
    return {
      scrolledToBottom: false,
      colors,
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
        episodeLink: selectors.playbar.path,
        chaptersOverlay: selectors.playbar.chapters,
        ghostChapter: selectors.player.ghost.chapter,
        ghostActive: selectors.player.ghost.active
      })
    }
  },
  components: {
    Chapter,
    InputSlider,
    PlayButton,
    ProgressBar,
    Timer,
    StepperButton,
    ChapterButton,
    Icon,
    LockIcon,
    ChapterIcon,
    CustomTransition,
    ResImage
  },
  methods: {
    ...mapActions(
      'setVolume',
      'setRate',
      'nextRate',
      'toggleMute',
      'toggleFollowContent',
      'toggleChaptersOverlay'
    ),
    scroll() {
      this.scrolledToBottom =
        max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) +
          window.innerHeight +
          5 >
        document.documentElement.offsetHeight
    },
    isNumber: is(Number),
    toHumanTime
  },
  computed: {
    playbarStyle() {
      return {
        background: `${this.highlightColor}E6`
      }
    },
    highlightColor() {
      return CONFIG.theme.colors.primary[700]
    },
    progressColor() {
      return CONFIG.theme.colors.primary[100]
    }
  },
  mounted() {
    const scrollListener = throttle(100, this.scroll.bind(this))
    document && document.addEventListener('scroll', scrollListener)
  }
}
</script>

<style>
.progress {
  margin-top: -5px;
}

.font-shadow {
  text-shadow: 0 0 3px white;
}

.chapters-overlay {
  width: 450px;
  bottom: 104px;
  right: 100px;
}

.chapters-list {
  max-height: calc(100vh - 250px);
  overflow-x: auto;
}

.chapter-progress {
  overflow: hidden;
}

.chapter-progress .title {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
