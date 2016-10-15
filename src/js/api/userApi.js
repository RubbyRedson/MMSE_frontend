/**
 * Created by victor on 2016-10-13
 */
import { post, del, get, put } from '../core/http'
import { CONSTANTS } from '../core/constants'

/**
 * @author Victor Axelsson
 * @param dispatch The dispatcher that will tell the store that we have new stuff
 * Get all promotions from the API
 */
export function login(user, dispatch, callback) {
    post('/user/login', user, (err, response) => {
        if(!!err){
            callback("Faulty credentials", null); 
            // console.warn(err);
        }else{
            dispatch({
                type: CONSTANTS.GOT_USER_LOGIN,
                payload: response
            });
            callback(null, null); 
        }
    });
}