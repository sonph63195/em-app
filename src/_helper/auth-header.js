import { cookies } from './cookies';

const loggedIn = cookies.isKey("token");

export const authHeader = {
    get
}

function get() {
    let result = "";
    if (loggedIn) {
        const token = cookies.get("token");
        result = { Authorization: "Bearer " + token }
    }
    return result;
}