import { validateCandidate } from './candidate/index';
const listCandidate = require(__dirname + '/candidate/candidate.json')
import { getListEvent, makeListCourseCode } from './event/index';
import { param } from './param';
import { writeFileSync } from 'fs';
(async () => {
  const parameter = await param()
  const listUniversityName = parameter.listUniversity.map(university => university.universityName);
  const listFaculty = ['ICT', 'MAT', 'SET', 'ICT-CE']
  const listStatus = ['Active', 'Cancel', 'Done', 'Drop - Out', 'Failed', 'Passed'];
  const listCourseCode = makeListCourseCode(getListEvent(false, true), parameter.listUniversity, parameter.listCampusLinkProgram)
  const injectContext = {
    listUniversityName,
    listFaculty,
    listStatus,
    listCourseCode
  }
  const context = {
    convert: false,
    presence: 'required',
    stripUnknown: true,
    abortEarly: false,
    context: injectContext,
  }

  listCandidate.forEach((candidate) => {
    validateCandidate(candidate, context, (err, value) => {
      if (err) {
        writeFileSync('error.json', err.annotate() + '\r\n', { flag: 'a+' })
      } else {
        writeFileSync('result.json', JSON.stringify(value), { flag: 'a+', encoding: 'utf8' })
        console.log(value);
      }
    });

  });
})();