import { ADD_QUERY_TO_LIST, REMOVE_QUERY, ADD_EMPTY_QUERY, EMPTY_QUERY, EDIT_COLUMN_QUERY } from '../actions/actions-types'

const initialState = {
  queries: []
}

export default function queryListReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_QUERY_TO_LIST:
      let maxKey = Math.max.apply(Math, state.queries.map(function (query) { return query.key }))
      maxKey = Math.max(0, maxKey)
      state.queries.push({
        key: (maxKey + 1),
        ...action.payload
      })
      return {
        ...state
      }
    case ADD_EMPTY_QUERY:
      let maxKey2 = Math.max.apply(Math, state.queries.map(function (query) { return query.key }))
      maxKey2 = Math.max(0, maxKey2)
      state.queries.push({
        key: (maxKey2 + 1),
        patientName: '',
        patientId: '',
        accessionNumber: '',
        dateFrom: '',
        dateTo: '',
        studyDescription: '',
        modalities: '',
        aet: ''

      })
      return {
        ...state
      }
    case REMOVE_QUERY:
      const removedLines = action.payload
      const newQueries = state.queries.filter((query) => {
        return !removedLines.includes(query.key)
      })
      return {
        ...state,
        queries: newQueries
      }
    case EMPTY_QUERY:
      return {
        ...state,
        queries: []
      }
    case EDIT_COLUMN_QUERY:
      // Edit all column value
      // Need to change key to force update
      const newState = state.queries.map((query) => {
        query[query.key] = query.key++
        query[action.payload.columnName] = action.payload.text
        return query
      })

      return {
        ...state,
        queries: newState
      }
    default:
      return state
  }
}
