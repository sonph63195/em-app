import { candidateService } from "../_service/candidate-service";
export const candidate = {
  namespaced: true,
  state: {
    candidates: [],
    candidate: {},
    getCandidate: { loading: false },
    getCandidateById: { loading: false }
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
    }
  }
}
