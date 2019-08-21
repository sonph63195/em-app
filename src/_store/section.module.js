import { sectionService } from "../_service";

export const section = {
  namespaced: true,
  state: {
    loadSection: { loading: false },
    candidates: [],
    updateSection: {
      state: { loading: false },
      data: []
    }
  },
  mutations: {
    /**
     *
     * @param {*} state
     */
    loadSectionRequest(state) {
      state.loadSection = { loading: true };
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
    },

    updateSectionRequest(state) {
      state.updateSection = {
        state: { loading: true }
      }
    },
    updateSectionSuccess(state, data) {
      state.updateSection = {
        state: { success: true },
        data: data
      }
    },
    updateSectionFailure(state, error) {
      state.updateSection = {
        state: { success: false },
        data: error
      }
    }
  },
  actions: {
    loadSection({ commit }, body) {
      const { eventId, page } = body;
      commit("loadSectionRequest");
      sectionService.loadSection(eventId, page).then(
        success => {
          commit("loadSectionSuccess", success.body);
        },
        error => {
          commit("loadSectionFailure");
          // eslint-disable-next-line
          console.log(error);
        }
      );
    },
    updateSection({ commit }, section) {
      commit("updateSectionRequest");
      sectionService.updateSectionInfo(section).then(success => {
        commit("updateSectionSuccess", success.body);
      }, error => {
        commit("updateSectionFailure", error.body);
      })
    }
  }
};
