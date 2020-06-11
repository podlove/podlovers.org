<template>
  <div>
    <header class="flex h-12 bg-blue-800 text-white font-light justify-center items-center px-16 border-b border-gray-600">
      <nav class="flex w-app items-center">
        <g-link class="mr-4 w-24" to="/" :title="$static.metadata.siteName"><logo :size="90" /></g-link>
        <g-link class="mt-2 font-medium" to="/about/">About</g-link>
      </nav>
    </header>
    <main>
      <slot/>
    </main>
    <play-bar />
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
import PlayBar from '~/components/PlayBar'
import Logo from '~/components/icon/logo'

export default {
  components: { PlayBar, Logo }
}
</script>
