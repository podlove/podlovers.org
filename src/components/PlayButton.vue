<template>
  <play-button
    :size="size"
    :color="color"
    :background="background"
    @click="play"
    :type="playing ? 'pause' : 'play'"
  />
</template>

<script>
import { mapActions } from 'redux-vuex'
import { REQUEST_PLAY, REQUEST_PAUSE } from '@podlove/player-actions/types'

import { PlayButton } from '~/externals'
import { selectors } from '~/store/reducers'

export default {
  props: {
    id: {
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

  computed: {
    color() {
      return CONFIG.theme.colors.primary[200]
    },

    background() {
      return CONFIG.theme.colors.primary[800]
    },
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
