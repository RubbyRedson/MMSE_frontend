import { CONSTANTS } from  '../constants'
import { initialState } from '../initialState'

export default function navigationReducer(state = initialState.navigation, action){
	switch(action.type){


		case CONSTANTS.NAVIGATE_TO_PAGE: 
			var newState = Object.assign({}, state, {
				route: action.payload
			}); 

			return newState; 

		default: 
			return state; 
	}
}