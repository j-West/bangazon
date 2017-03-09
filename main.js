
const { dropTables } = require('./drop-tables.js');
const { addTables } = require('./add-tables.js');
const { addTestData } = require('./add-data.js');
const flag = process.argv[2];


if (flag !== undefined) {
  dropTables();
}

setTimeout(addTables, 700);
setTimeout(addTestData, 1000);
