<template>
  <span :title="contributor.name">
    <g-image class="rounded" :src="contributor.avatar" />
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
