import { request } from "../_helper"

export const candidateService = {
    getCandidateList,
    getCandidateById,
    updateCandidateInfo
}

/**
 * 
 * @param {*} pageNumber 
 */
function getCandidateList(pageNumber) {
    return request.get(`sections/${pageNumber}`);
}

/**
 * 
 * @param {*} candidateId
 */
function getCandidateById(candidateId) {
    return request.get(`candidate?candidateId=${candidateId}`);
}

function updateCandidateInfo(candidate) {
    return request.put(`candidates`, candidate);
}