<template>
  <ClientOnly>
    <play-button
      :size="size"
      :color="color"
      :background="background"
      @click="play"
      :type="playing ? 'pause' : 'play'"
    />
  </ClientOnly>
</template>

<script>
import { mapActions } from 'redux-vuex'
import { REQUEST_PLAY, REQUEST_PAUSE } from '@podlove/player-actions/types'

import { PlayButton } from './Externals'
import { selectors } from '~/store/reducers'

export default {
  props: {
    id: {
      type: String,
      default: null
    },

    color: {
      type: String,
      default: null
    },

    background: {
      type: String,
      default: null
    },

    size: {
      type: Number,
      default: null
    }
  },

  data() {
    return this.mapState({
      playing: selectors.episode.playing(this.id)
    })
  },

  components: {
    PlayButton
  },

  methods: {
    ...mapActions('playEpisode', 'pauseEpisode'),
    play({ type }) {
      switch (type) {
        case REQUEST_PLAY:
          this.playEpisode({ id: this.id })
          break
        case REQUEST_PAUSE:
          this.pauseEpisode()
          break
      }
    }
  }
}
</script>
