import sagasEngine from "@podlove/player-sagas";
import { createStore as createReduxStore, applyMiddleware, compose } from "redux";
import { connect } from "redux-vuex";
import { quantilesSaga } from "@podlove/player-sagas/quantiles";
import { chaptersSaga } from "@podlove/player-sagas/chapters";

import episodeSaga from "./sagas/episode";
import playbarSaga from "./sagas/playbar";

import { reducers, actions, selectors } from "./reducers";

export function createStore(Vue, { isClient }) {
  let composeEnhancers = compose;

  if (isClient) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createReduxStore(reducers, composeEnhancers(applyMiddleware(sagasEngine.middleware)));

  connect({ Vue, store, actions });

  const sagas = [
    episodeSaga({
      selectEpisode: selectors.episode.data,
      selectMuted: selectors.player.audio.muted,
      selectRate: selectors.player.audio.rate,
      selectVolume: selectors.player.audio.volume,
      selectCurrentEpisode: selectors.current.episode,
      selectPlaying: selectors.player.playing
    }),
    chaptersSaga({
      selectDuration: selectors.player.duration,
      selectPlaytime: selectors.player.playtime,
      selectCurrentChapter: selectors.player.chapters.current,
      selectChapterList: selectors.player.chapters.list
    }),
    playbarSaga({
      selectRate: selectors.player.audio.rate,
      selectMuted: selectors.player.audio.muted
    }),
    quantilesSaga
  ];

  if (isClient) {
    const { playerSaga } = require("@podlove/player-sagas/player");

    sagas.push(
      playerSaga({
        selectMedia: selectors.player.media,
        selectPlaytime: selectors.player.playtime,
        selectPoster: selectors.player.image,
        selectTitle: selectors.player.title
      })
    );
  }

  sagasEngine.run.apply(this, sagas);

  return store;
}
