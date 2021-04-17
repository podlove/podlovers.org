<template>
  <custom-transition type="fade">
    <div v-if="visible" class="fixed inset-0 w-screen h-screen bg-gray-900 bg-opacity-75 p-4 z-50">
      <div
        class="flex w-full h-full items-center justify-center"
        v-click-outside="toggleSubscribeOverlay"
      >
        <div class="relative bg-gray-100 max-w-4xl w-full rounded shadow-lg p-8 mt-8">
          <button class="absolute right-0 top-0 mr-2 -mt-16" @click="toggleSubscribeOverlay">
            <ClientOnly
              ><icon color="rgba(255, 255, 255, 0.8)" :size="40" type="close"
            /></ClientOnly>
          </button>
          <h2 class="absolute font-extralight text-3xl text-gray-100 top-0 left-0 ml-5 -mt-16">
            Subscribe
          </h2>
          <div class="overflow-y-auto">
            <h3 class="font-mono inline-block border-gray-400 border-b-2 mb-6">{{ $t('SUBSCRIBE_BUTTON.CLIENTS') }}</h3>
            <div
              class="subscribe-clients flex justify-between flex-col mb-4 sm:flex-wrap sm:flex-row"
            >
              <div class="w-full mb-4 sm:w-40" v-for="client in items" :key="client.id">
                <a
                  class="flex items-center flex-row sm:flex-col border-2 rounded p-4 sm:pt-5 whitespace-nowrap border-gray-400 mx-2 overflow-hidden hover:border-primary-800 hover:shadow hover:bg-primary-200 bg-primary-100"
                  :href="client.link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <res-image
                    :data="client.icon"
                    :width="40"
                    :height="40"
                    class="w-8 mb-0 sm:w-10 sm:mb-2"
                  />
                  <span class="font-light text-lg truncate px-2 text-primary-800">{{
                    client.title
                  }}</span></a
                >
              </div>
            </div>
            <h3 class="font-mono inline-block border-gray-400 border-b-2 mb-6">{{ $t('SUBSCRIBE_BUTTON.FEED') }}</h3>
            <div class="mx-2 mb-4">
              <div
                ref="feed"
                class="rounded p-2 w-full border-gray-400 border-2 text-primary-800 hover:border-primary-800 focus:border-primary-800 px-2 font-light cursor-pointer truncate hover:bg-primary-200 bg-primary-100 appearance-none"
                @click="selectText"
              >
                {{ feed }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </custom-transition>
</template>

<script>
import noScroll from 'no-scroll'
import { mapState, mapActions } from 'redux-vuex'
import getClients from '@podlove/clients'
import { type, platform } from '@podlove/clients/types'
import { getPlatform } from '@podlove/utils/useragent'
import { Icon } from '~/externals'

import CustomTransition from '~/components/CustomTransition'
import ResImage from '~/components/ResImage'
import { selectors } from '~/store/reducers'

export default {
  components: { Icon, CustomTransition, ResImage },

  data: mapState({
    visible: selectors.subscribeButton.visible
  }),

  directives: {
    'click-outside': {
      bind(el, { value: fn }) {
        el.addEventListener('click', (evt) => {
          if (evt.target !== el) {
            return
          }

          fn()
        })
      }
    }
  },

  computed: {
    feed() {
      return CONFIG.feed
    },

    clients() {
      return Object.values(CONFIG['subscribe-button']) || []
    },

    items() {
      return this.clients
        .map((client) =>
          getClients({ id: client.id, platform: [getPlatform(), platform.web] })
            .filter((item) => (item.type === type.service ? !!client.service : true))
            .map((item) => ({
              ...item,
              link:
                item.type === type.service ? item.scheme(client.service) : item.scheme(this.feed)
            }))
            .sort((item) => (item.type === type.service ? -1 : 0))
            .shift()
        )
        .filter(Boolean)
        .reverse()
    }
  },

  methods: {
    ...mapActions('toggleSubscribeOverlay'),
    selectText() {
      const selection = window.getSelection()
      const range = document.createRange()
      range.setStart(this.$refs.feed, 0)
      range.setEnd(this.$refs.feed, 1)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  },

  watch: {
    visible(val) {
      val ? noScroll.on() : noScroll.off()
    }
  }
}
</script>

<style scoped>
.subscribe-clients {
  max-height: calc(100vh - 450px);
  overflow-y: auto;
}
</style>
