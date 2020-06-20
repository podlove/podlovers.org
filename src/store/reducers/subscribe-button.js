import { handleActions, createAction } from "redux-actions";
import { prop } from "ramda";

export const types = {
  TOGGLE_SUBSCRIBE_OVERLAY: "TOGGLE_SUBSCRIBE_OVERLAY"
};

export const reducer = handleActions({
  TOGGLE_SUBSCRIBE_OVERLAY: (state) => ({
    ...state,
    visible: !state.visible
  })
}, {
  visible: false
})

export const actions = {
  toggleSubscribeOverlay: createAction(types.TOGGLE_SUBSCRIBE_OVERLAY)
};

export const selectors = {
  visible: prop('visible')
};
