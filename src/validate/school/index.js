import fs from 'fs';
import { readSchoolFromExcel } from './readSchoolCode';

export function readSchoolFromJson(readExcelBeforeDo) {
  if (readExcelBeforeDo) {
    readSchoolFromExcel(true);
  }
  return require('./schoolcode.json');
}
const _readSchoolFromExcel = (writeResultToFile) => {
  return readSchoolFromExcel(writeResultToFile);
};
export { _readSchoolFromExcel as readSchoolFromExcel };