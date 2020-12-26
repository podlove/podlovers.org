<template>
  <header
    ref="header"
    class="flex h-12 bg-podlove-blue-900 text-gray-100 font-light justify-center items-center px-16 border-b border-gray-600 top-0 w-full"
  >
    <nav class="flex w-app items-center">
      <g-link to="/" :exact="true"
        ><logo :size="90" class="mr-4 w-24 -mt-1" to="/" :title="$static.metadata.siteName"
      /></g-link>
      <g-link class="mt-2 mr-4 font-light" to="/" :exact="true">{{ $t('HEADER.EPISODES') }}</g-link>
      <g-link class="mt-2 mr-4 font-light" to="/contributors" :exact="true">{{
        $t('HEADER.CONTRIBUTORS')
      }}</g-link>
      <a class="mt-2 mr-4 font-light cursor-pointer" @click="toggleSubscribeOverlay">{{
        $t('HEADER.SUBSCRIBE')
      }}</a>
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
import Logo from './icon/PodloversLogo'

export default {
  components: {
    Logo
  },
  methods: mapActions('toggleSubscribeOverlay')
}
</script>

<style scoped>
.active {
  font-weight: 500;
}
</style>
