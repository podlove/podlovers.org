<template>
  <div
    class="contributor-header w-full px-8 pt-20 pb-32 bg-primary-900 flex items-center justify-center relative shadow"
  >
    <div class="w-app flex font-light items-center flex-col mt-6">
      <div class="flex flex-col items-center md:items-start md:flex-row">
        <div class="contributor-poster relative mb-4 md:mb-0 md:mr-8">
          <res-image :src="avatar" :width="180" :height="180" class="rounded shadow-lg border border-primary-700" />
        </div>
        <div class="flex flex-col items-center md:block mb-5">
          <h1 v-if="name" class="text-gray-100 text-3xl" v-html="name" />
          <div class="mb-4" v-if="social.length > 0">
            <h3 class="text-gray-100 mb-1">{{ $t('CONTRIBUTOR.SOCIAL') }}</h3>
            <div class="flex">
              <a
                v-for="service in social"
                :href="service.url"
                :key="service.url"
                :title="service.title"
                target="_blank"
                rel="noopener noreferrer"
                class="mr-2"
              >
                <res-image :src="service.logo" :width="60" :height="60" class="rounded shadow-lg w-8 h-8" />
              </a>
            </div>
          </div>
          <div class="mb-4" v-if="donation.length > 0">
            <h3 class="text-gray-100 mb-1">{{ $t('CONTRIBUTOR.DONATION') }}</h3>
            <div class="flex">
              <a
                v-for="service in donation"
                :href="service.url"
                :key="service.url"
                :title="service.title"
                target="_blank"
                rel="noopener noreferrer"
                class="mr-2"
              >
                <res-image :src="service.logo" :width="60" :height="60" class="rounded shadow-lg w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toHumanTime } from '@podlove/utils/time'
import ResImage from './ResImage'

export default {
  components: { ResImage },
  props: {
    avatar: {
      type: String
    },
    name: {
      type: String
    },
    social: {
      type: Array,
      default: () => []
    },
    donation: {
      type: Array,
      default: () => []
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
