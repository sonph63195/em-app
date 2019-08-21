import {accountService} from "../_service"

export const account = {
    namespaced: true,
    state: {
        accounts: [],
        account: {},
        getAllAccount: { loading: false },
        getMyAccount: { loading: false }
    },
    mutations: {
        getAllAccountRequest(state) {
            state.getAllAccount = { loading: true };
            state.accounts = [];
        },
        getAllAccountSuccess(state, accounts) {
            state.getAllAccount = { loaded: true };
            state.accounts = accounts;
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
        }
    }
}