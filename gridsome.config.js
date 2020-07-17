// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Podlovers",
  siteUrl: 'https://podlovers.org',
  plugins: [
    {
      use: "gridsome-plugin-tailwindcss",
      options: {
        config: './tailwind.config.js'
      }
    },
    {
      use: '@gridsome/source-wordpress',
      options: {
        baseUrl: 'https://backend.podlovers.org', // required
        apiBase: 'wp-json',
        typeName: 'WordPress',
        perPage: 100,
        concurrent: 10
      }
    }
  ],
  templates: {
    Episode: '/episode/:id',
    WordPressPage: [{
      path: '/page/:slug',
      component: './src/templates/Page.vue'
    }]
  },
  chainWebpack: config => {
    config.resolve.alias.set('@images', '@/assets/images')
  },
};
