"use strict";

const sql = require("config/database");

/**
 * @description - All database operations for products
 *
 * @class Products
 */
class Products {
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

  /**
   *
   * @description - Filter product items by department and category
   * @param {object} filterParams
   * @param {function} callback
   * @memberof Products
   */
  filterProducts(filterParams, callback) {
    const { department_id, category_id, limit, offset } = filterParams;
    const params = [category_id || 1, department_id || 1, limit, offset];
    const query = `SELECT * FROM product_category as PC JOIN product as P ON (PC.product_id = P.product_id) JOIN category as C ON (PC.category_id = C.category_id) JOIN department as D ON (C.department_id = D.department_id)  WHERE C.category_id = ? AND D.department_id = ? LIMIT ? OFFSET ?`;
    sql.query(query, params, (err, products) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, products, products.length);
    });
  }

  /**
   *
   * @description - Search products
   * @param {object} filterParams
   * @param {function} callback
   * @memberof Products
   */
  searchProduct(filterParams, callback) {
    const { search_term, limit, offset } = filterParams;
    const params = [`${search_term}%`, limit, offset];
    const query = `SELECT * FROM product WHERE name LIKE ? LIMIT ? OFFSET ?`;
    sql.query(query, params, (err, products) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, products, products.length);
    });
  }

  /**
   *
   * @description - GET a product item detail
   * @param {number} product_id
   * @param {function} callback
   * @memberof Products
   */
  getProduct(product_id, callback) {
    const params = [product_id];
    const query = `SELECT * FROM product WHERE product_id = ?`;
    sql.query(query, params, (err, product) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, product);
    });
  }

  /**
   * @description - GET all products in a category
   * @param {object} filterParams
   * @param {function} callback
   * @memberof Products
   */
  getProductsCategory(filterParams, callback) {
    const { category_id, limit, offset } = filterParams;
    const params = [category_id, limit, offset];
    const query = `SELECT * FROM product_category as PC JOIN product as P ON (PC.product_id = P.product_id) WHERE category_id = ? LIMIT ? OFFSET ?`;
    sql.query(query, params, (err, products) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, products, products.length);
    });
  }

  /**
   *
   * @description - GET all products in a department
   * @param {object} filterParams
   * @param {function} callback
   * @memberof Products
   */
  getProductsDepartment(filterParams, callback) {
    const { department_id, limit, offset } = filterParams;
    const params = [department_id, limit, offset];
    const query = `SELECT * FROM product_category as PC JOIN product as P ON (PC.product_id = P.product_id) JOIN category as C ON (PC.category_id = C.category_id) JOIN department as D ON (C.department_id = D.department_id)  WHERE D.department_id = ? LIMIT ? OFFSET ?`;
    sql.query(query, params, (err, products) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, products, products.length);
    });
  }

  /**
   *
   * @description - Add a product
   * @param {object} product
   * @param {function} callback
   * @memberof Products
   */
  addProduct(productData, callback) {
    const { name, description, price, image } = productData;
    const params = [name, description, price, image];
    const query = `INSERT INTO product (name, description, price, image) VALUES (?, ?, ?, ?)`;
    sql.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

/**
 *
 *
 * @param {object} productData
 * @param {function} callback
 * @memberof Products
 */
editProduct(productData, callback) {
    const {
      name,
      description,
      price,
      discounted_price,
      product_id
    } = productData;
    const params = [name, description, price, discounted_price, product_id];
    const query = `UPDATE product SET name = ?, description = ?, price = ?, discounted_price = ?, WHERE product_id = ?`;
    sql.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }
}

module.exports = Products;
