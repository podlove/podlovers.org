import { compose, either, propOr } from "ramda";
import { selectors as driver } from "@podlove/player-state/driver";
import { selectors as show } from "@podlove/player-state/show";
import { selectors as media } from "@podlove/player-state/media";
import { selectors as timepiece } from "@podlove/player-state/timepiece";
import { selectors as episode } from "@podlove/player-state/episode";
import { selectors as audio } from "@podlove/player-state/audio";
import { selectors as network } from "@podlove/player-state/network";
import { selectors as ghost } from "@podlove/player-state/ghost";
import { selectors as chapters } from "@podlove/player-state/chapters";
import { selectors as quantiles } from '@podlove/player-state/quantiles';
import { currentChapterByPlaytime } from '@podlove/utils/chapters'

import { selectors as episodes } from "./episodes";
import { selectors as player, selectors } from "./player";
import { selectors as playbar } from "./playbar";
import { selectors as subscribeButton } from "./subscribe-button";

const slices = {
  player: propOr({}, "player"),
  playbar: propOr({}, "playbar")
};

const playtime = compose(
  timepiece.playtime,
  propOr({}, "timepiece"),
  slices.player
);
const duration = compose(
  timepiece.duration,
  propOr({}, "timepiece"),
  slices.player
);

const showTitle = compose(
  show.title,
  propOr({}, "show"),
  slices.player
);

const showPoster = compose(
  show.poster,
  propOr({}, "show"),
  slices.player
);

const episodeTitle = compose(
  episode.title,
  propOr({}, "episode"),
  slices.player
);
const episodePoster = compose(
  episode.poster,
  propOr({}, "episode"),
  slices.player
);
const playing = compose(
  driver.playing,
  propOr({}, "driver"),
  slices.player
);
const currentEpisode = compose(
  player.episode,
  propOr({}, "current"),
  slices.player
);
const episodePath = compose(
  propOr('', "path"),
  slices.player
)

const volume = compose(
  audio.volume,
  propOr({}, "audio"),
  slices.player
)
const muted = compose(
  audio.muted,
  propOr({}, "audio"),
  slices.player
)
const rate = compose(
  audio.rate,
  propOr({}, "audio"),
  slices.player
)

const playerChaptersList =  compose(
  chapters.list,
  propOr({}, 'chapters'),
  slices.player
)

const playerGhostTime = compose(
  ghost.time,
  propOr({}, "ghost"),
  slices.player
)

export default {
  current: {
    episode: currentEpisode
  },
  episode: {
    data: id =>
      compose(
        episodes.item(id),
        propOr({}, "episodes")
      ),
    title: episodeTitle,
    poster: episodePoster,
    loaded: id => state => currentEpisode(state) === id,
    playing: id => state => currentEpisode(state) === id && playing(state)
  },
  show: {
    poster: showPoster,
    title: showTitle
  },
  player: {
    playtime,
    duration,
    playing,
    title: either(episodeTitle, showTitle),
    image: either(episodePoster, showPoster),
    quantiles: compose(quantiles.quantiles, propOr({}, 'quantiles'), slices.player),
    buffer: compose(
      network.buffer,
      propOr({}, "network"),
      slices.player
    ),
    ghost: {
      time: playerGhostTime,
      active: compose(
        ghost.active,
        propOr({}, "ghost"),
        slices.player
      ),
      chapter: (state) => {
        const chapters = playerChaptersList(state)
        const playtime = playerGhostTime(state)

        return currentChapterByPlaytime(chapters, playtime);
      }
    },
    media: compose(
      media.media,
      propOr({}, "media"),
      slices.player
    ),
    audio: {
      muted,
      volume,
      rate
    },
    chapters: {
      list: playerChaptersList,
      next: compose(
        chapters.next,
        propOr({}, 'chapters'),
        slices.player
      ),
      previous: compose(
        chapters.previous,
        propOr({}, 'chapters'),
        slices.player
      ),
      current: compose(
        chapters.current,
        propOr({}, 'chapters'),
        slices.player
      ),
      title: compose(
        chapters.title,
        propOr({}, 'chapters'),
        slices.player
      ),
      image: compose(
        chapters.image,
        propOr({}, 'chapters'),
        slices.player
      )
    }
  },
  playbar: {
    active: compose(
      playbar.active,
      slices.playbar
    ),
    path: compose(
      playbar.path,
      slices.playbar
    ),
    button: compose(
      playbar.button,
      slices.playbar
    ),
    volumeSlider: compose(
      playbar.volumeSlider,
      slices.playbar
    ),
    followContent: compose(
      playbar.followContent,
      slices.playbar
    ),
    volume: state => {
      if (muted(state)) {
        return 'speaker-0'
      }

      if (volume(state) >= 0.75) {
        return 'speaker-75'
      }

      if (volume(state) >= 0.5) {
        return 'speaker-50'
      }

      if (volume(state) > 0) {
        return 'speaker-25'
      }

      return 'speaker-0'
    },
    rate: state => {
      if (rate(state) <= 0.5) {
        return 'speed-050'
      }

      if (rate(state) <= 0.75) {
        return 'speed-075'
      }

      if (rate(state) <= 1) {
        return 'speed-100'
      }

      if (rate(state) <= 1.25) {
        return 'speed-125'
      }

      if (rate(state) <= 1.5) {
        return 'speed-150'
      }

      if (rate(state) <= 1.75) {
        return 'speed-175'
      }

      return 'speed-200'
    },
    chapters: compose(playbar.chapters, slices.playbar)
  },
  subscribeButton: {
    visible: compose(subscribeButton.visible, propOr(false, 'subscribeButton'))
  }
};
