<template>
  <div id="discourse-comments"></div>
</template>

<script>
import normalize from 'normalize-url'
// Add Discourse Stylesheet
export default {
  mounted() {
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
  }
}
</script>

<style></style>
