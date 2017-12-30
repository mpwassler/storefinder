import React, { Component } from 'react';
import './LocationList.css';
import { connect } from 'react-redux'
import { getDirections } from '../../Actions'

class LocationList extends Component {

	 constructor(props) {
		super(props);
		
	}	

	componentDidMount() {
	 
	}

	handleClick(location, userLocation) {
		console.log('clicked')
		//{title: "The Raymond Thunder-Sky Legacy Mural", address: "3841 Spring Grove Ave Cincinnati, Ohio", lat: 39.1567535, lng: -84.5410108, distance: 4.94}
		console.log(location)
		this.props.dispatch(getDirections([location.lng, location.lat], userLocation, this.props.token))
	}

	render () {
		let hasLocation = this.props.locations.length
		let sidebar = null
		if (!hasLocation) {
			return false
		}
		//[location.lng, location.lat]
		return (
			<div className="sidebar">
			{this.props.children}
			{this.props.locations.map( (location, cnt) => {
			return (
				<div key={cnt} 
				onMouseEnter={() => {
					this.handleClick(location, this.props.userLatLng)
				}}
				className="sidebar_item">
					<h1 className="sidebar_title" >{location.title}</h1>
					<p className="sidebar_distance">{location.distance} Miles</p>
				</div>
			)
			})}
			</div>
		)
	}

}



function mapStateToProps(state) {
	return {
		locations: state.closestLocations,
		userLatLng: state.userLatLng ,
		token: state.token
	};
}
export default connect(mapStateToProps)(LocationList)