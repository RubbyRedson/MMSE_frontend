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

		case CONSTANTS.GOT_PENDING_CUSTOMER_MANAGER_REQUESTS: 
			var newState = Object.assign({}, state, {
				customerServiceManagerRequests: action.payload
			});
			return newState;

		case CONSTANTS.GOT_PENDING_FINANCIAL_MANAGER_REQUESTS:
			var newState = Object.assign({}, state, {
				financialManagerRequests: action.payload
			});
			return newState;

		case CONSTANTS.GOT_PENDING_ADMIN_MANAGER_REQUESTS:
			var newState = Object.assign({}, state, {
				adminManagerRequests: action.payload
			});
			return newState;

		case CONSTANTS.GOT_PENDING_CMS_REQUESTS:
			var newState = Object.assign({}, state, {
				cmsRequests: action.payload
			});
			return newState;
		
		case CONSTANTS.GOT_CLIENT:
			var tree = Object.assign({}, state.clientTree); 
			tree[action.payload.id] = action.payload; 
			var newState = Object.assign({}, state, {
				clientTree: tree
			});

			return newState;

		case CONSTANTS.GOT_CLIENT_PROJECT_SUM:
			var newState = Object.assign({}, state, {
				clientSum: action.payload
			});
			return newState;


		default: 
			return state; 
	}
}