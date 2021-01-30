module.exports = async (store) => {
  store.addMetadata('contributors', {
    groups: ['on-air'],
    roles: ['team', 'guest']
  })
}
