import React, { Component } from 'react';
import Map from './Components/Map'
import PostCodeInput from './Components/PostCodeInput/PostCodeInput'
import LocationList from './Components/LocationList/LocationList'
import {haversineSolver} from './Utils/geometry.js'
import store from './Store'
import { connect } from 'react-redux'

class App extends Component {

	render() {
		return (
			<div className="App">        
				<Map locations="this.props.closestLocations" >
				</Map>
				{this.props.closestLocations.length < 1 && 
					<PostCodeInput />  
				}        
				<LocationList locations={this.props.closestLocations} >
					<PostCodeInput styleName="postcode-list" /> 
				</LocationList>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		closestLocations: state.closestLocations,
		locations: state.locations    
	};
}

export default connect(mapStateToProps)(App)
