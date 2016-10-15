import { CONSTANTS } from  '../constants'
import {initialState} from '../initialState'
import { saveData, delData} from '../persistentStorage'

export default function userReducer(state = initialState.user, action){
	switch(action.type){

		case CONSTANTS.LOGOUT: 
			var newState = Object.assign({}, state.user, initialState.user);
			delData("user"); 
			return newState; 

		case CONSTANTS.GOT_USER_LOGIN:
			var newState = Object.assign({}, state.user, {
				isLoggedIn: true,
				username: action.payload.username, 
				token: action.payload.token, 
				role: {
				    id: action.payload.role.id,
				    title: action.payload.role.title, 
				    description: action.payload.role.description, 
				    auth: action.payload.role.auth,
				    tag: action.payload.role.tag
				}
			});

			saveData("user", JSON.stringify(action.payload)); 
			
			return newState; 

		default: 
			return state; 
	}
}