<template>
  <div>
    <header class="flex h-12 bg-blue-800 text-white font-light justify-center items-center px-16 border-b border-gray-600 top-0 w-full">
      <nav class="flex w-app items-center">
        <g-link class="mr-4 w-24 -mt-1" to="/" :title="$static.metadata.siteName"><logo :size="90" /></g-link>
        <a class="mt-2 mr-4 font-medium cursor-pointer" @click="toggleSubscribeOverlay">Subscribe</a>
        <g-link class="mt-2 font-medium" to="/about/">About</g-link>
      </nav>
    </header>
    <main>
      <slot/>
    </main>
    <play-bar />
    <subscribe />
  </div>
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

import PlayBar from '~/components/PlayBar'
import Subscribe from '~/components/Subscribe'
import Logo from '~/components/icon/Logo'

export default {
  components: { PlayBar, Logo, Subscribe },
  methods: mapActions('toggleSubscribeOverlay')
}
</script>
