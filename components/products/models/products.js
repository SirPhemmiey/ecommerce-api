
"use strict";

const sql = require("config/database");

/**
 * @description - Add/Delete/Edit product
 *
 * @class Products
 */
class Products {

/**
 *
 *
 * @param {*} product
 * @param {*} callback
 * @memberof Products
 */
 addProduct(product, callback) {
      const { name, description, price, discounted_price } = product;
    const query = `INSERT INTO product (name, description, price, discounted_price) VALUES ('${name}', '${description}', '${price}', '${discounted_price}')`;
    sql.query(query, (err, product) => {
        if(err) {
            return callback(err, null);
        }
        return callback(null, product);
    });
  }

/**
 *
 *
 * @param {number} productId
 * @param {func} callback
 * @returns
 * @memberof Products
 */
deleteProduct(productId, callback, callback) {
      const query = `DELETE * FROM product WHERE id = ${productId}`;
      sql.query(query, (err, product) => {
          if (err) {
              return callback(err, null);
          }
          return callback(null, product);
      });
  }

/**
 *
 *
 * @param {object} product
 * @param {number} productId
 * @param {func} callback
 * @returns
 * @memberof Products
 */
async editProduct(product, productId, callback) {
    const { name, description, price, discounted_price } = product;
    try {
        const query = `UPDATE product SET name = '${name}', description = ${description}, price = ${price}, discounted_price = ${discounted_price}
        WHERE product_id = ${productId}`;
        const result = await sql.query(query);
        return result;
    }
    catch(error) {
        return error;
    }
  }
}

module.exports = Products;
