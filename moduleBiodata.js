const { name, place, birtOfDate, address } = require('./module/biodata.js');
const { nameValue, placeValue, birtOfDateValue, addressValue } = require('./module/data.js');

console.log(name(nameValue));
console.log(place(placeValue));
console.log(birtOfDate(birtOfDateValue));
console.log(address(addressValue));
