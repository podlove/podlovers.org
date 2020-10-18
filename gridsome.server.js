const feed = require('./src/plugins/feed')

module.exports = function (api) {
  api.loadSource(async actions => {
    await feed(actions)
  })
}
