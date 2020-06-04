// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import { createStore } from './store'
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { isClient, router }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  createStore(Vue, { isClient })
  router.beforeEach((to, from, next) => {
    next()
  })
}
