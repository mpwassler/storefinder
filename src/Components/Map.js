import React, { Component } from 'react';
import { connect } from 'react-redux'
import mapboxgl, { Marker, LngLatBounds } from 'mapbox-gl';
import store from '../Store'
import { decode } from 'polyline';

import {TweenMax, Power2} from 'gsap'
//

class Map extends Component {

  token = 'pk.eyJ1IjoibWl0Y2hlbCIsImEiOiJjamJreXhjcHk0Z25kMzNtcmxqbzg4aXljIn0.7Nj9EE6iR3oWGe69UFwfNQ'

  state = {
    userLatLng: [],
    markers: [],
    mapHasLoaded: false
  }

  constructor(props) {
    super(props);   

  }

  componentDidMount() {
    mapboxgl.accessToken = this.token
    this.mapGL = new mapboxgl.Map({
        container: this.mapEl,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [ -84.512552, 39.101698],
        zoom: 15,
        pitch: 10 // pitch in degrees
    });    
    this.mapGL.on('load', () => {
      this.setState({mapHasLoaded : true})
    })
  }

  setCircleIndicatorOnMap( userLatLng ) {
    if(this.mapGL.getSource("source_circle_500")) {
      this.mapGL.removeLayer("circle500")
      this.mapGL.removeLayer("circle501")
      this.mapGL.removeSource("source_circle_500")
      
    }        
    this.mapGL.addSource("source_circle_500", {
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": [{
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": userLatLng
                  }
              }]
          }
    });    
    this.mapGL.addLayer({
          "id": "circle500",
          "type": "circle",
          "source": "source_circle_500",   
          "paint": {
              "circle-radius": 0,
              "circle-color": "#000",
              "circle-opacity": 0.05
          }
    })
    this.mapGL.addLayer({
          "id": "circle501",
          "type": "circle",
          "source": "source_circle_500",   
          "paint": {
              "circle-radius": 10,
              "circle-color": "#fff",
              "circle-opacity": 1
          }
    })    
    TweenMax.to({value:10}, 1.25, {
      value: 70,
      repeat: -1,
      ease: Power2.easeOut,
      onUpdate: (tween) => {
        this.mapGL.setPaintProperty("circle500","circle-radius", tween.target.value)
      },
      onUpdateParams:["{self}"]
    })  
  }

  drawDirectionPolyline(directions) {
    if (directions.length < 1) {
      return false
    }
     const reduceCoodinates = (directions) => {
      return directions.reduce( (carry, route, cnt) => {
        const decoded = decode(route.geometry).map(function(c) {
           return c.reverse();
        });
        return [ ...carry, ...decoded ] 
      }, [])
    }    
    if(this.mapGL.getSource("route")) {      
      this.mapGL.removeLayer("route")      
      this.mapGL.removeSource("route")                  
    }
    this.mapGL.addLayer({
            "id": "route",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": reduceCoodinates(directions.routes)
                    }
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#3FB1CE",
                "line-width": 7,
                "line-opacity": 0.8
            }
        });
  }

  componentWillReceiveProps(nextProps) {   

    /* TODO: 
    *  clean this method up more and break 
    *  map activity into smaller functions. 
    *  Compare props for change to 
    *  improve performance
    */       
    if(this.state.mapHasLoaded) {
      if(nextProps.directions) {
        this.drawDirectionPolyline(nextProps.directions)
      }
      this.setCircleIndicatorOnMap(nextProps.userLatLng)                  
      this.state.markers.forEach( marker => marker.remove())
      if (nextProps.closestLocations.length) {
        let markers = nextProps.closestLocations.map( child => {
          return new Marker()
          .setLngLat([child.lng, child.lat])
          .addTo(this.mapGL)  
        })          
        this.setState({markers: markers})
        if(markers.length) {      
          let bounds =  new LngLatBounds(nextProps.userLatLng, markers[0].getLngLat())      
          var bounds = markers.reduce(function(bounds, coord, cnt) {
                return bounds.extend(coord.getLngLat());
            },bounds)
          this.mapGL.fitBounds(bounds, {padding: {left: 500, bottom: 40, right:40, top:40}} );      
        }
      }
    }
  }

  render() {
    return (
      <div ref={ el => this.mapEl = el} id="map" className="map">        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    markers: state.markers,
    userLatLng: state.userLatLng,
    closestLocations: state.closestLocations,
    locations: state.locations,
    directions: state.directions
  };
}


export default connect(mapStateToProps)(Map)
