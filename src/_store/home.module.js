import { homeService } from "../_service";

export const home = {
    namespaced: true,
    state: {
        subSubjectType: {
            state: { loading: false },
            data: {}
        },
        campusLink: {
            state: { loading: false },
            data: {}
        },
        eventStatus: {
            state: { loading: false },
            data: {}
        },
        sectionStatus: {
            state: { loading: false },
            data: {}
        }
    },
    mutations: {
        subSubjectTypeRequest(state) {
            state.subSubjectType = {
                state: { loading: true }
            }
        },
        subSubjectTypeSuccess(state, subSubjectType) {
            state.subSubjectType = {
                state: { loaded: true },
                data: subSubjectType
            }
        },
        subSubjectTypeFailure(state) {
            state.subSubjectType = {
                state: { loaded: false }
            }
        },
        campusLinkRequest(state) {
            state.campusLink = {
                state: { loading: true }
            }
        },
        campusLinkSuccess(state, campusLink) {
            state.campusLink = {
                state: { loaded: true },
                data: campusLink
            }
        },
        campusLinkFailure(state) {
            state.campusLink = {
                state: { loaded: false }
            }
        },
        eventStatusRequest(state) {
            state.eventStatus = {
                state: { loading: true }
            }
        },
        eventStatusSuccess(state, eventStatus) {
            state.eventStatus = {
                state: { loaded: true },
                data: eventStatus
            }
        },
        eventStatusFailure(state) {
            state.eventStatus = {
                state: { loaded: false }
            }
        },
        sectionStatusRequest(state) {
            state.sectionStatus = {
                state: { loading: true }
            }
        },
        sectionStatusSuccess(state, sectionStatus) {
            state.sectionStatus = {
                state: { loaded: true },
                data: sectionStatus
            }
        },
        sectionStatusFailure(state) {
            state.sectionStatus = {
                state: { loaded: false }
            }
        }
    },
    actions: {
        getSubSubjectType({ commit }) {
            commit("subSubjectTypeRequest");
            homeService.getSubSubjectType().then(success => {
                commit("subSubjectTypeSuccess", success.body);
            }, () => {
                commit("subSubjectTypeFailure");
            })
        },
        getCampusLink({ commit }) {
            commit("campusLinkRequest");
            homeService.getCampusLink().then(success => {
                commit("campusLinkSuccess", success.body);
            }, () => {
                commit("campusLinkFailure");
            })
        },
        getEventStatus({ commit }) {
            commit("eventStatusRequest");
            homeService.getEventStatus().then(success => {
                commit("eventStatusSuccess", success.body);
            }, () => {
                commit("eventStatusFailure");
            })
        },
        getSectionStatus({ commit }) {
            commit("sectionStatusRequest");
            homeService.getSectionStatus().then(success => {
                commit("sectionStatusSuccess", success.body);
            }, () => {
                commit("sectionStatusFailure");
            })
        }
    }
}