const config = require('./plugins/config')

module.exports = function (api) {
  api.loadSource(async (actions) => {
    await config(actions)
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
