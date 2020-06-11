<template>
  <div class="flex items-center mb-2 p-2 rounded" :class="{ 'bg-gray-300': ghostChapter, 'bg-gray-500': activeChapter }" @mouseover="simulateChapter" @mouseout="disableGhost">
    <bullet :top="true" :bottom="true" :time="start"
      ><icon type="chapter" :size="25" color="rgba(255, 255, 255)"
    /></bullet>
    <a @click="play" class="block uppercase font-normal cursor-pointer px-2">
      {{ title }}
    </a>
    <div class="ml-auto" :class="{ 'text-gray-600 ': !activeChapter }">{{ toHumanTime(start) }}</div>
  </div>
</template>

<script>
import { compose, propOr, prop } from "ramda";
import { toPlayerTime, toHumanTime } from "@podlove/utils/time";
import Icon from "@podlove/components/icons";
import { mapActions } from "redux-vuex";

import { selectors } from "~/store/reducers";
import Bullet from "./Bullet";

export default {
  components: { Bullet, Icon },
  props: {
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
    });
  },
  computed: {
    title() {
      return propOr("", "title", this.data);
    },

    start() {
      return propOr(0, "start", this.data);
    },

    end() {
      return propOr(0, "end", this.data);
    },

    href() {
      return prop("href", this.data);
    },

    id() {
       return prop("id", this.data);
    },

    active() {
      return this.current === this.id
    },

    ghostChapter() {
      return this.active && !this.activeChapter && this.hovered && this.ghost >= this.start && this.ghost < this.end
    },

    activeChapter() {
      return this.active && this.playtime >= this.start && this.playtime < this.end
    }
  },
  methods: {
    ...mapActions("playEpisode", "simulatePlaytime", "enableGhost", "disableGhost"),
    toHumanTime,
    play() {
      this.playEpisode({ id: this.id, playtime: this.start });
    },
    simulateChapter() {
      if (!this.active) {
        return
      }

      this.enableGhost()
      this.simulatePlaytime(this.start)
    }
  }
};
</script>
