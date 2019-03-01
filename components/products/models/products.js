
"use strict";

const sql = require("../../../config/database");

/**
 * @description - Add/Delete/Edit product
 *
 * @class Products
 */
class Products {

  /**
   *
   *
   * @param {object} - Product data object
   * @returns {object} - Class instance
   * @memberof Products
   */
  async addProduct(product) {
      const { name, description, price, discounted_price } = product;
      try {
          const query = `INSERT INTO product (name, description, price, discounted_price) VALUES ('${name}', '${description}', '${price}', '${discounted_price}')`;
          const result = await sql.query(query);
          return result;
      }
      catch(error) {
          return error;
      }
  }

 /**
  *
  *
  * @param {number} productId
  * @returns {object} - Class instance
  * @memberof Products
  */
 async deleteProduct(productId) {
      try {
        const query = `DELETE FROM product WHERE product_id = ${productId}`;
        const result = await sql.query(query);
        return result;
      }
      catch(error) {
          return error;
      }
  }

  /**
   *
   *
   * @param {object} product
   * @param {number} productId
   * @returns {object} - Class instance
   * @memberof Products
   */
  async editProduct(product, productId) {
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
