<template>
  <Layout>
    <div class="page w-full flex justify-center pt-10">
      <div class="w-app">
        <h1 class="font-bold text-3xl mb-6">{{ title }}</h1>
        <div class="page-content" v-html="content"></div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  wordPressPage(id: $id) {
    id,
    slug,
    content,
    title
  }
}
</page-query>

<script>
import { pathOr } from "ramda";

export default {
  computed: {
    title() {
      return pathOr("", ["$page", "wordPressPage", "title"], this);
    },

    content() {
      return pathOr("", ["$page", "wordPressPage", "content"], this);
    }
  }
};
</script>

<style>
.page-content ul {
  list-style-type: disc !important;
}

.page-content li {
  margin-bottom: 0.5em;
}

.page-content p {
  margin-bottom: 1em;
}

.page-content a {
  border-bottom: 1px solid rgba(203, 213, 224);
  padding-bottom: 1px;
}

.page-content h1 {
  font-size: 2.5em;
}

.page-content h2 {
  font-size: 2em;
}

.page-content h3 {
  font-size: 1em;
}
</style>
