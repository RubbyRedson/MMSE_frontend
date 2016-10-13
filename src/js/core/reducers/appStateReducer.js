import { CONSTANTS } from  '../constants'
import {initialState} from '../initialState'

export default function appStateReducer(state = initialState.appState, action){
	switch(action.type){

		case CONSTANTS.GOT_ALL_CLIENTS:
			var newState = Object.assign({}, state, {
				clients: action.payload
			});

			return newState;

		case CONSTANTS.SELECT_DASHBOARD_INDEX: 
			var newState = Object.assign({}, state, {
				selectedDashbordItem: action.payload
			});

			return newState;

		default: 
			return state; 
	}
}