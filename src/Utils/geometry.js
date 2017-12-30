
function radians(degrees){
  	return degrees * Math.PI / 180; 
}

function miles(i) {
	return  Math.round( ( i * 0.000621371192 ) * 100) / 100 
}

export function haversineSolver( latLon1, latLon2 ) {
	let R = 6371e3 // metres
	let Lat1 = radians(latLon1.Lat)
	let Lat2 = radians(latLon2.Lat)
	let deltaLat = radians(latLon2.Lat-latLon1.Lat)
	let deltaLon = radians(latLon2.Lon-latLon1.Lon)
	let a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(Lat1) * Math.cos(Lat2) * Math.sin(deltaLon/2) * Math.sin(deltaLon/2)
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))           
	return miles(R * c)
}