<template>
  <div id="discourse-comments" v-if="discourseUrl"></div>
</template>

<static-query>
query {
  metadata {
    comments {
      discourse
    }
  }
}
</static-query>

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
      return path(['$static', 'metadata', 'comments', 'discourse'], this)

    }
  }
}
</script>

<style></style>
