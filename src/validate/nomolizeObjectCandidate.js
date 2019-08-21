const mapProperties = [
  ['A', 'nationalId'],//national id
  ['B', 'account'],//account
  ['C', 'name'],//name
  ['D', 'universityName'],//university
  ['E', 'facultyCode'],//faculty
  ['F', 'dob'],//dob
  ['G', 'gender'],//gender
  ['H', 'email'],//email
  ['I', 'phone'],//phone
  ['J', 'facebook'],//facebook
  ['K', 'universityGraduationDate'],//university graduation date
  ['L', 'fullTimeWorking'],//full-time working available
  ['N', 'courseCode'],//course code
  ['U', 'status'],//status
  ['V', 'finalGrade'],//final grade
  ['W', 'completionLevel'],//completion level
  ['X', 'certificateId'],//certificate id
  //['Y', ''],//updated by
  //['Z', ''],//updated date
  ['AA', 'note'],//note
  ['AF', 'contractType'],//1st contract type
  ['AN', 'gpa'],//gpa
]
export function mapCandidateProperties(candidate) {
  const map = new Map(mapProperties)
  let newCandidate = {}
  const keys = Object.keys(candidate)
  for (const key of keys) {
    const variable = map.get(key)
    if (variable) {
      newCandidate[variable] = candidate[key]
    }
  }
  return newCandidate
}

const listCandidate = require(__dirname + '/candidate/candidate.json')
listCandidate.forEach(candidate => {
  const c = mapCandidateProperties(candidate)
  console.log(c)
  
});