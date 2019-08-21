import { request, authHeader } from "../_helper";

export const homeService = {
    getSubSubjectType,
    getCampusLink,
    getEventStatus,
    getSectionStatus
}

function getSubSubjectType() {
    return request.get("report/subSubjectType", authHeader.get());
}

function getCampusLink() {
    return request.get("report/campusLink", authHeader.get());
}

function getEventStatus() {
    return request.get("report/event-status", authHeader.get());
}

function getSectionStatus() {
    return request.get("report/section-status", authHeader.get());
}
