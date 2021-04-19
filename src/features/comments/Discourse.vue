<template>
  <div id="discourse-comments" v-if="discourseUrl"></div>
</template>

<script>
import { path } from 'ramda'
import normalize from 'normalize-url'
// Add Discourse Stylesheet
export default {
  mounted() {
    if (!this.discourseUrl) {
      return
    }

    window.DiscourseEmbed = {
      discourseUrl: 'https://community.podlove.org/',
      discourseEmbedUrl: normalize(window.location.href, {
        stripHash: true,
        removeQueryParameters: [/(.*?)/],
        removeTrailingSlash: true
      })
    }

    const discourse = document.createElement('script')
    discourse.setAttribute('src', 'https://community.podlove.org/javascripts/embed.js')
    document.head.appendChild(discourse)
  },

  computed: {
    discourseUrl() {
      return path(['comments', 'discourse'], CONFIG)
    }
  }
}
</script>

<style></style>
