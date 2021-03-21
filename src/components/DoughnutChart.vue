<template>
  <!-- <div class="relative" :style="style">
    <doughnut-chart
      :percent="value"
      :width="size"
      :height="size"
      :foregroundColor="color"
      :backgroundColor="background"
    ></doughnut-chart>
    <div class="absolute w-full h-full inset-0 flex justify-center doughnuts-center flex-col">
      <span v-if="label" class="text-gray-600 font-mono text-lg font-bold">{{ label }}</span>
      <span v-if="description" class="text-gray-500 font-light">{{ description }}</span>
    </div>
  </div> -->
  <div class="relative">
    <div
      class="absolute w-full h-full flex flex-col justify-center content-center z-10 text-center"
    >
      <span v-if="label" class="text-gray-600 font-mono text-lg font-bold">{{ label }}</span>
      <span v-if="description" class="text-gray-500 font-light">{{ description }}</span>
    </div>
    <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
      <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
      <circle
        class="donut-ring"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        :stroke="background"
        stroke-width="3"
      ></circle>

      <circle
        class="donut-segment"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        :stroke="color"
        stroke-width="3"
        :stroke-dasharray="segment"
        stroke-dashoffset="0"
      ></circle>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: [String, Number]
    },
    description: {
      type: String
    },
    color: {
      type: String,
      default: '#1993ff'
    },
    background: {
      type: String,
      default: '#ecf6ff'
    }
  },

  computed: {
    style() {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      }
    },
    segment() {
      return `${this.value} ${100-this.value}`
    }
  }
}
</script>

<style scoped>
svg {
  transform: rotate(-90deg);
}
</style>
