
export const httpRequest = (url) => {
  return new Promise( (resolve, reject) => {
	var xhttp = new XMLHttpRequest()
	  xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4 && xhttp.status == 200) {                        
			  resolve( JSON.parse(xhttp.responseText))
		  }
	}
	xhttp.open("GET", url, true)
	xhttp.send();
  })
}

export const getLocationsFromApi = () => {
	return httpRequest("locations.json")	
}

export const getDirectionsFromApi = (userLatLng, locationLatLng, token) => {
	let key = '_geometry' + userLatLng.join('|') + locationLatLng.join('|')
	if (!localStorage.getItem(key)) {
		return httpRequest(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${userLatLng.join(',')};${locationLatLng.join(',')}.json?geometries=polyline&alternatives=false&steps=true&overview=full&access_token=${token}`)
		.then( dir => {
			localStorage.setItem(key, JSON.stringify(dir))							
		} )			
	} else {
		return new Promise( (res, reg) => {			
			res(JSON.parse(localStorage.getItem(key)))
		})		
	}
}

