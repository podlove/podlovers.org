<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    x="0px"
    y="0px"
    :width="size"
    :height="size"
  >
    <g :fill="color">
      <polygon points="55 35 70 50 55 65 55 35" />
      <polygon points="30 35 45 50 30 65 30 35" />
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
