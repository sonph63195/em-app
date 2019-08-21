import { facultyService } from "../_service"

export const faculty = {
    namespaced: true,
    state: {
        getFaculty: {
            state: { loading: false },
            data: []
        }
    },
    mutations: {
        getFacultyRequest(state) {
            state.getFaculty = {
                state: { loading: true }
            }
        },
        getFacultySuccess(state, data) {
            state.getFaculty = {
                state: { loaded: true },
                data: data
            }
        },
        getFacultyFailure(state, error) {
            state.getFaculty = {
                state: { loaded: false },
                data: error
            }
        }
    },
    actions: {
        getFaculty({ commit }) {
            commit("getFacultyRequest");
            facultyService.faculties().then(success => {
                commit("getFacultySuccess", success.body);
            }, error => {
                commit("getFacultyFailure", error.body);
            })
        }
    }
}