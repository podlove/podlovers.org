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
      <div class="w-app p-8" v-if="list.length > 1">
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

<script>
import { pathOr, slice, head } from "ramda";

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
      return slice(1, this.episodes.length - 1, this.episodes);
    }
  }
};
</script>
