import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
const joi = joiBase.extend(joiDate);

import { makeEventSchema } from './schema';
import { readFileSync } from 'fs';
import { readEventFromExcel } from './eventReader';
const eventFromJson = Array.from(JSON.parse(readFileSync(__dirname + '/event.json')))

export function validateEvent(event, context, callback) {
  const schemaEvent = makeEventSchema(joi);
  joi.validate(event, schemaEvent, context, callback);
}

export function getListEvent(fromExcel, fromJson) {
  if (fromExcel) {
    readEventFromExcel();
    return eventFromJson;
  } else if (fromJson) {
    return eventFromJson;
  }

}
export function makeListCourseCode(listEvent, listUniversity, listCampusLinkProgram) {
  let count = 1;
  return listEvent.map((event) => makeCourseCode(event, listUniversity, listCampusLinkProgram, count++));
}
const makeCourseCode = (event, listUniversity, listCampusLinkProgram, count) => {
  let s = ''
  s.i
  function getSchoolCode(schoolName) {
    return (listUniversity.find(school => schoolName.includes(school.universityName))).universityCode;
  }

  function getCampusLinkCode(name) {
    return listCampusLinkProgram.find((p) => p.name === name).code;
  }
  function pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  function ressembleCourseCode(event) {
    const schoolCode = getSchoolCode(event.G);
    const campuslinkCode = getCampusLinkCode(event.C);
    const subsubjecttype = event.E;
    const site = event.A;
    const year = (event.AH + '').substring(2, 4);
    const order = pad(count, 3);
    return schoolCode + '_' + campuslinkCode + '_' + subsubjecttype + '_' + site + year + '_' + order;
  }
  return ressembleCourseCode(event);
}

