<template>
  <div
    class="flex px-2 -mx-2 rounded-sm"
    :class="{ 'font-normal': active }"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
    data-test="tab-chapters--entry"
  >
    <span
      class="cursor-pointer w-8 py-2 mr-2 flex items-center justify-center"
      @click="selectChapter()"
    >
      <icon v-if="action.icon" :type="action.icon" :size="24" />
      <span v-else>{{ action.content }}</span>
    </span>

    <chapter-progress
      class="w-full whitespace-no-wrap"
      :chapter="chapter"
      :playtime="playtime"
      :ghost="ghost"
      progressColor="white"
      @chapter="store.dispatch"
      @play="store.dispatch"
      @ghost="store.dispatch"
      @simulate="store.dispatch"
      @playtime="store.dispatch"
    />
  </div>
</template>

<script>
import { setChapter } from '@podlove/player-actions/chapters'
import { requestPlay, requestPause } from '@podlove/player-actions/play'

import { selectors } from '~/store/reducers'
import { ChapterProgress, Icon } from '~/externals'

export default {
  components: {
    Icon,
    ChapterProgress
  },

  props: {
    chapter: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      ...this.mapState({
        playtime: selectors.player.playtime,
        ghost: selectors.player.ghost.time,
        current: selectors.player.chapters.current,
        playing: selectors.player.playing
      }),
      hover: false
    }
  },

  computed: {
    active() {
      return this.chapter.active || this.hover
    },

    action() {
      if (this.current.index === this.chapter.index) {
        return {
          icon: this.playing ? 'menu-pause' : 'menu-play'
        }
      }

      if (this.hover) {
        return {
          icon: 'menu-play'
        }
      }

      return {
        content: this.chapter.index
      }
    }
  },

  methods: {
    mouseOverHandler() {
      this.hover = true
    },

    mouseLeaveHandler() {
      this.hover = false
    },

    selectChapter(event) {
      if (this.current.index === this.chapter.index) {
        this.store.dispatch(this.playing ? requestPause() : requestPlay())
        return false
      }

      this.store.dispatch(setChapter(this.chapter.index - 1))
      this.store.dispatch(requestPlay())
      event && event.preventDefault()
      return false
    }
  }
}
</script>
