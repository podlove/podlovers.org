<template>
  <div class="w-full bottom-0 h-16 flex mt-0" :class="{ 'fixed top-0 z-40 docked': docked, absolute: !docked }">
    <div
      class="h-20 relative w-full flex items-center justify-center"
      :class="{ 'bg-white -mb-4': !docked, 'bg-transparent': docked }"
    >
      <span class="w-full absolute top-0 shadow left" v-if="!docked"></span>
    </div>

    <div
      class="text-white h-16 flex justify-center items-center py-4 px-8 w-full"
      :class="{ 'bg-gray-900 shadow rounded-b docked-bg': docked }"
    >
      <!-- Discuss -->
      <button class="mx-4 font-thin flex items-center overflow-visible" @click="scrollTo('header')">
        <summary-icon class="mr-3" />
        <span class="uppercase hidden md:block">Summary</span>
      </button>
      <!-- Subscribe -->
      <button class="mx-4 font-thin flex items-center overflow-visible" @click="scrollTo('timeline')">
        <timeline-icon class="mr-3" />
        <span class="uppercase hidden md:block">Timeline</span>
      </button>
      <!-- Share -->
      <button class="mx-4 font-thin flex items-center overflow-visible" @click="scrollTo('shownotes')">
        <shownotes-icon class="mr-3" />
        <span class="uppercase hidden md:block">Shownotes</span>
      </button>
      <!-- Discuss -->
      <button class="mx-4 font-thin flex items-center overflow-visible" @click="scrollTo('discuss')">
        <discuss-icon class="mr-3" />
        <span class="uppercase hidden md:block">Discuss</span>
      </button>
    </div>

    <div class="h-20 relative w-full -mb-4" :class="{ 'bg-white -mb-4': !docked }">
      <span class="w-full absolute top-0 shadow right" v-if="!docked"></span>
    </div>
  </div>
</template>

<script>
import { throttle } from "throttle-debounce";
import scrollIntoView from "scroll-into-view-if-needed";

import { selectors } from "~/store/reducers";
import { Icon } from "~/components/Externals";
import DiscussIcon from "~/components/icon/Discuss";
import TimelineIcon from "~/components/icon/Timeline";
import SummaryIcon from "~/components/icon/Summary";
import ShownotesIcon from "~/components/icon/Shownotes";

export default {
  data() {
    return {
      docked: false
    };
  },
  components: { Icon, DiscussIcon, TimelineIcon, SummaryIcon, ShownotesIcon },
  mounted() {
    this.handleScroll();
    window.addEventListener("scroll", throttle(100, this.handleScroll.bind(this)));
  },
  methods: {
    handleScroll() {
      const height = this.$el.clientHeight;
      const top = this.$el.offsetTop;
      const scroll = window.scrollY;

      this.docked = scroll > height + top + 100;
    },

    scrollTo(id) {
      const node = document.getElementById(id)
      node && scrollIntoView(node, { behavior: "smooth", scrollMode: "always" })
    }
  }
};
</script>

<style scoped>
.shadow.left {
  height: 1px;
  bottom: 3em;
  margin-top: -1px;
}

.shadow.right {
  height: 1px;
  bottom: 3em;
  margin-top: -1px;
}

.docked {
  transition: z-index 300ms;
}

.docked-bg {
  background-image: url("/bg-pattern.png");
}
</style>
