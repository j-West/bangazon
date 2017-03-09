'use strict';

const { Database } = require('sqlite3').verbose();

const db = new Database('bangazon.sqlite');


const dropTables = () => {
  db.run(`DROP TABLE customers`);
  db.run(`DROP TABLE orders`);
  db.run(`DROP TABLE products`);
  db.run(`DROP TABLE payment_options`);
  db.run(`DROP TABLE order_line_items`);
};

// dropTables();
module.exports = { dropTables };
