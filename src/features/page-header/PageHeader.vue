<template>
  <header
    ref="header"
    class="flex h-12 bg-primary-900 text-gray-100 font-light justify-center items-center px-16 border-b border-gray-600 top-0 w-full"
  >
    <nav class="flex w-app items-center">
      <g-link to="/" :exact="true" v-if="logo" :title="siteName"
        ><img width="90" :src="logo" class="text-gray-100 mr-4 w-24 -mt-1" /></g-link>
      <g-link class="mt-2 mr-4 font-light" to="/" :exact="true">{{ $t('HEADER.EPISODES') }}</g-link>
      <g-link class="mt-2 mr-4 font-light" to="/contributors" :exact="true">{{
        $t('HEADER.CONTRIBUTORS')
      }}</g-link>
      <a class="mt-2 mr-4 font-light cursor-pointer" @click="toggleSubscribeOverlay">{{
        $t('HEADER.SUBSCRIBE')
      }}</a>
      <ClientOnly>
        <a class="mr-4 ml-auto font-light cursor-pointer" @click="showSearch"
          ><icon type="search"
        /></a>
      </ClientOnly>
    </nav>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import { mapActions } from 'redux-vuex'
import { path } from 'ramda';

import { Icon } from '~/externals'

export default {
  components: {
    Icon
  },

  computed: {
    siteName() {
      return path(['$static', 'metadata', 'siteName'], this)
    },
    logo() {
      return path(['header', 'logo'], CONFIG)
    }
  },

  methods: {
    ...mapActions('toggleSubscribeOverlay', 'showSearch')
  }
}
</script>

<style scoped>
.active {
  font-weight: 500;
}
</style>
