import { authenticateService } from '../_service';
import { cookies, router } from "../_helper";

export const authenticate = {
    namespaced: true,
    state: {
        login: {
            loading: false
        }
    },
    mutations: {
        authenticateRequest(state) {
            state.login = {
                loading: true
            }
        },
        authenticateSuccess(state) {
            state.login = {
                success: true
            }
        },
        authenticateFailure(state) {
            state.login = {
                success: false
            }
        },
        logout(state) {
            state.login = {
                loading: false
            }
        }
    },
    actions: {
        authenticate({ commit }, { username, password }) {
            commit("authenticateRequest");
            authenticateService.login(username, password).then(success => {
                // eslint-disable-next-line no-console
                // console.log(success.headers.map.authorization);
                if (success.ok) {
                    cookies.set("token", success.headers.map.authorization);
                    cookies.set("username", username);
                    commit("authenticateSuccess");
                    router.push("/");
                } else {
                    commit("authenticateFailure");
                }

            }, error => {
                commit("authenticateFailure");
                // eslint-disable-next-line no-console
                console.log(error);
            })
        },
        logout({ commit }) {
            commit("logout");
            cookies.remove("username");
            cookies.remove("token");
            router.push("/login");
        }
    }
}