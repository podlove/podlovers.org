<template>
  <Layout>
    <div
      class="w-full px-8 py-20 bg-primary-900 flex items-center justify-center relative shadow mb-5"
      :style="style"
    >
      <div class="lg:w-app mt-6">
        <h1 class="text-3xl text-gray-100">{{ $t('CONTRIBUTOR_LIST.TITLE') }}</h1>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="lg:w-app py-8 overflow-hidden">
        <div class="mb-8" v-for="(role, index) in contributors" :key="`role-${index}`">
          <h3 class="text-2xl text-center lg:text-left">{{ role.title }}</h3>
          <div class="flex items-center justify-center lg:justify-between flex-wrap font-light">
            <g-link
              :to="`/contributor/${contributor.slug}`"
              class="w-9/12 md:w-5/12 lg:w-3/12 max-w-xs flex flex-col justify-center items-center m-3 lg:m-6 px-4 py-6 text-gray-900"
              v-for="(contributor, index) in role.contributors"
              :key="`contributor-${index}`"
            >
              <res-image :src="contributor.avatar" :width="200" :height="200" class="rounded-full w-24 h-24 mb-4" />
              <h3 class="text-lg font-normal">{{ contributor.name }}</h3>

              <p class="text-sm italic mb-2">
                {{ $t('CONTRIBUTOR_LIST.EPISODES_COUNT', { count: contributor.episodes }) }}
              </p>
            </g-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  allPodcastContributorStatistics {
    edges {
      node {
        contributor {
          slug,
          avatar,
          name,
          social {
            service {
              logo,
              urlScheme
            },
            value,
            title
          },
          donation {
            service {
              logo,
              urlScheme
            },
            value,
            title
          }
        },
        episodes {
        	role {
            slug,
            title
          }
        }
      }
    }
  }
}
</page-query>

<script>
import {
  compose,
  path,
  pathOr,
  map,
  propOr,
  prop,
  uniq,
  reduce,
  sortBy,
  forEach,
  values,
  filter
} from 'ramda'

import ResImage from '~/components/ResImage'

export default {
  computed: {
    roles() {
      return Object.values(CONFIG.contributors.roles) || []
    },

    contributors() {
      return compose(
        reduce(
          (result, role) => [
            ...result,
            {
              ...role,
              contributors: sortBy(prop('name'), role.contributors)
            }
          ],
          []
        ),
        values,
        (data) => this.roles.map((role) => prop(role, data)),
        reduce((result, contributor) => {
          forEach((role) => {
            const insert = result[role.slug]
              ? result[role.slug]
              : {
                  title: role.title,
                  slug: role.slug,
                  contributors: []
                }

            result[role.slug] = {
              ...insert,
              contributors: [...insert.contributors, contributor]
            }
          }, contributor.roles)
          return result
        }, {}),
        filter(({ name }) => Boolean(name)),
        map((node) => ({
          ...propOr({}, 'contributor', node),
          episodes: propOr([], 'episodes', node).length,
          roles: compose(
            uniq,
            reduce((result, item) => [...result, path(['role'], item)], []),
            propOr([], 'episodes')
          )(node)
        })),
        map(propOr({}, 'node')),
        pathOr([], ['$page', 'allPodcastContributorStatistics', 'edges'])
      )(this)
    },
    background() {
      return CONFIG.header.background
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
  components: {
    ResImage
  }
}
</script>

<style>
</style>
