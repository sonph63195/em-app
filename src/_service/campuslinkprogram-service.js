import { request } from "../_helper";

export const campuslinkProgramService = {
  getCampuslinkList
};

function getCampuslinkList() {
  return request.get("programs");
}
