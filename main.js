'use strict';

const { Database } = require('sqlite3').verbose();

const db = new Database('bangazon.sqlite');



const errorHandler = err => {
  if (err) console.log('Error', err);
}

const dropTable = (table) => {
  db.run(`DROP TABLE ${table}`)
}
// dropTable('customers');
// dropTable('products');
// dropTable('payment_options');


// Creating table for bangazon db

db.run(`CREATE TABLE IF NOT EXISTS customers
      (customer_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      street_address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      postal_code INTEGER NOT NULL,
      phone_number INTEGER NOT NULL)`, errorHandler);

db.run(`CREATE TABLE IF NOT EXISTS products
      (product_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INT NOT NULL)`, errorHandler);

db.run(`CREATE TABLE IF NOT EXISTS payment_options
      (payment_option_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      account_num INTEGER NOT NULL)`, errorHandler);

db.run(`CREATE TABLE IF NOT EXISTS orders
      (order_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      customer_id INT NOT NULL,
      payment_option_id INT NOT NULL,
      paid_in_full TEXT NOT NULL,
      FOREIGN KEY(payment_option_id) REFERENCES payment_options(payment_option_id),
      FOREIGN KEY(customer_id) REFERENCES customers(customer_id))`, errorHandler);

db.run(`CREATE TABLE IF NOT EXISTS order_line_items
      (line_item_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      FOREIGN KEY(order_id) REFERENCES orders(order_id),
      FOREIGN KEY(product_id) REFERENCES products(product_id))`, errorHandler);





// Add test Data

const addTestData = () => {
  const { customers } = require('./customers.json');
  const { products } = require('./products.json');
  const { paymentOptions } = require('./payment-options.json');
  const { orders } = require('./orders.json');
  const { orderLineItems } = require('./order-line-items.json');

  customers.forEach(({first_name, last_name, street_address, city, state, postal_code, phone_number}) => {
    db.run(`INSERT INTO customers VALUES (
      NULL, "${first_name}", "${last_name}", "${street_address}", "${city}", "${state}", ${postal_code}, ${phone_number}
    )`, errorHandler);
  });

  products.forEach(({name, price}) => {
    db.run(`INSERT INTO products VALUES (
      NULL, "${name}", ${price})`, errorHandler);
  });

  paymentOptions.forEach(({name, account_num}) => {
    db.run(`INSERT INTO payment_options VALUES (
      NULL, "${name}", ${account_num})`, errorHandler);
  });

  orders.forEach(({customer_id, payment_option_id, paid_in_full}) => {
    db.run(`INSERT INTO orders VALUES (
      NULL, ${customer_id}, ${payment_option_id}, "${paid_in_full}")`, errorHandler)
  });

  orderLineItems.forEach(({order_id, product_id}) => {
    db.run(`INSERT INTO order_line_items VALUES (
      NULL, ${order_id}, ${product_id})`, errorHandler)
  });
};

// addTestData();
