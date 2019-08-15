import { sectionService } from "../_service";

export const section = {
    namespaced: true,
    state: {
        loadSection: { loading: false },
        candidates: []
    },
    mutations: {
        /**
         * 
         * @param {*} state 
         */
        loadSectionRequest(state) {
            state.loadSection = { loading: true }
        },

        /**
         * 
         * @param {*} state 
         * @param {Array} candidates 
         */
        loadSectionSuccess(state, candidates) {
            state.loadSection = { loaded: true };
            state.candidates = candidates;
        },

        /**
         * 
         * @param {*} state 
         */
        loadSectionFailure(state) {
            state.loadSection = { loaded: false };
            state.candidates = [];
        }
    },
    actions: {
        loadSection({ commit }, { eventId, paginate }) {
            commit("loadSectionRequest");
            sectionService.loadSection(eventId, paginate).then(success => {
                commit("loadSectionSuccess", success.body);
            }, error => {
                commit("loadSectionFailure");
                // eslint-disable-next-line
                console.log(error);
            });
        }
    }
}