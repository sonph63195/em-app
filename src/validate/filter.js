import '@babel/polyfill';

let eventList = [];
eventList = require('./event/event.json');
let crea = {
  //univ: 'ĐH Công nghiệp TPHCM',
  //prog: 'INTERNSHIP',
  skil: 'NET',
  site: 'HCM',
  year: 2019,
}

let result = eventList.filter((event) => {
  let year = new Date(event.H).getFullYear()
  console.log(year);
  
  if (crea.univ && event.G != crea.univ)
    return false
  if (crea.prog && event.C != crea.prog)
    return false
  if (crea.skil && event.E != crea.skil)
    return false
  if (crea.site && event.A != crea.site)
    return false
  if (crea.year && year != crea.year)
    return false
  return true;
});
console.log(JSON.stringify(result))
export default (eventList, createria) => {

}