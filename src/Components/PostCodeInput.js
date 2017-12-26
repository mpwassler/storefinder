import React, { Component } from 'react';
import './PostCodeInput.css';
import MapboxClient from 'mapbox'

class PostCodeInput extends Component {

  token = 'pk.eyJ1IjoibWl0Y2hlbCIsImEiOiJjamJreXhjcHk0Z25kMzNtcmxqbzg4aXljIn0.7Nj9EE6iR3oWGe69UFwfNQ'
  state = {
    suggestions: []
  }
  constructor(props) {
    super(props);

    this.checkTypeAhead = this.checkTypeAhead.bind(this);
    this.killTypeAhead = this.killTypeAhead.bind(this);
  }

  parseGeocoderResult(address) {
    return new Promise( (resolve, reject) => {
      this.client.geocodeForward(address, {
        proximity: { latitude: 39.101698, longitude: -84.512552 },
        country: 'us',
        limit: 20,
        types: 'address'
      } , (err, data, res) => {
        if (err) {
          return resolve([])
        }
        let addresses = data.features.map( feature => {
          return {
            place_name: feature.place_name,
            point:  feature.geometry.coorddinates
          }
        })        
        resolve(addresses)
      })
    })
  }

  checkTypeAhead(e) {    
    this.parseGeocoderResult(e.target.value)
    .then( suggestions => {
      this.setState({suggestions})      
    })
  }

  killTypeAhead(e) {
    this.setState({suggestions: []})
  }

  componentDidMount() {
    this.client = new MapboxClient(this.token)
  }

  render() {
    return (
      
        <div id="postcode" className="postcode">
          <input ref={ el => this.inputField = el} onBlur={this.killTypeAhead} onFocus={this.checkTypeAhead} onChange={this.checkTypeAhead} placeholder="Address" className="postcode_field" type="text" />
          <button className="postcode_btn">Find</button>
          <div className="postcode_suggestions" >
            {this.state.suggestions.map( s => {
              return <button className="postcode_suggestion">{s.place_name}</button>
            })}
          </div>
        </div>
    );
  }
}

export default PostCodeInput;
