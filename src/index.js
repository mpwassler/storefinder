import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './Reducers'
import { getLocations } from './Actions'

let store = createStore(
	reducer,
	applyMiddleware(thunk)	
)

store.dispatch(getLocations())

ReactDOM.render( 
  	<Provider store={store}>
  		<App />
  	</Provider>, 
   	document.getElementById('root')
)

registerServiceWorker();
