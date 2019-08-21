import { candidateService } from "../_service/candidate-service";
export const candidate = {
  namespaced: true,
  state: {
    candidates: [],
    candidate: {},
    getCandidate: { loading: false },
    getCandidateById: { loading: false },
    updateCandidate: {
      state: { loading: false },
      data: []
    }
  },
  mutations: {
    getCandidateRequest(state) {
      state.getCandidate = { loading: true };
      state.candidates = [];
    },
    getCandidateSuccess(state, candidates) {
      state.getCandidate = { loaded: true };
      state.candidates = candidates;
    },
    getCandidateFailure(state) {
      state.getCandidate = { loaded: false };
    },
    getCandidateByIdRequest(state) {
      state.getCandidateById = { loading: true }
    },
    getCandidateByIdSuccess(state, candidate) {
      state.getCandidateById = { loaded: true }
      state.candidate = candidate;
    },
    getCandidateByIdFailure(state) {
      state.getCandidateById = { loaded: false }
    },
    updateCandidateRequest(state) {
      state.updateCandidate = {
        state: { loading: true }
      }
    },
    updateCandidateSuccess(state, data) {
      state.updateCandidate = {
        state: { success: true },
        data: data
      }
    },
    updateCandidateFailure(state, error) {
      state.updateCandidate = {
        state: { success: false },
        data: error
      }
    }
  },
  actions: {
    getCandidate({ commit }, pageNumber) {
      commit("getCandidateRequest");
      candidateService.getCandidateList(pageNumber).then(success => {
        let candidates = success.body;
        commit("getCandidateSuccess", candidates);
      }, error => {
        commit("getCandidateFailure");
        // eslint-disable-next-line no-console
        console.error(error);
      })
    },
    getCandidateById({ commit }, candidateId) {
      commit("getCandidateByIdRequest");
      candidateService.getCandidateById(candidateId).then(
        success => {
          commit("getCandidateByIdSuccess", success.body);
        }, error => {
          commit("getCandidateByIdFailure");
          // eslint-disable-next-line no-console
          console.error(error);
        }
      )
    },
    updateCandidateInfo({ commit }, { candidate }) {
      commit("updateCandidateRequest")
      candidateService.updateCandidateInfo(candidate).then(success => {
        if (success.body.status === "200") {
          commit("updateCandidateSuccess", success.body)
        } else {
          commit("updateCandidateFailure", success.body)
        }
      }, error => {
        commit("updateCandidateFailure", error.body)
      })
    }
  }
}
