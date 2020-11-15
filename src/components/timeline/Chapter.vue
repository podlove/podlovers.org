<template>
  <div class="flex items-center mb-2 px-2" @mouseover="simulateChapter" @mouseout="disableGhost">
    <bullet :top="true" :bottom="true" :time="start"
      ><ClientOnly><icon type="chapter" :size="25" color="rgba(255, 255, 255)" /></ClientOnly
    ></bullet>
    <div
      class="flex w-full items-center p-2 -mx-2 rounded"
      :class="{
        'bg-podlove-blue-300': ghostChapter,
        'bg-podlove-blue-700 text-gray-100': activeChapter
      }"
    >
      <a
        @click="play"
        class="block uppercase font-normal cursor-pointer px-2 py-1 rounded truncate w-5/6"
      >
        {{ title }}
      </a>
      <div
        class="ml-auto font-mono"
        :class="{ 'text-gray-100': activeChapter, 'text-gray-500': !activeChapter }"
      >
        {{ toHumanTime(start) }}
      </div>
    </div>
  </div>
</template>

<script>
import { compose, propOr, prop } from 'ramda'
import { toPlayerTime, toHumanTime } from '@podlove/utils/time'
import { mapActions } from 'redux-vuex'

import { selectors } from '~/store/reducers'
import { Icon } from '~/components/Externals'
import Bullet from './Bullet'

export default {
  components: { Bullet, Icon },
  props: {
    id: {
      type: String,
      default: null
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return this.mapState({
      ghost: selectors.player.ghost.time,
      hovered: selectors.player.ghost.active,
      current: selectors.current.episode,
      playtime: selectors.player.playtime
    })
  },
  computed: {
    title() {
      return propOr('', 'title', this.data)
    },

    start() {
      return propOr(0, 'start', this.data)
    },

    end() {
      return propOr(0, 'end', this.data)
    },

    href() {
      return prop('href', this.data)
    },

    active() {
      return this.current === this.id
    },

    ghostChapter() {
      return (
        this.active &&
        !this.activeChapter &&
        this.hovered &&
        this.ghost >= this.start &&
        this.ghost < this.end
      )
    },

    activeChapter() {
      return this.active && this.playtime >= this.start && this.playtime < this.end
    }
  },
  methods: {
    ...mapActions('playEpisode', 'simulatePlaytime', 'enableGhost', 'disableGhost'),
    toHumanTime,
    play() {
      this.playEpisode({ id: this.id, playtime: this.start })
    },
    simulateChapter() {
      if (!this.active) {
        return
      }

      this.enableGhost()
      this.simulatePlaytime(this.start > 0 ? this.start + 1 : 0)
    }
  }
}
</script>
