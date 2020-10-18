<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    enable-background="new 0 0 100 100"
    xml:space="preserve"
    :width="size"
    :height="size"
  >
    <path
      :fill="color"
      d="M50,11c21.5,0,39,17.5,39,39S71.5,89,50,89S11,71.5,11,50S28.5,11,50,11 M50,5C25.1,5,5,25.1,5,50s20.1,45,45,45  c24.9,0,45-20.1,45-45S74.9,5,50,5L50,5z M53,70.2V45.4c0-1.7-1.3-3-3-3s-3,1.3-3,3v24.8c0,1.7,1.3,3,3,3S53,71.8,53,70.2z M50,27.2  c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S52.2,27.2,50,27.2z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 25
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>

<style></style>
