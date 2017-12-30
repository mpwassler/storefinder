// export const updateUserLocation = (location) => ({	
//       type:'SET_CENTER_POINT',
//       payload: location    
// })
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

function getDirectionsFromApi(userLatLng, locationLatLng) {
	return httpRequest(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${userLatLng.join(',')};${locationLatLng.join(',')}.json?geometries=polyline&alternatives=false&steps=true&overview=full&access_token=pk.eyJ1IjoibWl0Y2hlbCIsImEiOiJjamJreXhjcHk0Z25kMzNtcmxqbzg4aXljIn0.7Nj9EE6iR3oWGe69UFwfNQ`)	
}

//https://api.mapbox.com/directions/v5/mapbox/driving-traffic/-84.63307%2C39.16057%3B-84.513449%2C39.104017.json?geometries=polyline&alternatives=true&steps=true&overview=full&access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA
//https://api.mapbox.com/directions/v5/{profile}/{coordinates}

export const getDirections = ( userLatLng, locationLatLng ) => {
	return function (dispatch) {
		console.log('get directions')
		console.log(userLatLng)
		console.log(locationLatLng)
		getDirectionsFromApi(userLatLng, locationLatLng)
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