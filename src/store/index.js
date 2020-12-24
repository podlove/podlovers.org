import sagasEngine from '@podlove/player-sagas'
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux'
import { connect } from 'redux-vuex'
import { quantilesSaga } from '@podlove/player-sagas/quantiles'
import { chaptersSaga } from '@podlove/player-sagas/chapters'
import { stepperSaga } from '@podlove/player-sagas/stepper'

import episodeSaga from './sagas/episode'
import playbarSaga from './sagas/playbar'
import routerSaga from './sagas/router'

import { reducers, actions, selectors } from './reducers'

export function createStore(Vue, { isClient, router }) {
  let composeEnhancers = compose

  if (isClient) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }

  const store = createReduxStore(
    reducers,
    composeEnhancers(applyMiddleware(sagasEngine.middleware))
  )

  connect({ Vue, store, actions })

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
    stepperSaga({
      selectDuration: selectors.player.duration,
      selectPlaytime: selectors.player.playtime
    }),
    quantilesSaga,
    playbarSaga({
      selectRate: selectors.player.audio.rate,
      selectMuted: selectors.player.audio.muted
    })
  ]

  if (isClient) {
    const { playerSaga } = require('@podlove/player-sagas/player')

    sagas.push(
      playerSaga({
        selectMedia: selectors.player.media,
        selectPlaytime: selectors.player.playtime,
        selectPoster: selectors.player.image,
        selectTitle: selectors.player.title
      })
    )

    sagas.push(
      routerSaga({
        selectEpisode: selectors.current.episode,
        selectCurrentId: selectors.router.id,
        selectPlaybarActive: selectors.playbar.active,
        selectFollowContent: selectors.playbar.followContent,
        router
      })
    )
  }

  sagasEngine.run.apply(this, sagas)

  return store
}
