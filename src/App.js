import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'
import PostCodeInput from './Components/PostCodeInput'
import Marker from './Components/Marker'
import LocationList from './Components/LocationList'
import {haversineSolver} from './Utils/geometry.js'


class App extends Component {

  state = { 
    locations: [],
    closestLocations: [] 
  }

  constructor(props) {
    super(props);
    window.addEventListener('move-map', this.filterLocations.bind(this))
  }

  filterLocations(e) {
    let userLocation = {Lat: e.detail[1] , Lon: e.detail[0]}
    let filteredLocations = this.state.locations.map( loc => ({
        ...loc,
        distance: haversineSolver( userLocation, {Lat: loc.lat , Lon: loc.lng })          
    })).sort( ( a, b ) => {
        return a.distance - b.distance
    }).slice(0,8)
    this.setState({closestLocations: filteredLocations})
  }

  componentDidMount() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {           
           this.setState({locations: JSON.parse(xhttp.responseText)})
        }
    };
    xhttp.open("GET", "locations.json", true);
    xhttp.send();
  }

  render() {
    return (
      <div className="App">        
        <Map>
          {this.state.closestLocations.map( (l, cnt) => {
            return <Marker key={cnt} title={l.title} lat={l.lat} lng={l.lng} />
          })}
        </Map>
        {this.state.closestLocations.length < 1 && 
          <PostCodeInput />  
        }        
        <LocationList locations={this.state.closestLocations} / >
      </div>
    );
  }
}

export default App;
