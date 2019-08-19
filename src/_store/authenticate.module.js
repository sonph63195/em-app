import { authenticateService } from '../_service';

export const authenticate = {
    namespaced: true,
    state: {
        login: {
            loading: false,
            token: null
        }
    },
    mutations: {
        authenticateRequest(state) {
            state.login = {
                loading: true
            }
        },
        authenticateSuccess(state, token) {
            state.login = {
                success: true,
                token: token
            }
        },
        authenticateFailure(state) {
            state.login = {
                success: false
            }
        }
    },
    actions: {
        authenticate({ commit }, { username, password }) {
            commit("authenticateRequest");
            authenticateService.login(username, password).then(success => {
                commit("authenticateSuccess", success);
                // eslint-disable-next-line no-console
                console.log(success);
                // eslint-disable-next-line no-console
                console.log(success.headers.getAll());

            }, error => {
                // eslint-disable-next-line no-console
                console.log(error);
            })
        }
    }
}