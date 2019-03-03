"use strict";

const sql = require("config/database");

/**
 * @description - All database operations for products
 *
 * @class Products
 */
class Products {

  //GET all products items
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

  //Filter product items by department and category
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

  //Search products
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

  //GET a product item information
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

  //GET all products in a category
  getProductsCategory(filterParams, callback) {
    const { category_id, limit, offset} = filterParams;
    const params = [category_id, limit, offset];
    const query = `SELECT * FROM product_category as PC JOIN product as P ON (PC.product_id = P.product_id) WHERE category_id = ? LIMIT ? OFFSET ?`;
    sql.query(query, params, (err, products) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, products, products.length);
    });
}

//GET all products in a department
getProductsDepartment(filterParams, callback) {
    const { department_id, limit, offset} = filterParams;
    const params = [department_id, limit, offset];
    const query = `SELECT * FROM product_category as PC JOIN product as P ON (PC.product_id = P.product_id) JOIN category as C ON (PC.category_id = C.category_id) JOIN department as D ON (C.department_id = D.department_id)  WHERE D.department_id = ? LIMIT ? OFFSET ?`;
    sql.query(query, params, (err, products) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, products, products.length);
    });
}

  //Add Product
  addProduct(product, callback) {
    const { name, description, price, discounted_price } = product;
    const query = `INSERT INTO product (name, description, price, discounted_price) VALUES ('${name}', '${description}', '${price}', '${discounted_price}')`;
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
   * @param {number} productId
   * @param {func} callback
   * @returns
   * @memberof Products
   */
  // deleteProduct(productId, callback, callback) {
  //       const query = `DELETE * FROM product WHERE id = ${productId}`;
  //       sql.query(query, (err, product) => {
  //           if (err) {
  //               return callback(err, null);
  //           }
  //           return callback(null, product);
  //       });
  //   }

  /**
   *
   *
   * @param {object} product
   * @param {number} productId
   * @param {func} callback
   * @returns
   * @memberof Products
   */
  // async editProduct(product, productId, callback) {
  //     const { name, description, price, discounted_price } = product;
  //     try {
  //         const query = `UPDATE product SET name = '${name}', description = ${description}, price = ${price}, discounted_price = ${discounted_price}
  //         WHERE product_id = ${productId}`;
  //         const result = await sql.query(query);
  //         return result;
  //     }
  //     catch(error) {
  //         return error;
  //     }
  //   }
}

module.exports = Products;
