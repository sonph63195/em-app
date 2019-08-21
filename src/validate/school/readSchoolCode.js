import { readFile } from 'xlsx';
import { writeFile } from 'fs';

function readSchoolFromExcel(writeResultToFile) {
  let workbook = readFile('data.xlsx', { cellDates: true });
  let sheet_name_list = workbook.SheetNames;
  let event_code = sheet_name_list.find(sheet => sheet === 'School Code');
  let worksheet = workbook.Sheets[event_code];

  let header = new Map([
    ['G', { columnName: 'HOT KEY', variableName: 'uniHotKey', }],
    ['F', { columnName: 'University code', variableName: 'universityCode', }],
    ['D', { columnName: 'University name', variableName: 'universityName', }],
    ['B', { columnName: 'Site', variableName: 'site', }],
    ['H', { columnName: 'Faculty code', variableName: 'facultyCode' }]
  ]);
  let data = [];
  let propertiesName = {}
  for (z in worksheet) {
    if (z[0] === '!') continue;
    //parse out the column, row, and value
    let tt = 0;
    for (let i = 0; i < z.length; i++) {
      if (!isNaN(z[i])) {
        tt = i;
        break;
      }
    };
    let col = z.substring(0, tt);
    let row = parseInt(z.substring(tt));
    let value = worksheet[z].w;

    let headerObj = header.get(col);
    let variableName;
    if (headerObj)
      variableName = headerObj.variableName;
    else
      continue;

    //store header names
    if (row === 1) {
      propertiesName[col] = variableName;
      continue;
    } else {
      if (!data[row]) data[row] = {};
      data[row][propertiesName[col]] = value;
    }

  }
  data.shift();
  data.shift();
  if (writeResultToFile) {
    writeFile(__dirname + 'schoolcode.json', JSON.stringify(data), {}, (err => err ? console.log(err) : console.log('success')));
  }
  return data;
}

const _readSchoolFromExcel = readSchoolFromExcel;
export { _readSchoolFromExcel as readSchoolFromExcel };