<template>
  <div>
    <page-header />
    <main class="main">
      <slot />
    </main>
    <ClientOnly>
      <play-bar />
      <subscribe />
      <search />
    </ClientOnly>
    <page-footer />
  </div>
</template>

<script>
import PageFooter from '~/features/page-footer/PageFooter'
import PageHeader from '~/features/page-header/PageHeader'
import Search from '~/features/search/Search'
import PlayBar from '~/features/playbar/PlayBar'
import Subscribe from '~/features/subscribe/Subscribe'

export default {
  components: { PageHeader, PageFooter, PlayBar, Subscribe, Search }
}
</script>

<style lang="postcss">
.main {
  min-height: calc(110vh - 100px);
}
</style>
