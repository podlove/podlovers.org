import { createStore } from "./store";
import { actions } from "./store/reducers";
import DefaultLayout from "~/layouts/Default.vue";
import localePlugin from "../locales";

// Roboto font
require("typeface-roboto");

export default function(Vue, { isClient, router }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.use(localePlugin, { locale: "de-de" });

  const store = createStore(Vue, { isClient });

  router.beforeEach((to, _, next) => {
    store.dispatch(
      actions.routeTo({
        params: to.params,
        path: to.path,
        query: to.query
      })
    );
    next();
  });
}
