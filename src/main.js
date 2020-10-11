import { createStore } from './store'
import DefaultLayout from '~/layouts/Default.vue'
import localePlugin from '../locales'

// Roboto font
require('typeface-roboto')


export default function (Vue, { isClient, router }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.use(localePlugin, { locale: 'de-de' })

  createStore(Vue, { isClient })


  router.beforeEach((to, from, next) => {
    next()
  })
}
