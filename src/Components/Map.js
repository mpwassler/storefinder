import React, { Component } from 'react';
import mapboxgl, { Marker, LngLatBounds } from 'mapbox-gl';

//

class Map extends Component {

  token = 'pk.eyJ1IjoibWl0Y2hlbCIsImEiOiJjamJreXhjcHk0Z25kMzNtcmxqbzg4aXljIn0.7Nj9EE6iR3oWGe69UFwfNQ'

  state = {
    markers: []
  }

  constructor(props) {
    super(props);
    window.addEventListener('move-map', this.moveMap.bind(this))             
  }

  moveMap(e) {
    this.mapGL.flyTo({
      center: e.detail, 
      speed: 0.9,
      curve: 1
    })
    if(this.state.markers.length) {      
      let bounds =  new LngLatBounds(this.state.markers[0].getLngLat(), this.state.markers[0].getLngLat())      
      var bounds = this.state.markers.reduce(function(bounds, coord, cnt) {
            return bounds.extend(coord.getLngLat());
        },bounds)
      this.mapGL.fitBounds(bounds);      
    }
  }

  componentDidMount() {
    mapboxgl.accessToken = this.token
    this.mapGL = new mapboxgl.Map({
        container: this.mapEl,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [ -84.512552, 39.101698],
        zoom: 15
    });    
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    this.state.markers.forEach( marker => marker.remove())
    let markers = nextProps.children.map( child => {
      return new Marker()
      .setLngLat([child.props.lng, child.props.lat])
      .addTo(this.mapGL)  
    })    
    this.setState({markers: markers})
  }

  render() {
    return (
      <div ref={ el => this.mapEl = el} id="map" className="map">
        
      </div>
    );
  }
}

export default Map;
