<template>
  <Layout>
    <div class="flex py-8 px-16 justify-center">
      <div class="w-app">
        <player-tile
          :class="{ 'pt-0': index === 0, 'border-b': index < $page.episodes.edges.length - 1 }"
          class="py-8 border-gray-400 border-dashed"
          v-for="(edge, index) in $page.episodes.edges"
          :key="edge.node.id"
          :episode="edge.node"
        />
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
import PlayerTile from "~/components/PlayerTile";

export default {
  components: { PlayerTile }
};
</script>
