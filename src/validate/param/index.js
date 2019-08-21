import { readSchoolFromJson, readSchoolFromExcel } from '../school';
import { default as axios } from 'axios';
let listUniversity;
try {
  listUniversity = readSchoolFromJson(false);
} catch (error) {
  console.error(error);
}
const listCampusLinkProgram = [
  {
    code: 'GST',
    name: 'Global Software Talent',
    learningTime: '360'
  },
  {
    code: 'THESIS',
    name: 'THESIS',
    learningTime: '0'
  },
  {
    name: 'GST LITE',
    code: 'LITE',
    learningTime: '320'
  },
  {
    name: 'INTERNSHIP',
    code: 'INTE',
    learningTime: '320'
  },
  {
    name: 'SEMINAR',
    code: 'SEMI',
    learningTime: '4'
  },
  {
    name: 'JOBFAIR',
    code: 'JOB',
    learningTime: '0'
  },
  {
    name: 'FSOFT TOUR',
    code: 'FTOUR',
    learningTime: '3'
  },
  {
    name: 'Contest Sponsor',
    code: 'CSR',
    learningTime: '0'
  },
  {
    name: 'REC',
    code: 'REC',
    learningTime: '0'
  },
  {
    code: 'ONLINE',
    name: 'ONLINE',
    learningTime: '0'
  },
];
async function getData() {
  let listUniversity = await axios.get('https://em321.herokuapp.com/universities')
    .then(res => res.data)
    .catch(error => console.log(error));

  let listCampusLinkProgram = await axios.get('https://em321.herokuapp.com/programs')
    .then(res => res.data)
    .catch(error => console.log(error));

  return {
    listUniversity: listUniversity,
    listCampusLinkProgram : listCampusLinkProgram,
  }
}

export const param = getData;
