const config = require('config')
const { get } = require('lodash')

// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: config.get('siteName'),
  siteUrl: config.get('siteUrl'),
  icon: config.get('icon'),
  plugins: [
    {
      use: '@gridsome/source-wordpress',
      options: {
        baseUrl: config.get('api'), // required
        apiBase: 'wp-json',
        typeName: 'WordPress',
        perPage: 100,
        concurrent: 10
      }
    },
    {
      use: '@podlove/source-publisher',
      options: {
        baseUrl: config.get('api'), // required
        apiBase: 'wp-json',
        typeName: 'Podcast',
        imageCache: 'static/images'
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        chunk: true,
        compress: true,
        autoFetch: false,
        profile: 'match',
        searchFields: ['title', 'summary', 'name', 'nickname', 'mnemonic', 'text'],
        collections: [
          {
            indexName: 'episode',
            path: 'allPodcastEpisode.edges',
            query: `
            {
              allPodcastEpisode {
                edges {
                  node {
                    id,
                    path,
                    mnemonic,
                    title,
                    summary,
                    contributors {
                      details {
                        name,
                        nickname
                      }
                    }
                  }
                }
              }
            }
            `,
            transform: (episode) => ({
              ...get(episode, 'node', {}),
              name: get(episode, ['node', 'contributors'], [])
                .map((contributor) => get(contributor, ['details', 'name']))
                .filter(Boolean),
              nickname: get(episode, ['node', 'contributors'], [])
                .map((contributor) => get(contributor, ['details', 'nickname']))
                .filter(Boolean)
            })
          },
          {
            indexName: 'transcript',
            path: 'allPodcastTranscript.edges',
            query: `
            {
              allPodcastTranscript {
                edges {
                  node {
                    id,
                    text,
                    start,
                    episode {
                      path,
                      mnemonic,
                      title
                    },
                    speaker {
                      name,
                      nickname,
                      avatar
                    }
                  }
                }
              }
            }
            `,
            transform: (data) => get(data, 'node', {})
          },
          {
            typeName: 'PodcastContributor',
            indexName: 'contributor',
            fields: ['id', 'name', 'nickname', 'avatar']
          }
        ]
      }
    }
  ],
  templates: {
    PodcastEpisode: [{
      path: '/episode/:id',
      component: './src/screens/episode/Episode.vue'
    }],
    WordPressPage: [
      {
        path: '/page/:slug',
        component: './src/screens/wordpress-page/WordpressPage.vue'
      }
    ],
    PodcastContributor: [{
      path: '/contributor/:slug',
      component: './src/screens/contributor/Contributor.vue'
    }]
  }
}
