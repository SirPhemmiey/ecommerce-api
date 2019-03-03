

"use strict";

const sql = require("config/database");

const appRoot = require("app-root-path");

const logger = require("../../../config/winston");

  
class Customers {
  /**
   *
   *
   * @param {object} newCustomer
   * @param {func} callback
   * @memberof Customers
   */
  register(newCustomer, callback) {
      const { name, email, password, shipping_region_id } = newCustomer;   
        const query =  `INSERT INTO customer (name, email, password, shipping_region_id) VALUES ('${name}', '${email}', '${password}', '${shipping_region_id}')`;
          sql.query(query, (err, customer) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, customer);
        });
  }

/**
 *
 *
 * @param {number} customerId
 * @param {func} callback
 * @memberof Customers
 */
 deleteCustomer(customerId, callback) {
    const query = `DELETE * FROM customers WHERE id = ${customerId}`;
    sql.query(query, (err, customer) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, customer);
    });
  }

/**
 *
 *
 * @param {object} customer
 * @param {number} customerId
 * @param {func} callback
 * @returns
 * @memberof Customers
 */
editCustomer(customer, customerId, callback) {
      const {} = customer;
      try {
          const customer = sql.query(`UPDATE customers SET `);
          return customer;
      }
      catch(error) {
          return error;
      }
  }
}

module.exports = Customers;
