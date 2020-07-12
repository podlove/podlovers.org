<template>
  <div class="flex items-center mb-2 p-2">
    <bullet :top="top" :bottom="bottom">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <path
          fill="rgba(255, 255, 255)"
          d="M18.513 7.119c.958-1.143 1.487-2.577 1.487-4.036v-3.083h-16v3.083c0 1.459.528 2.892 1.487 4.035l3.086 3.68c.567.677.571 1.625.009 2.306l-3.13 3.794c-.936 1.136-1.452 2.555-1.452 3.995v3.107h16v-3.107c0-1.44-.517-2.858-1.453-3.994l-3.13-3.794c-.562-.681-.558-1.629.009-2.306l3.087-3.68zm-4.639 7.257l3.13 3.794c.652.792.996 1.726.996 2.83h-1.061c-.793-2.017-4.939-5-4.939-5s-4.147 2.983-4.94 5h-1.06c0-1.104.343-2.039.996-2.829l3.129-3.793c1.167-1.414 1.159-3.459-.019-4.864l-3.086-3.681c-.66-.785-1.02-1.736-1.02-2.834h12c0 1.101-.363 2.05-1.02 2.834l-3.087 3.68c-1.177 1.405-1.185 3.451-.019 4.863z"
        />
      </svg>
    </bullet>
    <a @click="play" class="block uppercase font-normal cursor-pointer px-2">
      {{ title }}
    </a>
    <div class="text-gray-600 ml-auto">{{ duration(start) }}</div>
  </div>
</template>

<script>
import { mapActions } from "redux-vuex";
import { compose, propOr, prop } from "ramda";
import { toPlayerTime, toHumanTime } from "@podlove/utils/time";

import Icon from "~/components/Externals";
import Bullet from "./Bullet";

export default {
  components: {
    Bullet
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
      return propOr("", "title", this.data);
    },

    start() {
      return propOr("", "start", this.data);
    },

    node() {
      return prop("node", this.data);
    },

    top() {
      return this.node !== "start";
    },

    bottom() {
      return this.node !== "end";
    }
  },

  methods: {
    ...mapActions("playEpisode"),
    duration: compose(
      toHumanTime,
      toPlayerTime
    ),
    play() {
      this.playEpisode({ id: this.id, playtime: toPlayerTime(this.start) });
    }
  }
};
</script>
