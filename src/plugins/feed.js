const feed = 'https://feeds.podlovers.org/mp3'

const podcastClients = [
  {
    id: "apple-podcasts",
    service: "id1523714548"
  },
  {
    id: "antenna-pod"
  },
  {
    id: "beyond-pod"
  },
  {
    id: "castbox",
    service: "Podlovers-id3117097"
  },
  {
    id: "castro"
  },
  {
    id: "clementine"
  },
  {
    id: "downcast"
  },
  {
    id: "google-podcasts",
    service: feed
  },
  {
    id: "itunes"
  },
  {
    id: "i-catcher"
  },
  {
    id: "overcast"
  },
  {
    id: "player-fm"
  },
  {
    id: "pocket-casts",
    service: '194w03r3'
  },
  {
    id: "pod-grasp"
  },
  {
    id: "podcast-addict"
  },
  {
    id: "podcast-republic"
  },
  {
    id: "podcat"
  },
  {
    id: "podscout"
  },
  {
    id: "rss-radio"
  }
]

module.exports = async store => {
  store.addMetadata('feed', feed);
  const clients = store.addCollection("Client");

  podcastClients.map(client => clients.addNode(client));
}
