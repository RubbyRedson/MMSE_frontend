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
export function getAllClients(dispatch) {
    get('/customer_service/client', (err, clients) => {
        console.log(clients);
        if(!!err){
            console.warn(err);
        }else{
            dispatch({
                type: CONSTANTS.GOT_ALL_CLIENTS,
                payload: clients
            });
        }
    });
}

export function getAllClientsManager(dispatch){
    get('/client', (err, clients) => {
        console.log(clients);
        if(!!err){
            console.warn(err);
        }else{
            dispatch({
                type: CONSTANTS.GOT_ALL_CLIENTS,
                payload: clients
            });
        }
    });
}

export function getClientById(id, dispatch, callback) {
    get('/client/' + id, (err, client) => {
        if(!!err){
            console.warn(err);
        }else{
            dispatch({
                type: CONSTANTS.GOT_CLIENT,
                payload: client
            });
        }

        if(callback){
            callback(err, client); 
        }
    });
}

export function createNewClient(data, dispatch, callback) {
    post('/customer_service_manager/client', data, (err, response) => {
        if(!!err){
            console.warn(err);
        }

        callback(err, response); 
    });
}

export function updateClient(data, dispatch, callback){
    put('/customer_service_manager/client/' + data.id, data, (err, response) => {
        if(!!err){
            console.warn(err);
        }

        callback(err, response); 
    });
}

export function getClientProjectSum(id, dispatch){
    get('/customer_service_manager/client/'+id+'/project_sum', (err, sum) => {
        if(!!err){
            console.warn(err);
        }else{
            dispatch({
                type: CONSTANTS.GOT_CLIENT_PROJECT_SUM,
                payload: sum
            });
        }
    });
}
