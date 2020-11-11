<template>
  <Layout>
    <contributor-header
      :avatar="avatar"
      :name="name"
      :talkTime="talkTime"
      :words="words"
    ></contributor-header>

    <div class="lg:w-full lg:flex lg:justify-center pt-20">
      <div class="lg:w-app">
        <section id="summary" class="mb-4">
          <h2 class="font-mono inline-block border-gray-400 border-b-2 mb-8 mx-8 sm:mx-2">
            {{ $t('CONTRIBUTOR.SUMMARY') }}
          </h2>
          <div class="flex items-center justify-between flex-col lg:flex-row">
            <doughnut-chart
              class="cursor-pointer mb-4"
              :value="episodesRelative"
              :size="200"
              :label="episodesCount"
              :description="$t('CONTRIBUTOR.EPISODES_TOTAL')"
              :color="colors.orange[600]"
              :background="colors.orange[200]"
              v-popover:episodesOverlay
            ></doughnut-chart>

            <doughnut-chart
              class="cursor-pointer mb-4"
              :value="talkTimeRelative"
              :size="200"
              :label="toHumanTime(talkTime)"
              :description="$t('CONTRIBUTOR.TALK_TIME_TOTAL')"
              :color="colors.green[600]"
              :background="colors.green[200]"
              v-popover:talkTimeOverlay
            ></doughnut-chart>

            <doughnut-chart
              class="cursor-pointer mb-4"
              :value="wordsRelative"
              :size="200"
              :label="words"
              :description="$t('CONTRIBUTOR.WORDS_TOTAL')"
              :color="colors.blue[600]"
              :background="colors.blue[200]"
              v-popover:wordsOverlay
            ></doughnut-chart>
          </div>
          <popover name="wordsOverlay" event="hover">
            <div class="text-sm text-gray-500 text-center">
              {{
                $t('CONTRIBUTOR.WORDS_TOTAL_TOOLTIP', { relative: wordsRelative, total: showWords })
              }}
            </div>
          </popover>
          <popover name="talkTimeOverlay" event="hover">
            <div class="text-sm text-gray-500 text-center">
              {{
                $t('CONTRIBUTOR.TALK_TIME_TOTAL_TOOLTIP', {
                  relative: talkTimeRelative,
                  total: toHumanTime(showTalkTime)
                })
              }}
            </div>
          </popover>
          <popover name="episodesOverlay" event="hover">
            <div class="text-sm text-gray-500 text-center">
              {{
                $t('CONTRIBUTOR.EPISODES_TOTAL_TOOLTIP', {
                  relative: episodesRelative,
                  total: showEpisodesCount
                })
              }}
            </div>
          </popover>
        </section>

        <section id="episodes">
          <h2 class="font-mono inline-block border-gray-400 border-b-2 mb-8 mx-8 sm:mx-2">
            {{ $t('CONTRIBUTOR.EPISODES') }}
          </h2>
        </section>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  podcastContributor(id: $id) {
    id,
    name,
    avatar
  },

  podcastContributorStatistics(id: $id) {
    id,
    talkTime,
    words,
    episodes {
      episode {
        title,
        duration
      },
      talkTime,
        words,
        role {
          title
        }
    }
  }
}
</page-query>

<static-query>
query {
  metadata {
    PodcastStatistics {
      talkTime,
      words,
      episodes
    }
  }
}
</static-query>

<script>
import { prop, propOr, pathOr } from 'ramda'
import { toHumanTime } from '@podlove/utils/time'

import ContributorHeader from '~/components/ContributorHeader'
import DoughnutChart from '~/components/DoughnutChart'
import colors from '../colors'

export default {
  components: {
    ContributorHeader,
    DoughnutChart
  },

  data() {
    return { colors }
  },

  computed: {
    contributor() {
      return pathOr({}, ['$page', 'podcastContributor'], this)
    },
    statistics() {
      return pathOr({}, ['$page', 'podcastContributorStatistics'], this)
    },
    showStatistics() {
      return pathOr({}, ['$static', 'metadata', 'PodcastStatistics'], this)
    },
    name() {
      return propOr('', 'name', this.contributor)
    },
    avatar() {
      return prop('avatar', this.contributor)
    },
    talkTime() {
      return propOr(0, 'talkTime', this.statistics)
    },
    words() {
      return propOr(0, 'words', this.statistics)
    },
    showTalkTime() {
      return propOr(0, 'talkTime', this.showStatistics)
    },
    showWords() {
      return propOr(0, 'words', this.showStatistics)
    },
    wordsRelative() {
      return parseInt((this.words / this.showWords) * 100, 10)
    },
    talkTimeRelative() {
      return parseInt((this.talkTime / this.showTalkTime) * 100, 10)
    },
    showEpisodesCount() {
      return propOr(0, 'episodes', this.showStatistics)
    },
    episodesCount() {
      return propOr([], 'episodes', this.statistics).length
    },
    episodesRelative() {
      return parseInt((this.episodesCount / this.showEpisodesCount) * 100, 10)
    }
  },

  methods: {
    toHumanTime
  }
}
</script>

<style scoped></style>
