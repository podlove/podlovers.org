import './tailwind.css'

import localePlugin from '../locales'

import { createStore } from './store'
import { actions } from './store/reducers'
import DefaultLayout from './layouts/Default'

// Roboto font
require('typeface-roboto')

export default function (Vue, { isClient, router, head }) {
  const store = createStore(Vue, { isClient, router })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.use(localePlugin, { locale: 'de-de' })

  router.beforeEach((to, _, next) => {
    store.dispatch(
      actions.routeTo({
        params: to.params,
        path: to.path,
        query: to.query
      })
    )
    next()
  })
}
