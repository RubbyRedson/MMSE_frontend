import { post, del, get, put } from '../core/http'
import { CONSTANTS } from '../core/constants'

/**
* @author Victor Axelsson
* @param dispatch The dispatcher that will tell the store that we have new stuff
* Get all promotions from the API
*/
export function getAllPromotions(dispatch) {

	get('/promotion', (err, promotions) => {
		console.log(promotions); 
		if(!!err){
			console.warning(err); 
		}else{
			dispatch({
				type: CONSTANTS.GOT_ALL_PROMOTIONS,
				payload: promotions 
			}); 
		}
	}); 
}