<template>
  <Layout>
    <contributor-header
      :avatar="avatar"
      :name="name"
      :talkTime="talkTime"
      :words="words"
      :social="social"
      :donation="donation"
    ></contributor-header>

    <div class="lg:w-full lg:flex lg:justify-center pt-20">
      <div class="lg:w-app">
        <section id="summary" class="mb-10">
          <h2 class="font-mono inline-block border-gray-400 border-b-2 mb-8 mx-8 sm:mx-2">
            {{ $t('CONTRIBUTOR.SUMMARY') }}
          </h2>
          <div class="flex items-center justify-center md:justify-between flex-wrap">
            <doughnut-chart
              class="cursor-pointer mb-4"
              :value="episodesRelative"
              :size="200"
              :color="colors.complementary[600]"
              :background="colors.complementary[200]"
            >
              <div>
                <div class="text-gray-600 font-mono text-lg font-bold">{{ episodesCount }}</div>
                <div class="text-gray-500 font-light">{{ $t('CONTRIBUTOR.EPISODES_TOTAL') }}</div>
                <popover>
                  <div class="text-sm text-gray-500 text-center">
                    {{
                      $t('CONTRIBUTOR.EPISODES_TOTAL_TOOLTIP', {
                        relative: episodesRelative,
                        total: showEpisodesCount
                      })
                    }}
                  </div>
                </popover>
              </div>
            </doughnut-chart>

            <doughnut-chart
              class="cursor-pointer mb-4"
              :value="talkTimeRelative"
              :size="200"
              :color="colors.secondary[600]"
              :background="colors.secondary[200]"
            >
              <div>
                <div class="text-gray-600 font-mono text-lg font-bold">
                  {{ toHumanTime(talkTime) }}
                </div>
                <div class="text-gray-500 font-light">{{ $t('CONTRIBUTOR.TALK_TIME_TOTAL') }}</div>
                <popover>
                  <div class="text-sm text-gray-500 text-center">
                    {{
                      $t('CONTRIBUTOR.TALK_TIME_TOTAL_TOOLTIP', {
                        relative: talkTimeRelative,
                        total: toHumanTime(showTalkTime)
                      })
                    }}
                  </div>
                </popover>
              </div>
            </doughnut-chart>

            <doughnut-chart
              class="cursor-pointer mb-4"
              :value="wordsRelative"
              :size="200"
              :color="colors.primary[600]"
              :background="colors.primary[200]"
            >
              <div>
                <div class="text-gray-600 font-mono text-lg font-bold">
                  {{ words }}
                </div>
                <div class="text-gray-500 font-light">{{ $t('CONTRIBUTOR.WORDS_TOTAL') }}</div>
                <popover>
                  <div class="text-sm text-gray-500 text-center">
                    {{
                      $t('CONTRIBUTOR.WORDS_TOTAL_TOOLTIP', {
                        relative: wordsRelative,
                        total: showWords
                      })
                    }}
                  </div>
                </popover>
              </div>
            </doughnut-chart>
          </div>
        </section>

        <section id="episodes" class="mb-20">
          <h2 class="font-mono inline-block border-gray-400 border-b-2 mb-8 mx-8 sm:mx-2">
            {{ $t('CONTRIBUTOR.EPISODES') }}
          </h2>
          <div class="px-2">
            <div class="flex text-sm text-gray-500 mb-1">
              <div class="w-1/12 mr-4">{{ $t('CONTRIBUTOR.EPISODE') }}</div>
              <div class="w-10/12">{{ $t('CONTRIBUTOR.TIMELINE') }}</div>
            </div>
            <div class="w-full border-b border-gray-300 my-3 -mx-2"></div>
            <div v-for="(stats, index) in episodeStatistics" :key="stats.episode.id">
              <div class="flex leading-6">
                <div class="w-1/12 font-semibold mr-4">
                  <g-link :to="stats.episode.path">{{ stats.episode.mnemonic }}</g-link>
                  <popover direction="right">
                    <div class="text-sm text-gray-500 text-center p-2">
                      <h3 class="font-bold">{{ stats.episode.title }}</h3>
                    </div>
                  </popover>
                </div>
                <div class="w-10/12 mr-1">
                  <div
                    class="w-full h-6 border-gray-400 bg-gray-200 border rounded mr-2 relative overflow-hidden"
                  >
                    <div
                      v-for="(chapter, index) in episodeTimeline(stats.episode.timeline)"
                      :key="`timeline-${stats.episode.id}-${index}`"
                    >
                      <button
                        class="absolute border-gray-400 border-r h-10 opacity-75 hover:opacity-100"
                        :to="{ path: stats.episode.path, query: { t: toHumanTime(chapter.start) } }"
                        @click="playEpisode({ id: stats.episode.id, playtime: chapter.start })"
                        :style="chapterStyle(stats.episode, chapter)"
                      >
                        <popover direction="bottom">
                          <div class="text-sm text-gray-500 text-center">
                            <h3 class="font-bold">{{ chapter.title }}</h3>
                            <div class="flex justify-center space-x-2">
                              <div class="flex">
                                <duration :size="11" class="mr-1 mt-1" />
                                <span class="block">{{ toHumanTime(chapter.duration) }}</span>
                              </div>
                              <div class="flex">
                                <speak :size="16" class="mr-1 mt-1" />
                                <span class="block">{{ toHumanTime(chapter.speaking) }}</span>
                              </div>
                            </div>
                          </div>
                        </popover>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="w-1/12 text-right font-mono pr-4 text-sm hidden md:block">
                  {{ toHumanTime(stats.episode.duration) }}
                </div>
              </div>
              <div
                class="w-full border-b border-gray-300 my-3 -mx-2"
                v-if="index != episodeStatistics.length - 1"
              ></div>
            </div>
          </div>
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
    avatar,
    social {
      title,
      value,
      service {
        logo,
        urlScheme
      }
    },
    donation {
      title,
      value,
      service {
        title,
        description,
        logo,
        urlScheme
      }
    }
  },

  podcastContributorStatistics(id: $id) {
    id,
    talkTime,
    words,
    episodes {
      episode {
        id,
        path,
        mnemonic,
        title,
        duration,
        timeline {
          title,
          type,
          start,
          end,
          texts {
            start,
            end
          },
          speaker {
            id
          }
        }
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
import { prop, propOr, pathOr, last } from 'ramda'
import { toHumanTime } from '@podlove/utils/time'
import { mapActions } from 'redux-vuex'

import ContributorHeader from '~/components/ContributorHeader'
import DoughnutChart from '~/components/DoughnutChart'
import Duration from '~/components/icon/HourGlass'
import Speak from '~/components/icon/Speak'
import Popover from '~/components/Popover'

export default {
  components: {
    ContributorHeader,
    DoughnutChart,
    Duration,
    Speak,
    Popover
  },

  data() {
    return {
      colors: CONFIG.theme.colors
    }
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
    id() {
      return propOr('', 'id', this.contributor)
    },
    social() {
      return propOr([], 'social', this.contributor).map((social) => ({
        logo: social.service.logo,
        title: social.title,
        url: social.service.urlScheme.replace('%account-placeholder%', social.value)
      }))
    },
    donation() {
      return propOr([], 'donation', this.contributor).map((donation) => ({
        logo: donation.service.logo,
        title: donation.title,
        url: donation.service.urlScheme.replace('%account-placeholder%', donation.value)
      }))
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
    episodesRelative() {
      return parseInt((this.episodesCount / this.showEpisodesCount) * 100, 10)
    },
    episodeStatistics() {
      return pathOr([], ['episodes'], this.statistics)
    },
    episodesCount() {
      return this.episodeStatistics.length
    }
  },

  methods: {
    ...mapActions('playEpisode'),
    toHumanTime,
    episodeTimeline(data) {
      return (data || [])
        .filter(({ type, speaker }) => {
          const isChapter = type === 'chapter'
          const isSpeakerTranscript = type === 'transcript' && prop('id', speaker) === this.id

          return isChapter || isSpeakerTranscript
        })
        .reduce((result, item) => {
          if (item.type === 'chapter') {
            return [
              ...result,
              {
                title: item.title,
                start: item.start,
                end: item.end,
                duration: item.end - item.start,
                speaking: 0
              }
            ]
          }

          const current = last(result)

          if (!current) {
            return result
          }

          return [
            ...result.slice(0, result.length - 1),
            {
              ...current,
              speaking: current.speaking + item.end - item.start
            }
          ]
        }, [])
    },
    chapterStyle(episode, chapter) {
      const left = (chapter.start / episode.duration) * 100
      const width = (chapter.duration / episode.duration) * 100
      const speaking = Math.round(((chapter.speaking / chapter.duration) * 100 * 9) / 100) * 100

      return {
        left: `${left}%`,
        width: `${width}%`,
        background: this.colors.secondary[speaking]
      }
    }
  }
}
</script>

<style scoped></style>
