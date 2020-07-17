<template>
  <span :title="contributor.name">
    <g-image class="rounded" :src="require(`!!assets-loader?width=48&height=48!@images/${contributor.avatar}`)" />
  </span>
</template>

<script>
export default {
  props: {
    contributor: {
      type: Object,
      default: () => ({
        name: null,
        id: null,
        avatar: null
      })
    }
  }
}
</script>
