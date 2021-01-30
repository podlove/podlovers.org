const feed = require('./src/plugins/feed')
const contributors = require('./src/plugins/contributors')

module.exports = function (api) {
  api.loadSource(async (actions) => {
    await feed(actions)
    await contributors(actions)
  })
}
