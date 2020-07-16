<template>
  <div :class="{ 'overflow-hidden max-h-screen': noScroll }">
    <page-header />
    <main class="main">
      <slot/>
    </main>
    <play-bar />
    <subscribe />
    <page-footer />
  </div>
</template>


<script>
import { pathOr } from 'ramda'
import { mapState } from 'redux-vuex'

import { selectors } from "~/store/reducers";
import PageHeader from '~/components/Header'
import PageFooter from '~/components/Footer'
import Subscribe from '~/components/Subscribe'
import PlayBar from '~/components/PlayBar'

export default {
  components: { PageHeader, PageFooter, PlayBar, Subscribe },
  data: mapState({
    subscribeButtonVisible: selectors.subscribeButton.visible
  }),
  computed: {
    noScroll() {
      return this.subscribeButtonVisible
    }
  }
}
</script>

<style>
.main {
  min-height: calc(110vh - 100px);
}
</style>
