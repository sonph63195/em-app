import { request } from "../_helper";

export const subjectService = {
    getSubjectTypeList,
    getSubSubjectTypeList
}

function getSubjectTypeList() {
    return request.get("subjectType");
}

function getSubSubjectTypeList() {
    return request.get("skills");
}
