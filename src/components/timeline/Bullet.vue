<template>
  <div class="relative mr-6">
    <span v-if="top" class="absolute top-0 left-0 h-4 border-gray-500 border-l-2 w-1 -mt-4 ml-4"></span>
    <span class="w-8 h-8 border-gray-500 bg-blue-700 border-1 rounded flex items-center justify-center shadow">
      <slot />
    </span>
    <span v-if="bottom" class="absolute bottom-0 left-0 h-4 border-gray-500 border-l-2 w-1 -mb-4 ml-4"></span>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: Boolean,
      default: false
    },

    bottom: {
      type: Boolean,
      default: false
    }
  }
};
</script>
