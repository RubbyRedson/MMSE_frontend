/**
 * Created by Nick on 10/12/2016.
 */
import { post, del, get, put } from '../core/http'
import { CONSTANTS } from '../core/constants'

/**
 * @author Victor Axelsson
 * @param dispatch The dispatcher that will tell the store that we have new stuff
 * Get all promotions from the API
 */
export function createNewPlanningRequest(data, dispatch, callback) {
    post('/customer_service/planning_request', data, (err, response) => {
        if(!!err){
            console.warn(err);
        }else{
            /*
            dispatch({
                type: CONSTANTS.GOT_ALL_CLIENTS,
                payload: clients
            });
            */
        }
        callback(err, response); 
    });
}

export function getPendingCustomerManagerRequests(dispatch) {
    get('/customer_service_manager/planning_request', (err, requests) => {
        if(!!err){
            console.warn(err);
        }else{
            dispatch({
                type: CONSTANTS.GOT_PENDING_CUSTOMER_MANAGER_REQUESTS,
                payload: requests
            });
        }
    });
}

export function setRequestToApproved(id, dispatch, callback) {
    var payload = {
        status: 2
    }; 

    put('/customer_service_manager/planning_request/'+ id, payload, (err, response) => {
        if(!!err){
            console.warn(err);
        }

        callback(err, response); 
    });
}

export function setRequestToRejected(id, dispatch, callback) {
    var payload = {
        status: 5
    }; 
    
    put('/customer_service_manager/planning_request/'+ id, payload, (err, response) => {
        if(!!err){
            console.warn(err);
        } 

        callback(err, response); 
    });
}

export function getPendingFinancialManagerRequests(dispatch){
    get('/financial_manager/planning_request', (err, requests) => {
        if(!!err){
            console.warn(err);
        }else{
            dispatch({
                type: CONSTANTS.GOT_PENDING_FINANCIAL_MANAGER_REQUESTS,
                payload: requests
            });
        }
    });
}

/*
export function setRequestToFinancialApproved(id, dispatch, callback){
    var payload = {
        status: 3
    }; 

    put('/financial_manager/planning_request/'+ id, payload, (err, response) => {
        if(!!err){
            console.warn(err);
        }

        callback(err, response); 
    });
}

export function setRequestToFinancialRejected(id, dispatch, callback){
    var payload = {
        status: 5
    }; 

    put('/financial_manager/planning_request/'+ id, payload, (err, response) => {
        if(!!err){
            console.warn(err);
        }

        callback(err, response); 
    });
}
*/

export function submitFinancialManagerFeedback(id, payload, dispatch, callback){
    payload.status = 3; 

    put('/financial_manager/planning_request/'+ id, payload, (err, response) => {
        if(!!err){
            console.warn(err);
        }

        callback(err, response); 
    });
}

