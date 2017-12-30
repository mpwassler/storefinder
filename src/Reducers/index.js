import {haversineSolver} from '../Utils/geometry.js'

const initState = {
	address: '',
	centerPoint: [0,0],
	userLatLng: [0,0],
	suggestions: [],
	locations: [],
	closestLocations: [] ,
	markers: [],
	directions: [],
	token: 'pk.eyJ1IjoibWl0Y2hlbCIsImEiOiJjamJreXhjcHk0Z25kMzNtcmxqbzg4aXljIn0.7Nj9EE6iR3oWGe69UFwfNQ'
}

export default ( state = initState, action ) => {
	console.log(action.type)
	console.log(action.payload)
	switch(action.type) {
		case 'FIND_USER_LOCATIONS':
			return {
				...state,
				closestLocations: state.locations.map( loc => ({
					...loc,
					distance: haversineSolver({Lat: action.payload[1] , Lon: action.payload[0]}, {Lat: loc.lat , Lon: loc.lng })          
				})).sort( ( a, b ) => {
					return a.distance - b.distance
				}).slice(0,8),
				userLatLng: action.payload
			}
		case 'SET_LOCATIONS':
			return {
				...state,
				locations: action.payload

			}
		case 'SET_DIRECTIONS':
			return {
				...state,
				directions: action.payload

			}
		default:
			return state		
	}
	
}