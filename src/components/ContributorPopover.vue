<template>
  <popover :name="id" event="hover">
    <div class="text-sm text-gray-800 p-1 text-center">
      <h3 class="font-bold">{{ name }}</h3>
      {{ role }}
    </div>
  </popover>
</template>

<script>
import { path, pathOr, join } from 'ramda'

export default {
  props: {
    id: {
      type: String
    },
    name: {
      type: String,
      default: null
    },
    role: {
      type: String
    }
  }
}
</script>
