import { request, authHeader } from "../_helper"

export const accountService = {
    getAllAccount,
    getMyAccount,
    updateRoles,
    saveAccount,
    updateAccount,
    disableAccount,
    enableAccount

}

/**
     * get all accounts
     *
     * @return Set all accounts
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
/**
     * @param authorities the array account's authority ids.
     * @param username      the username.
     * @return Updated account if add success, otherwise return null.
     */
function updateRoles(username) {
    return request.patch('update-roles', username, authHeader.get());
}
/**
     * Add a new account to system.
     *
     * @param account the new account
     * @return Added account if add success, otherwise return null.
     */
function saveAccount(account) {
    return request.post('account', account, authHeader.get());
}
/**
    * Update the new account.
    *
    * @param account the updated account.
    * @return Updated account if add success, otherwise return null.
    */
function updateAccount(account) {
    return request.patch('account', account, authHeader.get());
}
/**
     * Disable an account.
     *
     * @param username the account's username.
     * @return Disabled account if add success, otherwise return null.
     */
function disableAccount(username) {
    return request.patch(`account/disable/${username}`,authHeader.get());
}
/**
    * Enable an account
    *
    * @param username the account's username
    * @return Enabled account if add success, otherwise return null.
    */
function enableAccount(username) {
    return request.patch(`account/enable/${username}`, authHeader.get());
}