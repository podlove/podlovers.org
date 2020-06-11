<template>
  <div class="py-6">
    <div class="-ml-6" v-for="(entry, index) in timeline" :key="`timeline-${index}`">
      <component :is="entry.component" :data="entry.data" />
    </div>
  </div>
</template>

<script>
import TimeMarker from "./timeline/TimeMarker";
import Chapter from "./timeline/Chapter";
import { toPlayerTime } from "@podlove/utils/time";

export default {
  components: {
    TimeMarker,
    Chapter
  },

  props: {
    chapters: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      default: null
    },
    id: {
      type: String,
      default: null
    }
  },

  computed: {
    timeline() {
      return [
        { component: "time-marker", data: { title: "Start", time: 0, type: 'start' } },
        ...this.chapters.map(data => ({
          component: "chapter", data: { ...data, id: this.id }
        })),
        { component: "time-marker", data: { title: "End", time: this.duration, type: 'end' } }
      ]
    }
  }
};
</script>

<style></style>
