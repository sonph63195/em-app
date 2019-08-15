import { campuslinkProgramService } from "../_service"

export const campuslink = {
    namespaced: true,
    state: {
        getCampuslink: {
            state: { loading: false },
            data: []
        }
    },
    mutations: {
        getCampuslinkRequest(state) {
            state.getCampuslink = {
                state: { loading: true }
            }
        },
        getCampuslinkSuccess(state, campuslink) {
            state.getCampuslink = {
                state: { loaded: true },
                data: campuslink
            }
        },
        getCampuslinkFailure(state, error) {
            state.getCampuslink = {
                state: { loaded: false },
                data: error
            }
        }
    },
    actions: {
        getCampuslink({ commit }) {
            commit("getCampuslinkRequest");
            campuslinkProgramService.getCampuslinkList().then(success => {
                commit("getCampuslinkSuccess", success.body);
            }, error => {
                commit("getCampuslinkFailure", error);
            })
        }
    }
}