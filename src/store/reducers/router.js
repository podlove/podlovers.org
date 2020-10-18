import { handleActions, createAction } from 'redux-actions'
import { prop, path } from 'ramda'

export const types = {
  ROUTE: 'ROUTE'
}

export const reducer = handleActions(
  {
    ROUTE: (_, { payload }) => ({
      id: path(['params', 'id'], payload),
      episode: prop('path', payload)
    })
  },
  {
    id: null,
    path: null
  }
)

export const actions = {
  routeTo: createAction(types.ROUTE)
}

export const selectors = {
  id: prop('id'),
  path: prop('path')
}
