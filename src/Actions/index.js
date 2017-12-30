
import {httpRequest} from '../Utils/utils'

export const findClosestLocationsToUser = (location) => ({	
      type:'FIND_USER_LOCATIONS',
      payload: location    
})

export const setLocations = (location) => ({	
      type:'SET_LOCATIONS',
      payload: location    
})

export const setDirections = (dir) => ({	
      type:'SET_DIRECTIONS',
      payload: dir    
})


function getLocationsFromApi() {

	return httpRequest("locations.json")	
}

function getDirectionsFromApi(userLatLng, locationLatLng, token) {
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

export const getDirections = ( userLatLng, locationLatLng, token ) => {
	return function (dispatch) {
		console.log('get directions')
		getDirectionsFromApi(userLatLng, locationLatLng, token)
		.then( dir => {
			dispatch(setDirections(dir))			
		})
	}
}

export const getLocations = () => {
	console.log('dispatch')
	return function (dispatch) {
		getLocationsFromApi()
		.then( locations => {
			dispatch(setLocations(locations))
		})
	}
}