<template>
  <g-link :title="contributor.name">
    <g-image class="rounded" :src="contributor.avatar" />
  </g-link>
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
