import React, { Component } from 'react';
import './LocationList.css';
import { connect } from 'react-redux'
import { getDirections } from '../../Actions'

const LocationList = (props) => {	
	if (!props.locations.length) return false	
	return (
		<div className="sidebar">
		{props.children}
		{props.locations.map( (location, cnt) => {
		return (
			<div key={cnt} 
			onMouseEnter={() => {				
				props.dispatch(getDirections([location.lng, location.lat], props.userLatLng, props.token))
			}}
			className="sidebar_item">
				<h1 className="sidebar_title" >{location.title}</h1>
				<p className="sidebar_address">{location.address}</p>
				<p className="sidebar_distance">{location.distance} Miles</p>
			</div>
		)
		})}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		locations: state.closestLocations,
		userLatLng: state.userLatLng ,
		token: state.token
	};
}
export default connect(mapStateToProps)(LocationList)