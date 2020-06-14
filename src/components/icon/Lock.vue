<template>
  <span :style="{ width: `${size}px`, height: `${size}px`, 'border-color': color }" class="rounded-full border flex items-center justify-center">
    <span v-if="active" :style="{ background: color, width: `${ size / 3 }px`, height: `${size / 3 }px` }" class="rounded-full"></span>
  </span>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: "#fff"
    },
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>
