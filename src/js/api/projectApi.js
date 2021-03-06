import { post, del, get, put } from '../core/http'
import { CONSTANTS } from '../core/constants'

/**
* @author Victor Axelsson
* @param dispatch The dispatcher that will tell the store that we have new stuff
* Get all promotions from the API
*/
export function createProject(data, dispatch, callback){

	post('/production_manager/project', data, (err, project) => {
		if(!!err){
			console.warn(err); 
		}

		callback(err, project); 
	}); 
}

export function getProjectById(id, dispatch, callback){
	get('/project/' + id, (err, project) => {
		if(!!err){
			console.warn(err); 
		}

		callback(err, project); 
	}); 
}