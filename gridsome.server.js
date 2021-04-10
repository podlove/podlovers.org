const path = require('path')
const feed = require('./src/plugins/feed')
const contributors = require('./src/plugins/contributors')


module.exports = function (api) {
  api.loadSource(async (actions) => {
    await feed(actions)
    await contributors(actions)
  })

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
  });
}
