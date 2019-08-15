import { supplierService } from "../_service";

export const supplier = {
    namespaced: true,
    state: {
        getSupplier: {
            state: { loading: false },
            data: []
        }
    },
    mutations: {
        getSupplierRequest(state) {
            state.getSupplier = {
                state: { loading: true }
            }
        },
        getSupplierSuccess(state, supplier) {
            state.getSupplier = {
                state: { loaded: true },
                data: supplier
            }
        },
        getSupplierFailure(state, error) {
            state.getSupplier = {
                state: { loaded: false },
                data: error
            }
        }
    },
    actions: {
        getSupplier({ commit }) {
            commit("getSupplierRequest");
            supplierService.getSupplierList().then(success => {
                commit("getSupplierSuccess", success.body);
            }, error => {
                commit("getSupplierFailure", error);
            })
        }
    }
}