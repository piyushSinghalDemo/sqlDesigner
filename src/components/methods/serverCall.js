'use strict'
import config from '../../config.json'
import { debug } from 'util';

export function get(that, endPoint) {
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    let authorization = userData.accessToken;
    let headerData = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    }
    return new Promise(function(resolve, reject) {
        that.$http.get(endPoint, { headers: headerData }).then(response => {
            return resolve(response.body)
        }, response => {
            return reject(response.body)
                // if (response.message) {
                //     _this.$toaster.error(response.message);
                // }
        })
    })
}

export function post(that, endPoint, InputJson) {
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    let authorization = userData.accessToken;
    let headerData = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
    }
    return new Promise(function(resolve, reject) {
        that.$http.post(endPoint, InputJson, { headers: headerData }, ).then(response => {
            return resolve(response.body)
        }, response => {
            return reject(response.body)
                // if (response.body.message) {
                //     _this.$toaster.error(response.body.message);
                // }
        })
    })
}