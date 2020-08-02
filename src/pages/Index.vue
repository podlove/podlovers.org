<template>
  <Layout>
    <episode-header
      class="mb-4"
      :id="latest.node.id"
      :poster="latest.node.poster"
      :duration="latest.node.duration"
      :publication-date="latest.node.publicationDate"
      :title="latest.node.title"
      :contributors="latest.node.contributors"
      :path="latest.node.path"
    />
    <div class="flex justify-center">
      <div class="w-app p-8" v-if="list.length > 0">
        <player-tile
          :class="{ 'pt-0': index === 0, 'border-b': index < list.length - 1 }"
          class="py-8 border-gray-400 border-dashed"
          v-for="(edge, index) in list"
          :key="edge.node.id"
          :episode="edge.node"
        />
      </div>
      <div class="w-app py-32 flex justify-center items-center" v-else>
        <span class="italic font-thin text-xl">
          here be dragons
        </span>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  episodes: allEpisode(sortBy: "publicationDate") {
    edges {
      node {
        title,
        id,
        summary,
        poster,
        path,
        publicationDate,
        duration,
        contributors {
          id,
          name
          avatar
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
    show {
      title,
      subtitle,
      summary,
      poster
    }
  }
}
</static-query>

<script>
import { path, pathOr, slice, head, prop, propOr } from "ramda";

import PlayerTile from "~/components/PlayerTile";
import EpisodeHeader from "~/components/EpisodeHeader";

export default {
  components: { PlayerTile, EpisodeHeader },

  computed: {
    episodes() {
      return pathOr([], ["$page", "episodes", "edges"], this);
    },

    latest() {
      return head(this.episodes);
    },

    list() {
      return slice(1, this.episodes.length, this.episodes);
    }
  },

  metaInfo() {
    const metadata = pathOr({}, ['$static', 'metadata'], this)
    const show = propOr({}, 'show', metadata)
    const poster = prop('poster', show)

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
          content: prop('siteUrl', metadata),
        },
        {
          property: 'og:description',
          content: prop('summary', show)
        },
        {
          property: 'og:image',
          content: prop('siteUrl', metadata) + require(`!!assets-loader!@images/${poster}`).src
        },
      ]
    }
  }
};
</script>
