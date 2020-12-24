<template>
  <div class="relative" :style="style">
    <doughnut-chart
      :percent="value"
      :width="size"
      :height="size"
      :foregroundColor="color"
      :backgroundColor="background"
    ></doughnut-chart>
    <div class="absolute w-full h-full inset-0 flex justify-center items-center flex-col">
      <span v-if="label" class="text-gray-600 font-mono text-lg font-bold">{{ label }}</span>
      <span v-if="description" class="text-gray-500 font-light">{{ description }}</span>
    </div>
  </div>
</template>

<script>
import DoughnutChart from 'vue-doughnut-chart'

export default {
  components: {
    DoughnutChart
  },

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
    size: {
      type: Number,
      default: 200
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
    }
  }
}
</script>

<style></style>
