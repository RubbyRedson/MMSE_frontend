import { post, del, get, put } from '../core/http'
import { CONSTANTS } from '../core/constants'

/**
* @author Victor Axelsson
* @param dispatch The dispatcher that will tell the store that we have new stuff
* Get all promotions from the API
*/
export function createProposal(data, dispatch, callback){
	post('/production_manager/resource_request', data, (err, project) => {
		if(!!err){
			console.warn(err); 
		}

		callback(err, project); 
	}); 
}

export function getHrRequests(dispatch){
	get('/hr_team/resource_request', (err, requests) => {
		if(!!err){
			console.warn(err); 
		}

		dispatch({
			type: CONSTANTS.GOT_HR_REQUESTS,
			payload: requests
		}); 
	}); 
}

export function getAllFinancialRequests(dispatch){
	get('/financial_manager/resource_request', (err, requests) => {
		if(!!err){
			console.warn(err); 
		}

		dispatch({
			type: CONSTANTS.GOT_FINANCIAL_REQUESTS,
			payload: requests
		}); 
	}); 
}

export function createJobAdvertisement(data, dispatch, callback){
	post('/hr_team/job_advertisement', data, (err, response) => {
		if(!!err){
			console.warn(err); 
		}
		callback(err, response); 
	}); 
}

export function deleteResourceRequest(id, dispatch, callback){
	del('/hr_team/resource_request/' + id, (err, response) => {
		if(!!err){
			console.warn(err); 
		}
		callback(err, response); 
	}); 
}

export function setResourceStatus(id, data, dispatch, callback){
	put('/financial_manager/set_resource_request_status/' + id, data, (err, response) => {
		if(!!err){
			console.warn(err); 
		}

		callback(err, response); 
	}); 
}


