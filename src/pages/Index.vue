<template>
  <Layout>
    <div
      id="header"
      class="w-full px-8 py-20 bg-primary-900 flex items-center justify-center relative shadow"
      :style="style"
    >
      <div class="lg:w-app flex font-light items-center flex-col mt-6">
        <div class="flex flex-col items-center md:items-start md:flex-row">
          <div
            class="flex landing-poster items-center justify-center sm:items-start mb-4 md:mb-0 md:mr-8 w-1/5 -mt-2"
          >
            <res-image
              :src="poster"
              :title="title"
              :width="150"
              :height="150"
              class="rounded block shadow-lg border border-primary-700"
            />
          </div>
          <div class="flex flex-col items-center md:block w-4/5">
            <h1
              v-if="subtitle"
              class="text-gray-100 text-2xl text-center md:text-left lg:text-3xl mb-1 font-light"
            >
              {{ subtitle }}
            </h1>
            <p class="text-gray-200 hidden md:block lg:text-xl w-10/12 md:text-lg font-extralight">
              {{ summary }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="lg:w-app p-8 overflow-hidden" v-if="episodes.length > 0">
        <player-tile
          :class="{ 'pt-0': index === 0, 'border-b': index < episodes.length - 1 }"
          class="py-8 border-gray-400 border-dashed"
          v-for="(edge, index) in episodes"
          :key="edge.node.id"
          :episode="edge.node"
        />
      </div>
      <div class="lg:w-app py-32 flex justify-center items-center" v-else>
        <span class="italic font-extralight text-xl"> here be dragons </span>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  episodes: allPodcastEpisode(sortBy: "publicationDate") {
    edges {
      node {
        title,
        id,
        mnemonic,
        summary,
        poster,
        path,
        publicationDate,
        duration,
        contributors {
          details {
            id,
            slug,
            name,
            avatar
          },
          role {
            title
          },
          group {
            slug
          }
        }
      }
    }
  }
}
</page-query>

<static-query>
query {
  metadata {
    siteUrl,
    siteName,
    PodcastShow {
      title,
      subtitle,
      summary,
      poster
    },
    header {
      background
    }
  }
}
</static-query>

<script>
import { path, pathOr, head, prop, propOr } from 'ramda'

import PlayerTile from '~/components/PlayerTile'
import EpisodeHeader from '~/components/EpisodeHeader'
import ResImage from '~/components/ResImage'

export default {
  components: { PlayerTile, EpisodeHeader, ResImage },

  computed: {
    episodes() {
      return pathOr([], ['$page', 'episodes', 'edges'], this)
    },

    latest() {
      return head(this.episodes)
    },

    poster() {
      return path(['$static', 'metadata', 'PodcastShow', 'poster'], this)
    },

    title() {
      return path(['$static', 'metadata', 'PodcastShow', 'title'], this)
    },

    summary() {
      return path(['$static', 'metadata', 'PodcastShow', 'summary'], this)
    },

    subtitle() {
      return path(['$static', 'metadata', 'PodcastShow', 'subtitle'], this)
    },

    background() {
      return path(['$static', 'metadata', 'header', 'background'], this)
    },

    style() {
      if (this.background) {
        return {
          'background-image': `url(${this.background})`
        }
      }
      return {}
    }
  },

  metaInfo() {
    const metadata = pathOr({}, ['$static', 'metadata'], this)
    const show = propOr({}, 'PodcastShow', metadata)

    return {
      title: `${prop('title', show)} - ${prop('subtitle', show)}`,
      meta: [
        {
          name: 'description',
          content: prop('summary', show)
        },
        // Open Graph
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:site_name',
          content: prop('siteName', metadata)
        },
        {
          property: 'og:title',
          content: prop('title', show)
        },
        {
          property: 'og:url',
          content: prop('siteUrl', metadata)
        },
        {
          property: 'og:description',
          content: prop('summary', show)
        },
        {
          property: 'og:image',
          content: prop('siteUrl', metadata) + '/assets/images/' + this.poster
        }
      ]
    }
  }
}
</script>

<style>
.landing-poster {
  width: 150px;
  height: 150px;
}
</style>
