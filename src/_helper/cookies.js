import Vue from "vue";
import Cookies from "vue-cookies";

Vue.use(Cookies);

// set default config
Cookies.config('7d')

export const cookies = {
    set,
    get,
    isKey,
    remove
}

function set(keyName, value) {
    return Cookies.set(keyName, value)
}

function get(keyName) {
    return Cookies.get(keyName);
}

function isKey(keyName) {
    return Cookies.isKey(keyName);
}

function remove(keyName) {
    return Cookies.remove(keyName);
}
