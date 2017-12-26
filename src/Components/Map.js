import React, { Component } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';

//

class Map extends Component {

  token = 'pk.eyJ1IjoibWl0Y2hlbCIsImEiOiJjamJreXhjcHk0Z25kMzNtcmxqbzg4aXljIn0.7Nj9EE6iR3oWGe69UFwfNQ'

  componentDidMount() {
    mapboxgl.accessToken = this.token
    this.map = new mapboxgl.Map({
        container: this.mapEl,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [ -84.512552, 39.101698],
        zoom: 15
    });
    
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    let markers = nextProps.children.map( child => {
      return new Marker()
      .setLngLat([child.props.lat, child.props.lng])
      .addTo(this.map)  
    })    
  }

  render() {
    return (
      <div ref={ el => this.mapEl = el} id="map" className="map">
        
      </div>
    );
  }
}

export default Map;
