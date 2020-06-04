import { fetch } from "gridsome";
import { delay } from 'redux-saga/effects'
import { isEmpty, path } from "ramda";
import { put, takeEvery, select } from "redux-saga/effects";
import { READY, BACKEND_LOADING_START } from "@podlove/player-actions/types";
import { requestPlay, requestPause } from "@podlove/player-actions/play";
import { takeOnce } from "@podlove/player-sagas/helper";
import { setRate, setVolume, mute, unmute } from "@podlove/player-actions/audio";

import * as player from "../reducers/player";
import * as episodes from "../reducers/episodes";

export default ({ selectEpisode, selectRate, selectVolume, selectMuted, selectCurrentEpisode, selectPlaying }) => {
  function* resetMeta() {
    const rate = yield select(selectRate);
    const volume = yield select(selectVolume);
    const muted = yield select(selectMuted);

    yield put(setRate(rate));
    yield put(setVolume(volume));

    yield put(muted ? mute() : unmute());
  }

  function* loadEpisode(id) {
    let episode = yield select(selectEpisode(id));

    if (isEmpty(episode)) {
      const result = yield fetch(`/episode/${id}`);
      episode = path(["data", "episode"], result);
      yield put(episodes.actions.addEpisode(episode));
    }

    return episode
  }

  function* injectEpisode(episode) {
    const playing = yield select(selectPlaying);

    if (playing) {
      yield put(requestPause());
    }

    yield put({ type: READY, payload: episode });
    yield delay(100)
    yield put(requestPlay());
    yield takeOnce(BACKEND_LOADING_START, resetMeta);
  }

  function* playEpisode({ payload }) {
    const currentEpisode = yield select(selectCurrentEpisode);
    const playing = yield select(selectPlaying);

    if (currentEpisode === payload && playing) {
      return;
    }

    yield put(player.actions.selectEpisode(payload));

    const episode = yield loadEpisode(payload)

    if (currentEpisode !== payload) {
      yield injectEpisode(episode)
    } else {
      yield put(requestPlay());
    }
  }

  function* pauseEpisode() {
    yield put(requestPause());
  }

  return function*() {
    yield takeEvery(player.types.EPISODE_PLAY, playEpisode);
    yield takeEvery(player.types.EPISODE_PAUSE, pauseEpisode);
  };
};
