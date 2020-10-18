import { handleActions, createAction } from 'redux-actions'
import { prop } from 'ramda'

export const types = {
  EPISODE_PLAY: 'EPISODE_PLAY',
  EPISODE_PAUSE: 'EPISODE_PAUSE',
  EPISODE_SELECT: 'EPISODE_SELECT',
  EPISODE_RESTORE: 'EPISODE_RESTORE'
}

export const reducer = handleActions(
  {
    EPISODE_SELECT: (state, { payload }) => ({
      ...state,
      episode: payload
    })
  },
  {
    episode: null
  }
)

export const actions = {
  playEpisode: createAction(types.EPISODE_PLAY),
  pauseEpisode: createAction(types.EPISODE_PAUSE),
  selectEpisode: createAction(types.EPISODE_SELECT),
  restoreEpisode: createAction(types.EPISODE_RESTORE)
}

export const selectors = {
  episode: prop('episode')
}
