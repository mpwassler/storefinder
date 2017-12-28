import React, { Component } from 'react';
import './PostCodeInput.css';
import MapboxClient from 'mapbox'
import {throttle} from '../Utils/utils.js'

class PostCodeInput extends Component {

  token = 'pk.eyJ1IjoibWl0Y2hlbCIsImEiOiJjamJreXhjcHk0Z25kMzNtcmxqbzg4aXljIn0.7Nj9EE6iR3oWGe69UFwfNQ'
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

 emitCenterChange( geometry ) {
    let event = new CustomEvent('move-map', { detail: geometry })
    // Triggers the event on the window object
    window.dispatchEvent(event)
    this.killTypeAhead()
 }

  componentDidMount() {
    this.client = new MapboxClient(this.token)
  }

  render() {
    return (
      <div id="postcode" className="postcode">
        <input 
        ref={ el => this.inputField = el} 
        onFocus={this.checkTypeAhead} 
        onChange={this.checkTypeAhead} 
        placeholder="Address" 
        className="postcode_field" 
        type="text" />
        <button className="postcode_btn" onClick={ () => { this.emitCenterChange(this.state.suggestions[0].point) }} >Find</button>
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

export default PostCodeInput;
