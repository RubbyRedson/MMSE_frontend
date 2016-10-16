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

