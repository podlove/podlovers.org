<template>
  <img
    v-if="imagePath"
    :src="imagePath"
    :width="width"
    :height="height"
    :title="title"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: null
    },
    data: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    imagePath () {
      return this.src ? `/images/${this.src}?width=${this.width}&height=${this.height}` : this.data
    }
  }
}
</script>

<style>
</style>
