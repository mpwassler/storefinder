import React, { Component } from 'react';

import Map from './Components/Map'
import PostCodeInput from './Components/PostCodeInput/PostCodeInput'
import Marker from './Components/Marker'
import LocationList from './Components/LocationList/LocationList'
import {haversineSolver} from './Utils/geometry.js'
import store from './Store'
import { connect } from 'react-redux'




class App extends Component {

  constructor(props) {
    super(props);
    window.addEventListener('move-map', this.filterLocations.bind(this))
  }

  filterLocations(e) {    
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
        <Map locations="this.props.closestLocations" >
        </Map>
        {this.props.closestLocations.length < 1 && 
          <PostCodeInput />  
        }        
        <LocationList locations={this.props.closestLocations} >
          <PostCodeInput styleName="postcode-list" /> 
        </LocationList>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    closestLocations: state.closestLocations,
    locations: state.locations    
  };
}


export default connect(mapStateToProps)(App)
