import { request } from "../_helper";

export const sectionService = {
    loadSection,
}

/**
 * 
 * @param {int} evenrId 
 * @param {int} paginate 
 */
function loadSection(eventId, paginate) {
    return request.get(`sections/${paginate}?eventId=${eventId}`);
}