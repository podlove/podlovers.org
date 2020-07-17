<template>
  <Layout>
    <episode-header
      :id="id"
      :title="$page.episode.title"
      :poster="$page.episode.poster"
      :publication-date="$page.episode.publicationDate"
      :duration="$page.episode.duration"
      :contributors="$page.episode.contributors"
      ><episode-navigation
    /></episode-header>
    <div class="w-full flex justify-center pt-20">
      <div class="w-app">
        <section id="summary">
          <h3 class="font-mono inline-block border-gray-400 border-b-2 mb-6 mx-8 sm:mx-2">Summary</h3>
          <div class="font-light border-gray-400 border-b mb-12 pt-6 pb-12 px-12">{{ $page.episode.summary }}</div>
        </section>

        <section id="timeline">
          <h3 class="font-mono inline-block border-gray-400 border-b-2 mb-6 mx-8 sm:mx-2">Timeline</h3>
          <timeline
            class="font-light border-gray-400 border-b mb-12 pb-12 px-12"
            :id="$page.episode.id"
            :timeline="$page.episode.timeline"
          />
        </section>

        <section id="shownotes">
          <h3 class="font-mono inline-block border-gray-400 border-b-2 mb-6  mx-8 sm:mx-">Shownotes</h3>
          <div class="font-light episode-content border-gray-400 border-b mb-12 pb-12 px-12" v-html="$page.episode.content"></div>
        </section>

        <section id="discuss">
          <discuss class="mb-12 px-2" />
        </section>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  episode(id: $id) {
    id,
    path,
    title,
    summary,
    publicationDate,
    poster,
    duration,
    content,
    show {
      poster,
      title,
      subtitle,
      link
    },
    audio {
      url,
      size,
      title,
      mimeType
    },
    chapters {
      start,
      end,
      title,
      href,
      image
    },
    contributors {
      id,
      name
      avatar
    },
    timeline {
      node,
      title,
      type,
      start,
      end,
      texts {
        start,
        end,
        text
      },
      speaker {
        avatar,
        name
      }
    }
  }
}
</page-query>

<script>
import { throttle } from "throttle-debounce";
import scrollIntoView from "scroll-into-view-if-needed";
import { mapActions, mapState } from "redux-vuex";
import { compose, path } from "ramda";
import { toPlayerTime, toHumanTime } from "@podlove/utils/time";

import { selectors } from "~/store/reducers";
import Contributor from "~/components/Contributor";
import Timeline from "~/components/Timeline";
import Subscribe from "~/components/Subscribe";
import EpisodeNavigation from "~/components/EpisodeNavigation";
import EpisodeHeader from "~/components/EpisodeHeader";
import Discuss from "~/components/Discuss";
import Icon from "~/components/Externals";

export default {
  data: mapState({
    episode: selectors.current.episode,
    playtime: selectors.player.playtime,
    ghost: selectors.player.ghost.time,
    followContent: selectors.playbar.followContent
  }),

  components: { Subscribe, Timeline, EpisodeHeader, EpisodeNavigation, Discuss },

  computed: {
    id() {
      return path(["episode", "id"], this.$page);
    },
    follow() {
      return this.followContent && this.episode === this.id;
    }
  },

  watch: {
    playtime() {
      this.scroll();
    },
    ghost() {
      this.scroll();
    },
    followContent() {
      this.followContent && this.scroll();
    }
  },

  methods: {
    ...mapActions("playEpisode"),
    scroll() {
      if (!this.follow) {
        return;
      }

      this.scrollIntoView();
    },
    scrollIntoView: throttle(500, () => {
      const node = document.getElementById("transcript-ghost-active") || document.getElementById("transcript-active");

      return (
        node && scrollIntoView(node, { behavior: "smooth", scrollMode: "always", block: "center", inline: "center" })
      );
    }),
    duration: compose(
      toHumanTime,
      toPlayerTime
    )
  },

  metaInfo() {
    const authors = this.$page.episode.contributors

    return {
      title: this.$page.episode.title,
      meta: [
        {
          name: 'description',
          content: this.$page.episode.summary
        },
        ...authors.map(author => ({
          name: 'author',
          content: author.name
        }))
      ]
    }
  }
};
</script>

<style>
.episode-content ul {
  list-style-type: disc !important;
  margin-bottom: 2em;
}

.episode-content li {
  margin-bottom: 0.5em;
}

.episode-content h1{
  font-weight: bold;
  font-size: 1.5em;
  margin-left: 1em;
  margin-bottom: 1em;
}

.episode-content h2 {
  font-weight: bold;
  font-size: 1.2em;
}

.episode-content h3 {
  font-weight: bold;
  font-size: 1em;
  margin-left: -1.5em;
  margin-bottom: 0.75em;
}


.episode-content a {
  border-bottom: 1px solid rgba(203, 213, 224);
  padding-bottom: 1px;
}
</style>
