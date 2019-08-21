import { request, authHeader } from "../_helper";

export const sectionService = {
    loadSection,
    loadCandidates,
    updateSectionInfo
}

/**
 * 
 * @param {int} evenrId 
 * @param {int} paginate 
 */
function loadSection(eventId, paginate) {
    return request.get(`sections/${paginate}?eventId=${eventId}`, authHeader.get());
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
