import { handleActions, createAction } from 'redux-actions'
import { propOr, identity } from 'ramda'

export const types = {
  EPISODES_ADD: 'EPISODES_ADD'
}

export const reducer = handleActions(
  {
    [types.EPISODES_ADD]: (state, { payload }) => ({ ...state, [payload.id]: payload })
  },
  {}
)

export const actions = {
  addEpisode: createAction(types.EPISODES_ADD)
}

export const selectors = {
  item: propOr({}),
  list: identity
}
