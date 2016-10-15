import {CONSTANTS} from './constants'
import {getData, saveData, delData} from './persistentStorage'
import $ from "jquery"

/**
 * @author Victor Axelsson
 * Get the http headers
 */
var getHeaders = function () {
    var usr = getData('user');
    var token = null;
    if (usr) {
        usr = JSON.parse(usr);
        token = usr.token;
    }
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
}

function buildRequest(option, method, data) {
    let request = {
        url: CONSTANTS.BASE_URL + option,
        method: method,
        data: JSON.stringify(data),
        headers: getHeaders()
    }
    return request
}

/**
 * @author Victor Axelsson
 * performs a HTTP Get
 */
export function get(url, callback) {
    $.ajax(buildRequest(url, 'GET')).then((res) => {
        callback(null, res);
    }).fail(((err) => {
        callback(err, null);
    }));
}

/**
 * @author Victor Axelsson
 * performs a HTTP Put
 */
export function put(url, payload, callback) {
    $.ajax(buildRequest(url, 'PUT', payload)).then((res) => {
        callback(null, res);
    }).fail(((err) => {
        callback(err, null);
    }));
}

/**
 * @author Victor Axelsson
 * performs a HTTP Post
 */
export function post(url, payload, callback) {
    $.ajax(buildRequest(url, 'POST', payload)).then((res) => {
        callback(null, res);
    }).fail(((err) => {
        callback(err, null);
    }));
}

/**
 * @author Victor Axelsson
 * performs a HTTP Delete
 */
export function del(url, callback) {
    $.ajax(buildRequest(url, 'DEL')).then((res) => {
        callback(null, res);
    }).fail(((err) => {
        callback(err, null);
    }));
}
