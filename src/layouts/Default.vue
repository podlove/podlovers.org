<template>
  <div>
    <header class="flex h-12 bg-blue-800 text-white font-light justify-center items-center px-16 border-b border-gray-600">
      <nav class="flex w-app">
        <g-link class="mr-4 font-bold" to="/">{{ $static.metadata.siteName }}</g-link>
        <g-link to="/about/">About</g-link>
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

export default {
  components: { PlayBar }
}
</script>
