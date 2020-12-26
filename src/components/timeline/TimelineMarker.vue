<template>
  <div class="flex items-center mb-2 p-2">
    <bullet :top="top" :bottom="bottom">
      <hour-glass class="text-gray-100" />
    </bullet>
    <a @click="play" class="block uppercase font-normal cursor-pointer px-2">
      {{ title }}
    </a>
    <div class="text-gray-500 ml-auto font-mono">{{ duration(start) }}</div>
  </div>
</template>

<script>
import { mapActions } from 'redux-vuex'
import { compose, propOr, prop } from 'ramda'
import { toPlayerTime, toHumanTime } from '@podlove/utils/time'

import Icon from '~/externals'
import HourGlass from '../icon/HourGlass'
import Bullet from './Bullet'

export default {
  components: {
    Bullet,
    HourGlass
  },

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

  computed: {
    title() {
      return propOr('', 'title', this.data)
    },

    start() {
      return propOr('', 'start', this.data)
    },

    node() {
      return prop('node', this.data)
    },

    top() {
      return this.node !== 'start'
    },

    bottom() {
      return this.node !== 'end'
    }
  },

  methods: {
    ...mapActions('playEpisode'),
    duration: compose(toHumanTime, toPlayerTime),
    play() {
      this.playEpisode({ id: this.id, playtime: toPlayerTime(this.start) })
    }
  }
}
</script>
