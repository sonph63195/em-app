import { request, authHeader } from "../_helper"

export const accountService = {
    getAllAccount,
    getMyAccount
}

/**
 * 
 * 
 */
function getAllAccount() {
    return request.get("account", authHeader.get());
}
/**
 * 
 * @param {*} username
 */
function getMyAccount(username) {
    return request.get(`account?username=${username}`, authHeader.get());
}