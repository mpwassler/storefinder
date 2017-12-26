import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'
import PostCodeInput from './Components/PostCodeInput'
import Marker from './Components/Marker'

class App extends Component {

  state = { 
    locations: [] 
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
          {this.state.locations.map( (l, cnt) => {
            return <Marker key={cnt} title={l.title} lat={l.lat} lng={l.lng} />
          })}
        </Map>
        <PostCodeInput />  
      </div>
    );
  }
}

export default App;
