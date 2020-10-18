import { get } from 'lodash'
import format from 'string-template'

const locales = {
  'de-de': require('./de-de')
}

export default {
  async install(Vue, options) {
    const translations = get(locales, options.locale)

    Vue.mixin(registerLocaleMixin(translations))
  }
}

const resolver = (translations) => (path, args) => {
  const result = get(translations, path)

  if (typeof result === 'function') {
    return result.apply(translations, [].concat(args))
  }

  return format(result, args)
}

export const registerLocaleMixin = (translations) => ({
  beforeCreate() {
    if (!this.$t) {
      this.$t = resolver(translations)
    }
  }
})
