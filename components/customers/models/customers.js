"use strict";

const sql = require("config/database");

const appRoot = require("app-root-path");

const logger = require("../../../config/winston");

class Customers {
  /**
   *
   * @description - Register a new customer
   * @param {object} data
   * @param {function} callback
   * @memberof Customers
   */
  register(data, callback) {
    const { name, email, password } = data;
    const params = {
      name,
      email,
      password
    };
    const query = `INSERT INTO customer (name, email, password) VALUES ('?', '?', '?')`;
    sql.query(query, params, (err, customer) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, customer);
    });
  }

  /**
   *
   *@description - Login customer
   * @param {object} credentials
   * @param {function} callback
   * @memberof Customers
   */
  login(credentials, callback) {
    const { email, password } = credentials;
    const params = [email, password];
    const query = `SELECT email, password FROM customer WHERE email = ? AND password = ?`;
    sql.query(query, params, (err, customer) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, customer);
    });
  }

  /**
   *
   * @description - Update customer profile
   * @param {object} data
   * @param {function} callback
   * @memberof Customers
   */
  updateProfile(data, callback) {
    const {
      address_1,
      city,
      region,
      postal_code,
      country,
      shipping_region_id,
      day_phone
    } = data;
    const params = [
      address_1,
      city,
      region,
      postal_code,
      country,
      shipping_region_id,
      day_phone
    ];
    const query = `UPDATE customer SET address_1 = ?, city = ?, region = ?, postal_code = ?, country = ?, shipping_region_id = ?, day_phone = ? WHERE customer_id = ?`;
    sql.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }
}

module.exports = Customers;
