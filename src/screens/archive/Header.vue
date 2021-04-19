<template>
  <header-container>
    <div class="lg:w-app flex font-light items-center flex-col mt-6">
      <div class="flex flex-col items-center md:items-start md:flex-row">
        <div
          v-if="poster"
          class="flex landing-poster items-center justify-center sm:items-start mb-4 md:mb-0 md:mr-8 w-1/5 -mt-2"
        >
          <res-image
            :src="poster"
            :title="title"
            :width="150"
            :height="150"
            class="rounded block shadow-lg border border-primary-700"
          />
        </div>
        <div class="flex flex-col items-center md:block w-4/5">
          <h1
            v-if="subtitle"
            class="text-gray-100 text-2xl text-center md:text-left lg:text-3xl mb-1 font-light"
          >
            {{ subtitle }}
          </h1>
          <p v-if="summary" class="text-gray-200 hidden md:block lg:text-xl w-10/12 md:text-lg font-extralight">
            {{ summary }}
          </p>
        </div>
      </div>
    </div>
  </header-container>
</template>

<script>
import HeaderContainer from '~/components/Header'
import ResImage from '~/components/ResImage'

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    poster: {
      type: String,
      default: null
    },
    summary: {
      type: String,
      default: null
    }
  },
  components: { HeaderContainer, ResImage }
}
</script>
