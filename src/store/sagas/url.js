import { path } from 'ramda'
import { toHumanTime, toPlayerTime } from '@podlove/utils/time'
import { select, throttle, put, takeEvery } from "redux-saga/effects"
import { BACKEND_PLAYTIME } from '@podlove/player-actions/types'
import { takeOnce } from '@podlove/player-sagas/helper'
import { requestPlaytime } from "@podlove/player-actions/timepiece";

import { actions as router } from '../reducers/router'
import * as player from "../reducers/player";

export default ({ selectEpisode, selectCurrentId, selectPlaybarActive }) => {
  function* setPlaytime({ payload }) {
    const searchParams = new URLSearchParams(window.location.search);
    const playbar = yield select(selectPlaybarActive)
    const episode = yield select(selectEpisode)
    const current = yield select(selectCurrentId)

    if (!playbar || episode !== current) {
      return
    }

    searchParams.set("t", toHumanTime(payload));
    window.history.replaceState({}, '', `${location.pathname}?${searchParams}`)
  }

  function* restoreEpisode({ payload }) {
    const id = path(['params', 'id'], payload)
    const playtime = path(['query', 't'], payload)

    if (!id || !playtime) {
      return
    }

    yield put(player.actions.restoreEpisode({ id, playtime: toPlayerTime(playtime) }));
  }

  function* restorePlaytime({ payload }) {
    const id = path(['params', 'id'], payload)
    const playtime = path(['query', 't'], payload)

    if (!id || !playtime) {
      return
    }

    yield put(requestPlaytime(toPlayerTime(playtime)))
  }

  return function*() {
    yield throttle(1000, BACKEND_PLAYTIME, setPlaytime)
    yield takeOnce(router.routeTo, restoreEpisode)
    yield takeEvery(router.routeTo, restorePlaytime)
  }
}
