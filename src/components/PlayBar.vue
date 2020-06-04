<template>
  <div class="w-screen fixed bottom-0 play-bar" v-if="title">
    <div class="w-full absolute progress-bar px-4">
      <div class="flex justify-between font-light text-xs -mt-4 font-bold">
        <timer :time="ghost ? ghost : playtime" />
        <timer :time="duration - (ghost ? ghost : playtime)" :remaining="true" />
      </div>
      <progress-bar
        @input="store.dispatch"
        @simulate="store.dispatch"
        @ghost="store.dispatch"
        progressColor="rgba(42, 67, 101)"
        thumbColor="rgba(255, 255, 255)"
        highlightColor="rgba(44, 82, 130)"
        :duration="duration"
        :time="playtime"
        :ghost="ghost"
        :buffer="buffer"
        :chapters="chapters"
        :quantiles="quantiles"
      />
    </div>
    <div class="justify-center px-4 py-2 pt-8">
      <div class="flex w-full h-16 w-16">
        <div class="flex w-1/3">
          <g-image v-if="poster" :src="poster" class="w-16 h-16 mr-2 border rounded border-white shadow-md" />
          <div class="overflow-hidden">
            <h4 class="text-lg text-white uppercase truncate">{{ title }}</h4>
            <span class="block w-full text-gray-400 text-sm truncate">{{ currentChapter.title }}</span>
          </div>
        </div>
        <div class="w-1/3 flex items-center justify-center">
          <chapter-button
            v-if="chapters.length > 0"
            type="previous"
            color="rgba(255, 255, 255)"
            class="mx-2"
            @click="store.dispatch"
          />
          <stepper-button type="backwards" class="mx-2" @click="store.dispatch" />
          <play-button
            color="rgba(44, 82, 130)"
            background="rgba(255, 255, 255)"
            class="mx-2 rounded-full shadow-none hover:shadow-md"
            :type="buttonType"
            @click="store.dispatch"
          />
          <stepper-button type="forward" class="mx-2" @click="store.dispatch" />
          <chapter-button
            v-if="chapters.length > 0"
            type="next"
            color="rgba(255, 255, 255)"
            class="mx-2"
            @click="store.dispatch"
          />
        </div>
        <div class="flex justify-center items-end w-1/3 flex-col">
          <div class="flex items-center">
            <button @click="toggleMute" class="mx-2"><icon color="rgba(255, 255, 255)" :type="volumeIcon" /></button>
            <div class="w-40 mx-2">
              <input-slider
                :min="0"
                :max="1"
                :value="volume"
                @input="setVolume"
                :step="0.001"
                background="rgba(255, 255, 255)"
                borderColor="rgba(255, 255, 255)"
              />
            </div>
            <button class="mx-2" @click="nextRate" @dblclick="setRate(1)">
              <icon color="rgba(255, 255, 255)" :type="rateIcon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "~/store";
import { mapState, mapActions } from "redux-vuex";
import PlayButton from "@podlove/components/play-button";
import ProgressBar from "@podlove/components/progress-bar";
import StepperButton from "@podlove/components/stepper-button";
import ChapterButton from "@podlove/components/chapter-button";
import InputSlider from "@podlove/components/input-slider";
import Timer from "@podlove/components/timer";
import Icon from "@podlove/components/icons";

import { selectors } from "~/store/reducers";

export default {
  data: mapState({
    episode: selectors.current.episode,
    buttonType: selectors.playbar.button,
    duration: selectors.player.duration,
    playtime: selectors.player.playtime,
    ghost: selectors.player.ghost.time,
    buffer: selectors.player.buffer,
    chapters: selectors.player.chapters.list,
    currentChapter: selectors.player.chapters.current,
    quantiles: selectors.player.quantiles,
    title: selectors.player.title,
    poster: selectors.player.image,
    volumeIcon: selectors.playbar.volume,
    volumeSlider: selectors.playbar.volumeSlider,
    volume: selectors.player.audio.volume,
    rateIcon: selectors.playbar.rate
  }),
  components: { InputSlider, PlayButton, ProgressBar, Timer, StepperButton, ChapterButton, Icon },
  methods: mapActions("setVolume", "setRate", "nextRate", "toggleMute")
};
</script>

<style scoped>
.play-bar {
  background: rgba(44, 82, 130, 0.92);
}

.progress-bar {
  margin-top: -10px;
}
</style>
