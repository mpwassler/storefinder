import { createStore, applyMiddleware } from 'redux'
import reducer from '../Reducers'
import thunk from 'redux-thunk'
import { getLocations } from '../Actions'


let store = createStore(
	reducer,
	applyMiddleware(thunk)
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.dispatch(getLocations())

export default store