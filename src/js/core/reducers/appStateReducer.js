import { CONSTANTS } from  '../constants'
import {initialState} from '../initialState'

export default function appStateReducer(state = initialState.appState, action){
	switch(action.type){

		default: 
			return state; 
	}
}