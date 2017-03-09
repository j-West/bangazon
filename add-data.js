'use strict';

const { errorHandler } = require('./add-tables.js');
const { Database } = require('sqlite3').verbose();

const db = new Database('bangazon.sqlite');

const addTestData = () => {
  const { customers } = require('./mock-db/customers.json');
  const { products } = require('./mock-db/products.json');
  const { paymentOptions } = require('./mock-db/payment-options.json');
  const { orders } = require('./mock-db/orders.json');
  const { orderLineItems } = require('./mock-db/order-line-items.json');

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
      NULL, ${customer_id}, ${payment_option_id}, ${paid_in_full})`, errorHandler)
  });

  orderLineItems.forEach(({order_id, product_id}) => {
    db.run(`INSERT INTO order_line_items VALUES (
      NULL, ${order_id}, ${product_id})`, errorHandler)
  });
};

// addTestData();

module.exports = { addTestData }
