<template>
  <div id="discourse-comments"></div>
</template>

<script>
// Add Discourse Stylesheet
export default {
  mounted() {
    window.DiscourseEmbed = {
      discourseUrl: 'https://community.podlove.org/',
      discourseEmbedUrl: window.location.href
    }

    const discourse = document.createElement('script')
    discourse.setAttribute('src', 'https://community.podlove.org/javascripts/embed.js')
    document.head.appendChild(discourse)
  }
}
</script>

<style></style>
