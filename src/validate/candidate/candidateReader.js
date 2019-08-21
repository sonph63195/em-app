import { readFile } from 'xlsx';
import { writeFile } from 'fs';
import moment from 'moment';

function readCandidateFromExcel(writeResultToFile) {
  let workbook = readFile('data.xlsx', { cellDates: true, cellNF: true });
  let sheet_name_list = workbook.SheetNames;
  let event_code = sheet_name_list.find(sheet => sheet === 'Data List');
  let worksheet = workbook.Sheets[event_code];
  let headers = {};
  let data = [];
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
    let cell = worksheet[z];


    //store header names
    if (row == 3 && value) {
      headers[col] = col;
      continue;
    }

    if (row > 3) {
      if (!data[row - 2]) data[row - 2] = {};
      data[row - 2][headers[col]] = value;
      if (col === 'I') {
        data[row - 2][headers[col]] = cell.w;
      } else if (cell.t === 'n') {
        data[row - 2][headers[col]] = new Number(value);
      } else if (cell.t === 'd' || col === 'F') {
        data[row - 2][headers[col]] = moment(new Date(cell.v)).format('DD-MMM-YYYY')
      }
    }
  }
  //drop those first two rows which are empty
  data.shift();
  data.shift();

  if (writeResultToFile) {
    writeFile(__dirname + '/candidate.json', JSON.stringify(data), {}, 
    (err => err ? console.log(err) : console.log('success')));
  }
  return data;
}
readCandidateFromExcel(true)
const _readCandidateFromExcel = readCandidateFromExcel;
export { _readCandidateFromExcel as readCandidateFromExcel };
