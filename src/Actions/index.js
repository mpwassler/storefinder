// export const updateUserLocation = (location) => ({	
//       type:'SET_CENTER_POINT',
//       payload: location    
// })


export const findClosestLocationsToUser = (location) => ({	
      type:'FIND_USER_LOCATIONS',
      payload: location    
})