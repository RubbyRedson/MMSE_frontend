import { post, del, get, put } from '../core/http'
import { CONSTANTS } from '../core/constants'


export function getSubteamRequests(dispatch){

	get('/sub_team/subteam_request', (err, requests) => {
		if(!!err){
			console.warn(err); 
		}else{
			dispatch({
				type: CONSTANTS.GOT_ALL_SUBTEAM_REQUEST,
				payload: requests
			}); 
		}
	}); 
}

export function updateSubteamRequests(data, dispatch, callback){
	put('/sub_team/subteam_request/' + data.id, data, (err, request) => {
		if(!!err){
			console.warn(err); 
		}

		callback(err, request); 
	}); 
}

export function updateManagerSubteamRequests(data, dispatch, callback){
	put('/production_manager/subteam_request/' + data.id, data, (err, request) => {
		if(!!err){
			console.warn(err); 
		}

		callback(err, request); 
	}); 
}


export function getConflictingRequsts(dispatch, callback){
	get('/production_manager/subteam_request/conflict', (err, requests) => {
		if(!!err){
			console.warn(err); 
		}else{
			dispatch({
				type: CONSTANTS.GOT_CONFLICTING_RESOURCE_REQUESTS,
				payload: requests
			}); 
		}

		callback(err, requests); 
	}); 
}

export function getSubteamById(id, dispatch, callback){
	get('/subteam/' + id, (err, team) => {
		if(!!err){
			console.warn(err); 
		}else{
			dispatch({
				type: CONSTANTS.GOT_SUBTEAM,
				payload: team
			}); 
		}

		callback(err, team); 
	}); 
}

