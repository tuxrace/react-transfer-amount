import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import saga from './saga'

function configuredStore (initialState = {transfers: []}) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware];
  const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
  )

  store.sagaTask = sagaMiddleware.run(saga)

  return store
}

export default configuredStore