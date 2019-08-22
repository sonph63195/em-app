import { request, authHeader } from "../_helper";

export const sectionService = {
    loadSection,
    loadCandidates,
    updateSectionInfo,
    saveCandidateOfEventFromManual,
    cancelSections
}

/**
 * 
 * @param {int} evenrId 
 * @param {int} paginate 
 */
function loadSection(eventId, paginate) {
    return request.get(`candidates/${paginate}?eventId=${eventId}`, authHeader.get());
}
/**
 * @param {int} paginate
 */
function loadCandidates(paginate) {
    return request.get(`sections/${paginate}`);
}

function updateSectionInfo(section) {
    return request.put(`sections`, section, authHeader.get());
}

function saveCandidateOfEventFromManual(candidate) {
    return request.post(`section`, candidate, authHeader.get());
}

function cancelSections(sections) {
    let url = "";
    sections.forEach(id => {
        if (id !== null) {
            url += `sectionId=${id}&`
        }
    });
    return request.put(`section?${url}`, null, authHeader.get());
}
