
import {httpRequest} from '../Utils/utils'
import { 
	getLocationsFromApi, 
	getDirectionsFromApi 
} from '../Utils/http'

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