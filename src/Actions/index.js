// export const updateUserLocation = (location) => ({	
//       type:'SET_CENTER_POINT',
//       payload: location    
// })


export const findClosestLocationsToUser = (location) => ({	
      type:'FIND_USER_LOCATIONS',
      payload: location    
})

export const setLocations = (location) => ({	
      type:'SET_LOCATIONS',
      payload: location    
})


function getLocationsFromApi() {
	return new Promise( (resolve, reject) => {
		var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = () => {
	        	if (xhttp.readyState == 4 && xhttp.status == 200) {           	           
	           	resolve( JSON.parse(xhttp.responseText))
	        }
		};
		xhttp.open("GET", "locations.json", true);
		xhttp.send();
	})
}


export const getLocations = () => {
	console.log('dispatch')
	return function (dispatch) {
		getLocationsFromApi()
		.then( locations => dispatch(setLocations(locations)))
	}
}