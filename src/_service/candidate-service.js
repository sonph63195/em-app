import { request } from "../_helper"

export const candidateService = {
    getCandidateList,
    getCandidateById
}

/**
 * 
 * @param {*} pageNumber 
 */
function getCandidateList(pageNumber) {
    return request.get(`candidates/${pageNumber}`);
}

/**
 * 
 * @param {*} candidateId
 */
function getCandidateById(candidateId) {
    return request.get(`candidate?candidateId=${candidateId}`);
}