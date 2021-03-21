<template>
  <g-link :to="link">
    <span v-if="avatar" v-popover="{ name: popover, event: 'hover' }">
      <g-image
        class="rounded"
        :src="require(`!!assets-loader?width=48&height=48!@images/${avatar}`)"
      />
    </span>
  </g-link>
</template>

<script>
import { path, join } from 'ramda'
import ContributorPopover from './ContributorPopover'

export default {
  components: { ContributorPopover },

  props: {
    contributor: {
      type: Object,
      default: () => ({
        id: null,
        slug: null,
        name: null,
        avatar: null,
        role: null
      })
    },
    popover: {
      type: String
    }
  },
  computed: {
    id() {
      return path(['contributor', 'id'], this)
    },

    slug() {
      return path(['contributor', 'slug'], this)
    },

    avatar() {
      return path(['contributor', 'avatar'], this)
    },

    name() {
      return path(['contributor', 'name'], this)
    },

    link() {
      return join('/', ['contributor', this.slug])
    },

    role() {
      return path(['contributor', 'role'], this)
    }
  }
}
</script>
