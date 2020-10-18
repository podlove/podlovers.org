<template>
  <div class="py-6">
    <div class="-ml-6" v-for="(entry, index) in timeline" :key="`timeline-${index}`">
      <component :is="entry.type" :data="entry" :id="id" />
    </div>
  </div>
</template>

<script>
import TimelineMarker from './timeline/TimelineMarker'
import Chapter from './timeline/Chapter'
import Transcript from './timeline/Transcript'

export default {
  components: {
    TimelineMarker,
    Chapter,
    Transcript
  },

  props: {
    timeline: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: null
    }
  }
}
</script>
