import React, { Component } from 'react';
import './PostCodeInput.css';
import MapboxClient from 'mapbox'
import { connect } from 'react-redux'
import {throttle} from '../../Utils/utils.js'

import {findClosestLocationsToUser} from '../../Actions'


class PostCodeInput extends Component {

	
	state = {
		suggestions: []
	}
	constructor(props) {
		super(props);
		this.checkTypeAhead = throttle(this.checkTypeAhead, 500).bind(this);
		this.killTypeAhead = this.killTypeAhead.bind(this);
	}

	parseGeocoderResult(address) {
		let mapboxGeoData = (resolve, reject) => {
			this.client.geocodeForward(address, {
				proximity: { latitude: 39.101698, longitude: -84.512552 },
				country: 'us',
				limit: 20,
				types: 'address'
			}, (err, data, res) => {
				if (err) {
					return resolve([])
				}
				let addresses = data.features.map( feature => {
					return {
						place_name: feature.place_name,
						point:  feature.geometry.coordinates
					}
				})        
				resolve(addresses)
			})
		}
		return new Promise(mapboxGeoData)
	}

	checkTypeAhead() {        
		this.parseGeocoderResult(this.inputField.value)
		.then( suggestions => { this.setState({suggestions}) })
	}

	killTypeAhead(e) {
		this.setState({suggestions: []})
	}

 emitCenterChange( LngLat ) {
		this.props.dispatch(findClosestLocationsToUser(LngLat))
		this.killTypeAhead()
 }

	componentDidMount() {
		this.client = new MapboxClient(this.props.token)
	}

	render() {
		return (
			<div id="postcode" className={`postcode ${ this.props.styleName }`} >
				<input 
				ref={ el => this.inputField = el} 
				onFocus={this.checkTypeAhead} 
				onChange={this.checkTypeAhead} 
				placeholder="Address" 
				className="postcode_field" 
				type="text" />
				<button className="postcode_btn" onClick={ () => { 
					this.emitCenterChange(this.state.suggestions[0].point) 
				}} >Find</button>
				<div className="postcode_suggestions" >
					{this.state.suggestions.map( s => {
						return <button key={s.place_name} className="postcode_suggestion" onClick={ () => {
							this.emitCenterChange(s.point) 
						}}>{s.place_name}</button>
					})}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		markers: state.markers,
		centerPoint: state.centerPoint,
		token : state.token    
	};
}


export default connect(mapStateToProps)(PostCodeInput)
