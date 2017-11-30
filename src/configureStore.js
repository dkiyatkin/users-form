import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineForms } from 'react-redux-form'
import { createLogger } from 'redux-logger'

import * as reducers from './reducers'

const logger = createLogger({
})

export default function configureStore (initialState) {
  const store = createStore(
    combineReducers({
      ...reducers,
      rrf: combineForms({
        ...initialState.rrf
      }, 'rrf')
    }),
    initialState,
    applyMiddleware(
      thunk,
      logger,
    )
  )

  return store
}
