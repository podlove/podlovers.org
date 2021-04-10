<template>
  <div>
    <page-header />
    <main class="main">
      <slot />
    </main>
    <ClientOnly>
      <play-bar />
      <subscribe />
    </ClientOnly>
    <page-footer />
  </div>
</template>

<script>
import PageHeader from '~/components/Header'
import PageFooter from '~/components/Footer'
import Subscribe from '~/components/Subscribe'
import PlayBar from '~/components/PlayBar'

export default {
  components: { PageHeader, PageFooter, PlayBar, Subscribe }
}
</script>

<style lang="postcss">
.main {
  min-height: calc(110vh - 100px);
}
</style>
