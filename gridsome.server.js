const episodes = require('./src/plugins/episode')
const feed = require('./src/plugins/feed')

module.exports = function (api) {
  api.loadSource(async actions => {
    await episodes(actions)
    await feed(actions)
  })
}
