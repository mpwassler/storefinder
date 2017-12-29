import {haversineSolver} from '../Utils/geometry.js'

const initState = {
	address: '',
	centerPoint: [0,0],
	userLatLng: [0,0],
	suggestions: [],
	locations: [{
    "title": "The Hands that Built Our City",
    "address": "525 Elm Street, Cincinnati, OH 45202",
    "lat": 39.1011667,
    "lng": -84.5179805
  },
  {
    "title": "Martha, the Last Passenger Pigeon",
    "address": "15 E. Eighth St, Cincinnati, OH 45202",
    "lat": 39.104327,
    "lng": -84.5131029
  },
  {
    "title": "Energy and Grace",
    "address": "16 E. 12th Street, Cincinnati, OH 45202",
    "lat": 39.1085197,
    "lng": -84.5141511
  },
  {
    "title": "Guardians of the City",
    "address": "1011 W. 8th Street, Cincinnati, OH 45203",
    "lat": 39.1033206,
    "lng": -84.5334785
  },
  {
    "title": "Pendleton Mapped",
    "address": "1321 Pendleton Street, Cincinnati, OH 45202",
    "lat": 39.111132,
    "lng": -84.507391
  },
  {
    "title": "Kentucky Natural History",
    "address": "24 E. 5th Street, Covington, KY 41011",
    "lat": 39.0863902,
    "lng": -84.5096608
  },
  {
    "title": "Ode to North Avondale",
    "address": "3916 Reading Road, Cincinnati, OH 45229",
    "lat": 39.155659,
    "lng": -84.4801279
  },
  {
    "title": "The Migration of Tradition",
    "address": "1920 Race Street, Cincinnati, OH 45202",
    "lat": 39.1173341,
    "lng": -84.5182926
  },
  {
    "title": "No Place Like Home",
    "address": "27 W. 12th Street, Cincinnati, OH 45202",
    "lat": 39.1079151,
    "lng": -84.5156422
  },
  {
    "title": "Licking River Greenway and Trails Murals",
    "address": "Levassor and Eastern Avenue. Enter trail at southern end and walk North.",
    "lat": 0,
    "lng": 0
  },
  {
    "title": "Homecoming (Blue Birds)",
    "address": "119 East Court Street, Cincinnati, OH 45202",
    "lat": 39.106312,
    "lng": -84.5119411
  },
  {
    "title": "Fresh Harvest",
    "address": "1014 Vine Street, Cincinnati, OH 45202",
    "lat": 39.1067628,
    "lng": -84.5139541
  },
  {
    "title": "The Wall of Education",
    "address": "2651 Burnet Avenue,Cincinnati, OH 45219",
    "lat": 39.1303834,
    "lng": -84.5023182
  },
  {
    "title": "Along the Hill",
    "address": "4518 West Eighth Street, Cincinnati, OH 45238",
    "lat": 39.1093315,
    "lng": -84.599466
  },
  {
    "title": "Oakley: Morning, Noon, and Night",
    "address": "3142 Madison Road, Cincinnati, OH 45209",
    "lat": 39.1540783,
    "lng": -84.4290442
  },
  {
    "title": "The Golden Muse",
    "address": "28 West 13th Street Cincinnati, OH 45202",
    "lat": 39.1094235,
    "lng": -84.5163797
  },
  {
    "title": "Garden Party at the Taft",
    "address": "229 Fairfield Avenue, Bellevue, KY 41073",
    "lat": 39.1055613,
    "lng": -84.4844983
  },
  {
    "title": "Covington Vision 2015 (Phase 1)",
    "address": "Licking River Greenway & Trails, Covington, KY",
    "lat": 39.062858,
    "lng": -84.49794
  },
  {
    "title": "The Village We Call Home",
    "address": "10500 Reading Road, Cincinnati, OH 45241",
    "lat": 39.2554598,
    "lng": -84.4192122
  },
  {
    "title": "The Roots of Vision",
    "address": "1136 St. Gregory Street, Cincinnati, OH 45202",
    "lat": 39.1087589,
    "lng": -84.4974817
  },
  {
    "title": "Philosopher’s Bone",
    "address": "6701 Kellogg Road, Cincinnati, OH 45230",
    "lat": 39.048212,
    "lng": -84.397962
  },
  {
    "title": "The Avondale Pride Mural",
    "address": "3544 Reading Road, Cincinnati, OH 45229",
    "lat": 39.1459008,
    "lng": -84.4900509
  },
  {
    "title": "The Cobbler’s Apprentice Plays Ball",
    "address": "120 East Freedom Way, Cincinnati, OH 45202",
    "lat": 39.0974035,
    "lng": -84.5098842
  },
  {
    "title": "A Perfect Day in College Hill",
    "address": "6060 Hamilton Avenue, Cincinnati, OH 45224",
    "lat": 39.201592,
    "lng": -84.547332
  },
  {
    "title": "Sunset Walk through Helentown",
    "address": "315 E. 15th Street, Covington, KY 41011",
    "lat": 39.0740508,
    "lng": -84.5017628
  },
  {
    "title": "Northern Kentucky Panorama",
    "address": "717 Madison Avenue, Covington, KY 41011",
    "lat": 39.0827294,
    "lng": -84.5102328
  },
  {
    "title": "Cincinnati’s Table",
    "address": "713 Vine Street, Cincinnati, OH 45202",
    "lat": 39.1041586,
    "lng": -84.5139586
  },
  {
    "title": "Hamilton Waterways, Past and Present",
    "address": "24 S 2nd St Hamilton, OH 45011",
    "lat": 39.3991649,
    "lng": -84.5620319
  },
  {
    "title": "A Tribute to Newport",
    "address": "1032 Saratoga St, Newport, KY 41071",
    "lat": 39.0868311,
    "lng": -84.4873578
  },
  {
    "title": "Main Street Collages",
    "address": "Main St & E 13th St, Cincinnati, OH 45202",
    "lat": 39.1099422,
    "lng": -84.5118527
  },
  {
    "title": "Learn, Play and Grow",
    "address": "215 E 14th St, Cincinnati, OH 45202",
    "lat": 39.111072,
    "lng": -84.511585
  },
  {
    "title": "The Winds of the Ridge",
    "address": "6096 Montgomery Rd, Cincinnati, OH 45213",
    "lat": 39.1818077,
    "lng": -84.4277131
  },
  {
    "title": "The Singing Mural",
    "address": "1223 Central Pkwy, Cincinnati, OH 45214",
    "lat": 39.1082149,
    "lng": -84.5203337
  },
  {
    "title": "The Divine Proportion of All Things",
    "address": "714 Washington Ave, Covington, KY 41011",
    "lat": 39.0826746,
    "lng": -84.5112696
  },
  {
    "title": "Riverside Rides",
    "address": "2726 Riverside Dr, Cincinnati, OH 45202",
    "lat": 39.1227765,
    "lng": -84.4549443
  },
  {
    "title": "Ice Cream Daydream",
    "address": "33 East 12th Street, Cincinnati, OH 45202",
    "lat": 39.1084009,
    "lng": -84.5135164
  },
  {
    "title": "All You Can Imagine Is Real",
    "address": "1515 Carll St, Cincinnati, OH 45225",
    "lat": 39.1343793,
    "lng": -84.5466548
  },
  {
    "title": "A Day in the Life of Sayler Park",
    "address": "6356 Gracely Drive, Cincinnati, OH 45223",
    "lat": 39.1075685,
    "lng": -84.6878545
  },
  {
    "title": "Westwood Story",
    "address": "3077 Harrison Ave, Cincinnati, OH 45211",
    "lat": 39.1501274,
    "lng": -84.5999643
  },
  {
    "title": "Willkommen to Clifton Heights",
    "address": "2392 Wheeler St, Cincinnati, OH 45219",
    "lat": 39.1275747,
    "lng": -84.5201176
  },
  {
    "title": "Bridging Tusculum",
    "address": "400 Delta Ave, Cincinnati, OH 45226",
    "lat": 39.1171794,
    "lng": -84.4392162
  },
  {
    "title": "An Epic of Time and Town",
    "address": "411 W 6th St, Covington, KY 41011",
    "lat": 39.0835336,
    "lng": -84.5181551
  },
  {
    "title": "What Are the Lyrics to Your Song?",
    "address": "3564 Montgomery Rd, Cincinnati, OH 45207",
    "lat": 39.1437856,
    "lng": -84.470187
  },
  {
    "title": "The Raymond Thunder-Sky Legacy Mural",
    "address": "3841 Spring Grove Ave Cincinnati, Ohio",
    "lat": 39.1567535,
    "lng": -84.5410108
  },
  {
    "title": "Daybreak in O’Bryonville",
    "address": "2114 Madison Rd, Cincinnati, OH 45208",
    "lat": 39.132852,
    "lng": -84.4605967
  },
  {
    "title": "Mr. Tarbell Tips His Hat",
    "address": "1109 Vine Street, Cincinnati, OH 45202",
    "lat": 39.1074825,
    "lng": -84.5148401
  }],
    closestLocations: [] ,
    markers: []
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
		default:
			return state		
	}
	
}