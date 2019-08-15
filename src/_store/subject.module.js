import { subjectService } from "../_service"

export const subject = {
    namespaced: true,
    state: {
        getSubSubject: {
            state: { loading: false },
            data: []
        }
    },
    mutations: {
        getSubSubjectRequest(state) {
            state.getSubSubject = {
                state: { loading: true }
            }
        },
        getSubSubjectSuccess(state, subSubject) {
            state.getSubSubject = {
                state: { loaded: true },
                data: subSubject
            }
        },
        getSubSubjectFailure(state, error) {
            state.getSubSubject = {
                state: { loaded: false },
                data: error
            }
        }
    },
    actions: {
        getSubSubject({ commit }) {
            commit("getSubSubjectRequest");
            subjectService.getSubSubjectTypeList().then(success => {
                commit("getSubSubjectSuccess", success.body);
            }, error => {
                commit("getSubSubjectFailure", error);
            })
        }
    }
}