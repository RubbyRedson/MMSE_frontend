import { CONSTANTS } from './constants'
import {getData, saveData, delData} from './persistentStorage'

/**
* @author Victor Axelsson
* Get the http headers
*/
var getHeaders = function(){
  const jwt = getData('jwt'); 
  var headers = new Headers();
  headers.append('Authorization', 'Bearer ' + jwt); 
  headers.append('Accept', 'application/json'); 
  headers.append('Content-Type', 'application/json'); 
  return headers; 
}

/**
* @author Victor Axelsson
* performs a HTTP Get
*/
export function get(url, callback) {
    fetch(CONSTANTS.BASE_URL + url, {
        method: 'get',
        headers: getHeaders(), 
    }).then(function(response) {
        return response.json(); 
    }).then(function(json){
        callback(null, json);  
    }).catch(function(err) {
        callback(err, null); 
    });
}

/**
* @author Victor Axelsson
* performs a HTTP Put
*/
export function put(url, payload, callback) {
  fetch(CONSTANTS.BASE_URL + url, {
      method: 'put',
      headers: getHeaders(), 
      body: JSON.stringify(payload)
  }).then(function(response) {
      return response.json(); 
  }).then(function(json){
      callback(null, json);  
  }).catch(function(err) {
      callback(err, null); 
  });
}

/**
* @author Victor Axelsson
* performs a HTTP Post
*/
export function post(url, payload, callback) {
  fetch(CONSTANTS.BASE_URL + url, {
      method: 'post',
      headers: getHeaders(), 
      body: JSON.stringify(payload)
  }).then(function(response) {
      return response.json(); 
  }).then(function(json){
      callback(null, json);  
  }).catch(function(err) {
      callback(err, null); 
  });
}

/**
* @author Victor Axelsson
* performs a HTTP Delete
*/
export function del(url, callback) {
  fetch(CONSTANTS.BASE_URL + url, {
      method: 'del', // <- not 100% on this one, could be delete also
      headers: getHeaders(), 
  }).then(function(response) {
      return response.json(); 
  }).then(function(json){
      callback(null, json);  
  }).catch(function(err) {
      callback(err, null); 
  });
}
