import Vue from "vue";
import VueResource from "vue-resource";

import { serverApis } from "./server-apis"

Vue.use(VueResource);

// config
//Vue.http.options.xhr = { withCredentials: true };
// Vue.http.options.emulateJSON = true

// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';

const URL = serverApis.url;

export const request = {
    get,
    getDelete,
    post,
    put,
    patch
}

function get(url, config = null) {
    return Vue.http.get(`${URL}${url}`, config);
}

function getDelete(url, config = null) {
    return Vue.http.delete(`${URL}${url}`, config);
}

function post(url, body = null, config = null) {
    return Vue.http.post(`${URL}${url}`, body, config);
}

function put(url, body = null, config) {
    return Vue.http.put(`${URL}${url}`, body, config);
}

function patch(url, body = null, config) {
    return Vue.http.patch(`${URL}${url}`, body, config);
}


/*

get(url, [config])
head(url, [config])
delete(url, [config])
jsonp(url, [config])
post(url, [body], [config])
put(url, [body], [config])
patch(url, [body], [config])

*/