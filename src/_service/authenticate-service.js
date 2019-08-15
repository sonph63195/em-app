import { request } from "../_helper"

export const authenticateService = {
    login
}

function login(username, password) {
    const body = `${username}&${password}`
    return request.post(`authenticate`, body);
}