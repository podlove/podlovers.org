<template>
  <div
    class="contributor-header w-full px-8 pt-20 pb-32 bg-podlove-blue-900 flex items-center justify-center relative shadow"
  >
    <div class="w-app flex font-light items-center flex-col mt-6">
      <div class="flex flex-col items-center md:items-start md:flex-row">
        <div class="contributor-poster relative mb-4 md:mb-0 md:mr-8">
          <g-image
            v-if="avatar"
            :src="require(`!!assets-loader?width=180&height=180!@images/${avatar}`)"
            class="rounded shadow-lg border border-podlove-blue-700"
          />
        </div>
        <div class="flex flex-col items-center md:block">
          <h1 v-if="name" class="text-gray-100 text-3xl mb-5" v-html="name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toHumanTime } from '@podlove/utils/time'

export default {
  props: {
    avatar: {
      type: String
    },
    name: {
      type: String
    }
  },
  methods: {
    toHumanTime
  }
}
</script>

<style>
.contributor-header {
  background-image: url('/bg-pattern.png');
}

.contributor-poster {
  width: 180px;
  height: 180px;
}
</style>
