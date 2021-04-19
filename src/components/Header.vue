<template>
  <header
    class="w-full px-8 pt-20 pb-32 bg-primary-900 flex items-center justify-center relative shadow"
    :style="style"
  >
    <slot></slot>
  </header>
</template>

<script>
import { background } from '~/config'

export default {
  computed: {
    style() {
      if (background) {
        return {
          'background-image': `url(${background})`
        }
      }
      return {}
    }
  }
}
</script>
