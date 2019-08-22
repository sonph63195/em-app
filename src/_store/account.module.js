import {accountService} from "../_service"

export const account = {
    namespaced: true,
    state: {
        accounts: [],
        account: {},
        getAllAccount: { loading: false },
        getMyAccount: { loading: false },
        updateRoles: { updating: false },
        saveAccount: {
            state: { loading: false },
            data: {}},
        updateAccount: { updating: false },
        disableAccount: { updating: false },
        enableAccount: { updating: false },
    },
    mutations: {
        getAllAccountRequest(state) {
            state.getAllAccount = { loading: true };
            state.accounts = [];
        },
        getAllAccountSuccess(state, accounts) {
            state.getAllAccount = { loaded: true, accounts: accounts };
        },
        getAllAccountFailure(state) {
            state.getAllAccount = { loaded: false };
        },
        getMyAccountRequest(state) {
            state.getMyAccount = { loading: true }
        },
        getMyAccountSuccess(state, account) {
            state.getMyAccount = { loaded: true }
            state.account = account;
        },
        getMyAccountFailure(state) {
            state.getMyAccount = { loaded: false }
        },
        /**
         * 
         * @param {*} state 
         */
        updateAccountRequest(state) {
            state.updateAccount = { updating: true }
        },
        updateAccountSuccess(state, account) {
            state.updateAccount = { updated: true, account: account };
            
        },
        updateAccountFailure(state) {
            state.updateAccount = { updated: false }
        },
        /**
         * 
         * @param {*} state 
         */
        disableAccountRequest(state) {
            state.disableAccount = { updating: true }
        },
        disableAccountSuccess(state, account) {
            state.disableAccount = { updated: true, account: account };

        },
        disableAccountFailure(state) {
            state.disableAccount = { updated: false }
        },
        /**
         * 
         * @param {*} state 
         */
        enableAccountRequest(state) {
            state.enableAccount = { updating: true }
        },
        enableAccountSuccess(state, account) {
            state.enableAccount = { updated: true, account: account };

        },
        enableAccountFailure(state) {
            state.enableAccount = { updated: false }
        },
        saveAccountRequest(state) {
            state.saveAccount = {
                state: { loading: true }
            }
        },
        saveAccountSuccess(state, data) {
            state.saveAccount = {
                state: { success: true, data: data },
                data: data
            }
        },
        saveAccountFailure(state, error) {
            state.saveAccount = {
                state: { success: false },
                data: error
            }
        }

        
    },
    actions: {
        getAllAccount({ commit }) {
            commit("getAllAccountRequest");
            accountService.getAllAccount().then(success => {
                let accounts = success.body;
                commit("getAllAccountSuccess", accounts);
            }, error => {
                commit("getAllAccountFailure");
                // eslint-disable-next-line no-console
                console.error(error);
            })
        },
        getMyAccount({ commit }, username) {
            commit("getMyAccountRequest");
            accountService.getMyAccount(username).then(
                success => {
                    commit("getMyAccountSuccess", success.body);
                }, error => {
                    commit("getMyAccountFailure");
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            )
        },
        updateAccount({ commit }, account) {
            commit("updateAccountRequest");
            accountService.updateAccount(account).then(success => {
                commit("updateAccountSuccess", success.body);
            }, error => {
                    commit("updateAccountFailure", error.status);
                // eslint-disable-next-line no-console
                console.error(error);
            })
        },
        disableAccount({ commit }, account) {
            commit("disableAccountRequest");
            accountService.disableAccount(account).then(success => {
                commit("disableAccountSuccess", success.body);
            }, error => {
                    commit("disableAccountFailure", error.status);
                // eslint-disable-next-line no-console
                console.error(error);
            })
        },
        enableAccount({ commit }, account) {
            commit("enableAccountRequest");
            accountService.enableAccount(account).then(success => {
                commit("enableAccountSuccess", success.body);
            }, error => {
                    commit("enableAccountFailure", error.status);
                // eslint-disable-next-line no-console
                console.error(error);
            })
        },
        
        saveAccount({ commit }, { account }) {
            commit("saveAccountRequest");
            accountService.saveAccount(account).then(success => {
                if (success.body.status === 200) {
                    commit("saveAccountSuccess", success.body);
                } else {
                    commit("saveAccountFailure", success.body);
                }
            }, error => {
                    commit("saveAccountFailure", error);
                // eslint-disable-next-line no-console
                console.log(error);
            })
        }
    }
}