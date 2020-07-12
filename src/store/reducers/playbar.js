import { READY } from '@podlove/player-actions/types'
import { handleActions, createAction } from "redux-actions";
import { prop, propOr } from "ramda";
import * as player from './player'

export const types = {
  PLAYBAR_PLAY: "PLAYBAR_PLAY",
  PLAYBAR_PAUSE: "PLAYBAR_PAUSE",
  PLAYBAR_LOADING: "PLAYBAR_LOADING",
  PLAYBAR_RESTART: "PLAYBAR_RESTART",
  TOGGLE_MUTE: "TOGGLE_MUTE",
  NEXT_RATE: "NEXT_RATE",
  FOLLOW_CONTENT: "FOLLOW_CONTENT"
};

export const reducer = handleActions({
  PLAYBAR_PLAY: state => ({
    ...state,
    button: 'pause'
  }),
  PLAYBAR_PAUSE: state => ({
    ...state,
    button: 'play'
  }),
  PLAYBAR_LOADING: state => ({
    ...state,
    button: 'loading'
  }),
  PLAYBAR_RESTART: state => ({
    ...state,
    button: 'restart'
  }),
  FOLLOW_CONTENT: state => ({
    ...state,
    followContent: !state.followContent
  }),
  [READY]: (state, { payload }) => ({
    ...state,
    path:  propOr('', 'path', payload)
  }),
  [player.types.EPISODE_SELECT]: (state) => ({
    ...state,
    active: true
  })
}, {
  active: false,
  button: 'play',
  followContent: false,
  path: ''
})

export const actions = {
  play: createAction(types.PLAYBAR_PLAY),
  pause: createAction(types.PLAYBAR_PAUSE),
  loading: createAction(types.PLAYBAR_LOADING),
  restart: createAction(types.PLAYBAR_RESTART),
  toggleMute: createAction(types.TOGGLE_MUTE),
  nextRate: createAction(types.NEXT_RATE),
  toggleFollowContent: createAction(types.FOLLOW_CONTENT)
};

export const selectors = {
  active: prop('active'),
  button: prop('button'),
  volumeSlider: prop('volumeSlider'),
  followContent: prop('followContent'),
  path: prop('path')
};
