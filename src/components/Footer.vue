<template>
  <div class="w-full bg-gray-800 flex justify-center p-6 mt-16">
    <div class="w-app text-white font-thin text-sm flex justify-between">
      <ul class="overflow-hidden flex flex-wrap">
        <li v-for="page in pages" :key="page.node.id" class="whitespace-no-wrap w-1/3 truncate pr-2">
          <g-link class="hover:underline" :to="page.node.path">{{ page.node.title }}</g-link>
        </li>
      </ul>
      <div class="whitespace-no-wrap">
        Made with ❤️ &nbsp;and
        <g-link class="hover:underline" href="https://github.org/podlove" target="_blank" rel="nofollow noopener"
          >Podlove Technologies</g-link>
      </div>
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
