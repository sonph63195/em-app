import { request } from "../_helper";

export const homeService = {
    getSubSubjectType,
    getCampusLink,
    getEventStatus,
    getSectionStatus
}

function getSubSubjectType() {
    return request.get("report/subSubjectType");
}

function getCampusLink() {
    return request.get("report/campusLink");
}

function getEventStatus() {
    return request.get("report/event-status");
}

function getSectionStatus() {
    return request.get("report/section-status");
}
