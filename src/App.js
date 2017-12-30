import React, { Component } from 'react';
import { connect } from 'react-redux'
import {haversineSolver} from './Utils/geometry.js'
import Map from './Components/Map'
import PostCodeInput from './Components/PostCodeInput/PostCodeInput'
import LocationList from './Components/LocationList/LocationList'

const App = (props) => {
	return (
		<div className="App">        
			<Map locations="props.closestLocations" >
			</Map>
			{props.closestLocations.length < 1 && 
				<PostCodeInput />  
			}        
			<LocationList locations={props.closestLocations} >
				<PostCodeInput styleName="postcode-list" /> 
			</LocationList>
		</div>
	)	
}

function mapStateToProps(state) {
	return {
		closestLocations: state.closestLocations,
		locations: state.locations    
	};
}

export default connect(mapStateToProps)(App)
