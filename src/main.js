import localePlugin from '../locales'

import { createStore } from './store'
import { actions } from './store/reducers'
import DefaultLayout from './layouts/Default'
import { Popover } from './externals'

// Roboto font
require('typeface-roboto')

export default async function (Vue, { isClient, router }) {
  await Popover().then((Popover) => Vue.use(Popover))

  Vue.prototype.$isClient = process.isClient
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.use(localePlugin, { locale: 'de-de' })

  const store = createStore(Vue, { isClient, router })

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
