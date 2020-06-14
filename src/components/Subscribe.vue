<template>
  <div>
    <div v-for="client in items" :key="client.id">
      <a :href="client.link" target="_blank" rel="noopener noreferrer"><g-image :src="client.icon" />
      {{ client.title }}</a>
    </div>
  </div>
</template>

<static-query>
{
  metadata {
    feed
  },

  clients:allClient {
    edges {
      node {
        id,
        service
      }
    }
  }
}
</static-query>

<script>
import { pathOr, path, prop } from 'ramda';
import getClients from "@podlove/clients";
import { type, platform } from "@podlove/clients/types";
import { getPlatform } from "@podlove/utils/useragent";

export default {
  computed: {
    feed() {
      return path(['$static', 'metadata', 'feed'], this)
    },

    clients() {
      return pathOr([], ['$static', 'clients', 'edges'], this)
    },

    items() {
      return this.clients
        .map(prop('node'))
        .map(client =>           getClients({ id: client.id, platform: [getPlatform(), platform.web] })
            .filter(item => (item.type === type.service ? !!client.service : true))
            .map(item => ({
              ...item,
              link: item.type === type.service ? item.scheme(client.service) : item.scheme(this.feed)
            }))
            .sort(item => (item.type === type.service ? -1 : 0))
            .shift()
        )
        .filter(Boolean)
        .reverse();
    }
  },

  mounted() {
    console.log(this.items)
  }
};
</script>
