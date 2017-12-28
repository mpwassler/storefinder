import React, { Component } from 'react';
import './LocationList.css';

class LocationList extends Component {

   constructor(props) {
    super(props);
    this.emitCenterChange = this.emitCenterChange.bind(this)
  }	

  componentDidMount() {
   
  }

  emitCenterChange( geometry ) {
     let event = new CustomEvent('move-map', { detail: geometry })
     // Triggers the event on the window object
     window.dispatchEvent(event)
  }

  render () {
  	let hasLocation = this.props.locations.length
  	let sidebar = null
  	if (!hasLocation) {
  		return false
  	}
  	return (
  		<div className="sidebar">
  		{this.props.locations.map( (location, cnt) => {
			return (
				<div key={cnt} onClick={() => {
					this.emitCenterChange([location.lng, location.lat])
				}} className="sidebar_item">
					<h1 className="sidebar_title" >{location.title}</h1>
					<p className="sidebar_distance">{location.distance} Miles</p>
				</div>
			)
  		})}
  		</div>
  	)
  }

}

export default LocationList;
