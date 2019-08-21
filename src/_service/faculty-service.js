import { request, authHeader } from '../_helper';

export const facultyService = {
    faculties
}

function faculties() {
    return request.get(`faculties`, authHeader.get())
}
