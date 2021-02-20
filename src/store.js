import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import billsReducer from './reducers/billsReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  bills: billsReducer,
  user: userReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))