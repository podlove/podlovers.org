const ConfigWebpackPlugin = require('config-webpack')

module.exports = function (api) {
  api.chainWebpack((config) => {
    ["css", "scss", "sass", "less", "stylus", "postcss"].forEach((lang) => {
      config.module
        .rule(lang)
        .oneOf("normal")
        .use("postcss-loader")
        .tap((options) => ({
            ...options,
            plugins: [require('tailwindcss'), require('autoprefixer')]
        }))
    });

    config.plugin('config-webpack').use(ConfigWebpackPlugin, [])
  });

  api.createPages(({ createPage }) => {
    createPage({
      path: '/',
      component: './src/screens/archive/Archive.vue'
    })

    createPage({
      path: '/contributors',
      component: './src/screens/contributors/Contributors.vue'
    })
  })
}
