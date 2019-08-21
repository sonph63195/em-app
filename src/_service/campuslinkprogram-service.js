import { request, authHeader } from "../_helper";

export const campuslinkProgramService = {
  getCampuslinkList
};

function getCampuslinkList() {
  return request.get("programs", authHeader.get());
}
