<template>
  <div class="relative">
    <div
      class="absolute w-full h-full flex flex-col justify-center content-center z-10 text-center"
    >
      <slot></slot>
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
