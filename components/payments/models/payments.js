
"use strict";

const sql = require("config/database");

/**
 * @description - All database operations for products
 *
 * @class Products
 */
class Payment {

    // makePayment(data, callback) {
    //     const { amo}
    // }
  /**
   *
   * @description - GET all product items
   * @param {object} pageOptions
   * @param {function} callback
   * @memberof Products
   */
  getProducts(pageOptions, callback) {
    const { offset, limit } = pageOptions;
    const params = [limit, offset];
    const query = `SELECT * FROM product LIMIT ? OFFSET ?`;
    sql.query(query, params, (err, products) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, products, products.length);
    });
  }
}

module.exports = Payment;
