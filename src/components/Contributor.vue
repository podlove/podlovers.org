<template>
  <g-link :to="link">
    <span v-if="avatar" class="relative">
      <res-image :src="avatar" :width="48" :height="48" class="rounded" />
      <popover>
        <div class="text-sm text-gray-800 p-1 text-center whitespace-no-wrap">
          <h3 class="font-bold">{{ name }}</h3>
          {{ role }}
        </div>
      </popover>
    </span>
  </g-link>
</template>

<script>
import { path, join } from 'ramda'
import ResImage from './ResImage'
import Popover from './Popover'

export default {
  components: { ResImage, Popover },
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
