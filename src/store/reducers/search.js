import { handleActions, createAction } from 'redux-actions'
import { prop } from 'ramda'

export const types = {
  SEARCH_SHOW: 'SEARCH_SHOW',
  SEARCH_HIDE: 'SEARCH_HIDE',
  SEARCH_QUERY: 'SEARCH_QUERY',
  SEARCH_RESULTS: 'SEARCH_RESULTS',
  SEARCH_SELECT_RESULT: 'SEARCH_SELECT_RESULT',
  SEARCH_INITIALIZED: 'SEARCH_INITIALIZED',
  SEARCH_LOADING: 'SEARCH_LOADING',
  SEARCH_SELECT_TRANSCRIPT: 'SEARCH_SELECT_TRANSCRIPT',
  SEARCH_SELECT_CONTRIBUTOR: 'SEARCH_SELECT_CONTRIBUTOR',
  SEARCH_SELECT_EPISODE: 'SEARCH_SELECT_EPISODE',
}

export const reducer = handleActions(
  {
    SEARCH_SHOW: (state) => ({
      ...state,
      visible: true,
      hasResults: false,
      query: '',
      episodes: [],
      contributors: [],
      transcripts: [],
      selectedResult: null
    }),
    SEARCH_HIDE: (state) => ({
      ...state,
      visible: false
    }),
    SEARCH_QUERY: (state, { payload }) => ({
      ...state,
      query: payload
    }),
    SEARCH_RESULTS: (state, { payload }) => ({
      ...state,
      hasResults: payload.length > 0,
      contributors: payload.filter(({ index }) => index === 'contributor').slice(0, 5),
      episodes: payload.filter(({ index }) => index === 'episode').slice(0, 5),
      transcripts: payload.filter(({ index }) => index === 'transcript').slice(0, 5)
    }),
    SEARCH_INITIALIZED: (state) => ({
      ...state,
      initialized: true,
      loading: false
    }),
    SEARCH_LOADING: (state) => ({
      ...state,
      loading: true
    }),
    SEARCH_SELECT_RESULT: (state, { payload }) => ({
      ...state,
      selectedResult: payload
    })
  },
  {
    visible: false,
    loading: false,
    hasResults: false,
    query: '',
    episodes: [],
    contributors: [],
    transcripts: [],
    selectedResult: null,
    initialized: false
  }
)

export const actions = {
  initializedSearch: createAction(types.SEARCH_INITIALIZED),
  showSearch: createAction(types.SEARCH_SHOW),
  hideSearch: createAction(types.SEARCH_HIDE),
  search: createAction(types.SEARCH_QUERY),
  results: createAction(types.SEARCH_RESULTS),
  selectSearchResult: createAction(types.SEARCH_SELECT_RESULT),
  load: createAction(types.SEARCH_LOADING),
  selectTranscript: createAction(types.SEARCH_SELECT_TRANSCRIPT),
  selectContributor: createAction(types.SEARCH_SELECT_CONTRIBUTOR),
  selectEpisode: createAction(types.SEARCH_SELECT_EPISODE),
}

export const selectors = {
  initialized: prop('initialized'),
  loading: prop('loading'),
  visible: prop('visible'),
  query: prop('query'),
  contributors: prop('contributors'),
  episodes: prop('episodes'),
  transcripts: prop('transcripts'),
  hasResults: prop('hasResults'),
  selectedResult: prop('selectedResult'),
  results: state => [...state.contributors, ...state.episodes, ...state.transcripts]
}
