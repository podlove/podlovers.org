<template>
  <Layout>
    <div
      id="header"
      class="landing-header w-full px-8 py-20 bg-podlove-blue-900 flex items-center justify-center relative shadow"
    >
      <div class="lg:w-app flex font-light items-center flex-col mt-6">
        <div class="flex flex-col items-center md:items-start md:flex-row">
          <div
            class="flex landing-poster items-center justify-center sm:items-start mb-4 md:mb-0 md:mr-8 w-1/5"
          >
            <g-image
              v-if="poster"
              :title="title"
              :src="require(`!!assets-loader?width=150&height=150!@images/${poster}`)"
              class="rounded block shadow-lg border border-podlove-blue-700"
            />
          </div>
          <div class="flex flex-col items-center md:block w-4/5">
            <h1
              v-if="subtitle"
              class="text-gray-100 text-2xl text-center md:text-left lg:text-3xl mb-1 font-light"
            >
              {{ subtitle }}
            </h1>
            <p class="text-gray-200 hidden md:block lg:text-xl w-10/12 md:text-lg font-thin">
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
        <span class="italic font-thin text-xl"> here be dragons </span>
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
    }
  }
}
</static-query>

<script>
import { path, pathOr, slice, head, prop, propOr } from 'ramda'

import PlayerTile from '~/components/PlayerTile'
import EpisodeHeader from '~/components/EpisodeHeader'

export default {
  components: { PlayerTile, EpisodeHeader },

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
          content: prop('siteUrl', metadata) + require(`!!assets-loader!@images/${this.poster}`).src
        }
      ]
    }
  }
}
</script>

<style>
.landing-header {
  background-image: url('/bg-pattern.png');
}

.landing-poster {
  width: 150px;
  height: 150px;
}
</style>
