<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:osb="http://www.openswatchbook.org/uri/2009/osb"
    version="1.1"
    viewBox="0 0 64 64"
    x="0px"
    y="0px"
    :width="size"
    :height="size"
  >
    <path
      d="m26.478516 48a1.50015 1.50015 0 1 0 0 3h21a1.50015 1.50015 0 1 0 0-3z"
      :style="style"
      :fill="color"
    />
    <path
      d="m26.478516 30a1.50015 1.50015 0 1 0 0 3h29a1.50015 1.50015 0 1 0 0-3z"
      :style="style"
      :fill="color"
    />
    <path
      d="m13 8c-3.2959415 0-6 2.7040584-6 6 0 0.39095756 0.03740262 0.78053904 0.11328125 1.1640625a1.5001771 1.5001771 0 1 0 2.9433594-0.58203125c-0.03793947-0.19176255-0.05664062-0.38655164-0.05664062-0.58203125 0-1.6746212 1.3253788-3 3-3s3 1.3253788 3 3-1.3253788 3-3 3c-0.19580219 0-0.39191762-0.0185767-0.58398438-0.0566406a1.50015 1.50015 0 1 0-0.58203124 2.9414062c0.38413186 0.07612744 0.77441291 0.11523436 1.1660156 0.11523436 3.2959416 0 6-2.7040584 6-6s-2.7040584-6-6-6z"
      :style="style"
      :fill="color"
    />
    <path
      d="m13 44c-3.2959415 0-6 2.7040584-6 6s2.7040585 6 6 6c3.2959416 0 6-2.7040584 6-6s-2.7040584-6-6-6zm0 3c1.6746212 0 3 1.3253788 3 3s-1.3253788 3-3 3-3-1.3253788-3-3 1.3253788-3 3-3z"
      :style="style"
      :fill="color"
    />
    <path
      d="m13 26c-3.2959415 0-6 2.7040584-6 6s2.7040585 6 6 6c3.2959416 0 6-2.7040584 6-6s-2.7040584-6-6-6zm0 3c1.6746212 0 3 1.3253788 3 3s-1.3253788 3-3 3-3-1.3253788-3-3 1.3253788-3 3-3z"
      :style="style"
      :fill="color"
    />
    <path
      d="m26.478516 12a1.50015 1.50015 0 1 0 0 3h29a1.50015 1.50015 0 1 0 0-3z"
      :style="style"
      :fill="color"
    />
    <path
      d="m52.478516 48a1.50015 1.50015 0 1 0 0 3h3a1.50015 1.50015 0 1 0 0-3z"
      :style="style"
      :fill="color"
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
  },
  computed: {
    style() {
      return {
        'color-rendering': 'auto',
        color: this.color,
        'dominant-baseline': 'auto',
        'font-feature-settings': 'normal',
        'font-variant-alternates': 'normal',
        'font-variant-caps': 'normal',
        'font-variant-ligatures': 'normal',
        'font-variant-numeric': 'normal',
        'font-variant-position': 'normal',
        'image-rendering': 'auto',
        isolation: 'auto',
        'mix-blend-mode': 'normal',
        'paint-order': 'fill markers stroke',
        'shape-padding': 0,
        'shape-rendering': 'auto',
        'solid-color': this.color,
        'text-decoration-color': this.color,
        'text-decoration-line': 'none',
        'text-decoration-style': 'solid',
        'text-indent': 0,
        'text-orientation': 'mixed',
        'text-transform': 'none',
        'white-space': 'normal'
      }
    }
  }
}
</script>

<style></style>
