const joi = require('./event/index');
const { param } = require('./param')
const { makeListCourseCode } = require('./event/index')

async function validate() {
  const eventList = require('./event/event.json');
  const parameter = await param()
  const injectContext = {
    listNameUniversity: parameter.listUniversity.map(uni => uni.universityName),
    courseCode: 'code',
    listCampuslinkProgram: parameter.listCampusLinkProgram.map(pro => pro.name),
    listFormatType: ['Blended', 'Offline'],
    listSubSubjectType: ['NET', 'TEST', 'JAVA', 'IOS', 'ANDROID', 'Đề tài tốt nghiệp', 'AI & ML', 'EMBED', 'ALL'],
    listSubjectType: ['IT Technical'],
    listSite: ['HCM', 'HN'],
    courseCode: makeListCourseCode(eventList, parameter.listUniversity, parameter.listCampusLinkProgram),
  }

  const context = {
    convert: true,
    presence: 'required',
    stripUnknown: true,
    abortEarly: false,
    context: injectContext,

  }
  eventList.forEach((event) => {
    joi.validateEvent(event, context, (err, val) => {
      if (err) console.log(err.annotate());
      console.log(val)
    })
  })

}
(async () => {
  await validate();
})();
