import XLSX from "xlsx";
import { fileService } from '../_service'

export const file = {
    namespaced: true,
    state: {
        status: { reading: false },
        workbook: {},
        data: [],
    },
    mutations: {
        readingFile(state) {
            state.status.reading = true;
        },
        readFileSuccess(state, workbook) {
            state.status = { read: false }
            state.workbook = workbook;
        },
        removeFile(state) {
            state.status.reading = false;
            state.workbook = {};
        },
        convertJsonSuccess(state, data) {
            state.data = data;
        }
    },
    actions: {
        readingFile({ commit }, file) {
            let workbook = {};
            let reader = new FileReader();
            reader.onloadstart = () => {
                commit('readingFile');
            }
            reader.onload = (event) => {
                let data = event.target.result;
                let bytes = new Uint8Array(data);
                let binary = '';
                for (var i = 0; i < bytes.length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                workbook = XLSX.read(binary, { type: "binary" });
                commit('readFileSuccess', workbook);
            }
            reader.readAsArrayBuffer(file);

        },
        removeFile({ commit }) {
            commit('removeFile')
        },
        convertJson({ commit }, worksheet) {
            fileService.convertJson(worksheet).then(data => {
                commit('convertJsonSuccess', data);
            })
        }
    }
}