<template>
  <img
    v-if="src"
    :src="`/images/${src}?width=${width}&height=${height}`"
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
  }
}
</script>

<style>
</style>
