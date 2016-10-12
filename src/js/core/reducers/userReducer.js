import { CONSTANTS } from  '../constants'
import {initialState} from '../initialState'

export default function userReducer(state = initialState.user, action){
	switch(action.type){

		case CONSTANTS.LOGOUT: 
			var newState = Object.assign({}, state.user, {
				isLoggedIn: false,
			});
			
			return newState; 

		default: 
			return state; 
	}
}