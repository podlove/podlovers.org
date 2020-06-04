import { handleActions, createAction } from "redux-actions";
import { prop } from "ramda";

export const types = {
  PLAYBAR_PLAY: "PLAYBAR_PLAY",
  PLAYBAR_PAUSE: "PLAYBAR_PAUSE",
  PLAYBAR_LOADING: "PLAYBAR_LOADING",
  PLAYBAR_RESTART: "PLAYBAR_RESTART",
  TOGGLE_MUTE: "TOGGLE_MUTE",
  NEXT_RATE: "NEXT_RATE"
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
  TOGGLE_MUTE: state => ({
    ...state
  })
}, {
  button: 'play'
})

export const actions = {
  play: createAction(types.PLAYBAR_PLAY),
  pause: createAction(types.PLAYBAR_PAUSE),
  loading: createAction(types.PLAYBAR_LOADING),
  restart: createAction(types.PLAYBAR_RESTART),
  toggleMute: createAction(types.TOGGLE_MUTE),
  nextRate: createAction(types.NEXT_RATE)
};

export const selectors = {
  button: prop('button'),
  volumeSlider: prop('volumeSlider')
};
