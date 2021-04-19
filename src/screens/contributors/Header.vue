<template>
  <header-container>
    <div class="lg:w-app mt-6">
      <h1 class="text-3xl text-gray-100">{{ $t('CONTRIBUTOR_LIST.TITLE') }}</h1>
    </div>
  </header-container>
</template>

<script>
import HeaderContainer from '~/components/Header'

export default {
  components: {
    HeaderContainer
  }
}
</script>
