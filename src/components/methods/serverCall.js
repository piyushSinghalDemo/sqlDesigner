'use strict'
import config from '../../config.json'

export function get(that, endPoint) {
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    let authorization = userData.accessToken[0];
    let headerData = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    }
    return new Promise(function(resolve, reject) {
        that.$http.get(endPoint, { headers: headerData }).then(response => {
            return resolve(response.body)
        })
    })
}

export function post(that, endPoint, InputJson) {
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    let authorization = userData.accessToken[0];

    let headerData = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    }
    return new Promise(function(resolve, reject) {
        that.$http.post(endPoint, InputJson, { headers: headerData }, ).then(response => {
            return resolve(response.body)
        })
    })
}