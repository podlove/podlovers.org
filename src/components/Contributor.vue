<template>
  <span v-if="contributor.details.avatar" :title="contributor.details.name">
    <g-image
      class="rounded"
      :src="require(`!!assets-loader?width=48&height=48!@images/${contributor.details.avatar}`)"
    />
  </span>
</template>

<script>
export default {
  props: {
    contributor: {
      type: Object,
      default: () => ({
        details: {
          name: null,
          id: null,
          avatar: null
        }
      })
    }
  }
}
</script>
