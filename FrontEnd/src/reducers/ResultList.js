import { SET_RETRIEVE_STATUS_SERIES, REMOVE_RESULT, ADD_RESULT_TO_LIST, SET_RETRIVE_STATUS_STUDY, EMPTY_RESULTS, ADD_SERIES_DETAILS } from '../actions/actions-types'

const initialState = {
  results: []
}

export default function retrieveListReducer (state = initialState, action) {
  switch (action.type) {
    case REMOVE_RESULT :
      const removedLines = action.payload
      const newResults = state.results.filter(function (results) {
        return !removedLines.includes(results.key)
      })
      return {
        ...state,
        results: newResults
      }
    case ADD_RESULT_TO_LIST:
      let maxKey = Math.max.apply(Math, state.results.map(function (query) { return query.key }))
      maxKey = Math.max(0, maxKey)
      state.results.push({
        key: (maxKey + 1),
        isRetrieved: false,
        ...action.payload,
        seriesDetails: []
      })
      return {
        ...state
      }
    case SET_RETRIVE_STATUS_STUDY:
      for (const i in state.results) {
        if (state.results[i].key === action.payload.key) {
          state.results[i].isRetrieved = action.payload.isRetrieved
          break
        }
      }
      return {
        ...state
      }
    case SET_RETRIEVE_STATUS_SERIES:
      const newResultArray = state.results.map((studyData) => {
        if (studyData.studyInstanceUID === action.payload.row.studyInstanceUID) {
          studyData.seriesDetails.forEach((serieDetails) => {
            if (serieDetails.serieInstanceUID === action.payload.row.serieInstanceUID) {
              serieDetails.isRetrieved = true
            }
          })
        }
        return studyData
      })
      return {
        ...state,
        results: newResultArray
      }
    case EMPTY_RESULTS :
      return {
        ...state,
        results: []
      }

    case ADD_SERIES_DETAILS :
      const seriesDetails = action.payload.seriesDetails
      seriesDetails.forEach((serieItem) => {
        serieItem.isRetrieved = false
        serieItem.key = Math.random()
      })

      const newResultsState = state.results.map((studyData) => {
        if (studyData.studyInstanceUID === action.payload.studyInstanceUID) {
          studyData = {
            ...studyData,
            seriesDetails: seriesDetails
          }
        }
        return studyData
      })

      return {
        ...state,
        results: newResultsState
      }

    default :
      return state
  }
}
