<template>
  <div class="w-full bg-gray-800 p-6 mt-16 text-white font-thin text-sm">
    <div class="flex justify-center">
      <ul class="w-full lg:w-app overflow-hidden flex flex-wrap mb-6 px-8">
        <li v-for="page in pages" :key="page.node.id" class="whitespace-no-wrap w-1/2 sm:w-full md:w-1/3 truncate pr-2">
          <g-link class="hover:underline" :to="page.node.path">{{ page.node.title }}</g-link>
        </li>
      </ul>
    </div>
    <div class="text-center border-t border-gray-600 pt-4 border-dashed">
        Made with
        <g-link class="hover:underline" href="https://github.org/podlove" target="_blank" rel="nofollow noopener">Podlove</g-link>,
        <g-link class="hover:underline" href="https://ultraschall.fm" target="_blank" rel="nofollow noopener">Ultraschall</g-link>,
        <g-link class="hover:underline" href="https://studio-link.de" target="_blank" rel="nofollow noopener">Studio-Link</g-link> and
        <g-link class="hover:underline" href="https://auphonic.com" target="_blank" rel="nofollow noopener">Auphonic</g-link>
      </div>
  </div>
</template>

<static-query>
query {
  pages: allWordPressPage {
    edges {
      node {
        path,
        id,
				title
      }
    }
  }
}
</static-query>

<script>
import { pathOr } from 'ramda'

export default {
  computed: {
    pages() {
      return pathOr([], ["$static", "pages", "edges"], this);
    }
  }
};
</script>
