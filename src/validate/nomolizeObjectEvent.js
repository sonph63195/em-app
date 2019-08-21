const mapEventProperties = [
  //['A', ''],//site
  ['C', 'courseCode'],//course name
  ['B', 'courseCode'],//course code
  ['D', 'subjectType'],//subject type
  ['E', 'subSubjectType'],//sub-subject type
  ['F', 'formatType'],//format type
  ['G', 'supplier'],//supplier/partner
  ['H', 'plannedStartDate'],//planned start date
  ['I', 'plannedEndDate'],//planned end date
  //['J', ''],//planned learning time
  //['K', ''],//planned number of student
  //['L', ''],//planned expense
  ['M', 'budgetCode'],//budget code
  ['N', 'actualStartDate'],//actual start date
  ['O', 'actualEndDate'],//actual end date
  ['P', 'actualLearningTime'],//acutal learning time
  //['Q', ''],//actual number of trainee
  //['R', ''],//number of enrolled students
  //['S', ''],//number of certified student
  ['T', 'actualExpense'],//actual expense
  ['U', 'trainingFeedback'],//trainning feedback
  ['V', 'trainingFeedbackContent'],//trainning feedback content
  ['W', 'trainingFeedbackTeacher'],//trainning feedback teacher
  ['X', 'trainingFeedbackOrganization'],//trainning feedback organization
  ['Y', 'updatedBy'],//updated by
  ['Z', 'updatedDate'],//updated date
  ['AA', 'note'],//note
  //['AB', ''],//start date
  //['AC', ''],//end date
  //['AD', ''],//hours
  //['AE', ''],//student
  //['AF', ''],//vnd
  ['AG', 'eventStatus'],//course status
  //['AH', ''],//start year
  //['AI', ''],//start month
  //['AJ', ''],//end year
  //['AK', ''],//end month
  //['AL', ''],//student list check
]
export function mapCandidateProperties(event) {
  const map = new Map(mapEventProperties)
  let newEvent = {}
  const keys = Object.keys(event)
  
  for (let key of keys) {
    const variable = map.get(key)
    if (variable) {
      newEvent[variable] = event[key]
    }
  }
  return newEvent
}
const eventList = require('./event/event.json')
console.log(eventList)

eventList.forEach(event => {
  const e = mapCandidateProperties(event)
  console.log(e);
  
});