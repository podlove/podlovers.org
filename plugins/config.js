const config = require('config')

module.exports = async (store) => {
  // feed
  store.addMetadata('feed', config.get('feed'))
  const clients = store.addCollection('Client')

  // subscribe-button
  config.get('subscribe-button').map((client) => clients.addNode(client))

  // contributors
  store.addMetadata('contributors', config.get('contributors'))

  // comments
  store.addMetadata('comments', {
    discourse: config.get('comments.discourse')
  })

  // header
  store.addMetadata('header', {
    logo: config.get('header.logo'),
    background: config.get('header.background')
  })
}
