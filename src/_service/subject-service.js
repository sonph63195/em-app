import { request, authHeader } from "../_helper";

export const subjectService = {
    getSubjectTypeList,
    getSubSubjectTypeList
}

function getSubjectTypeList() {
    return request.get("subjectType", authHeader.get());
}

function getSubSubjectTypeList() {
    return request.get("skills", authHeader.get());
}
