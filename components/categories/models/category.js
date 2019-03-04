"use strict";

const sql = require("config/database");

/**
 * @description - Add/Edit/Delete Category
 *
 * @class Category
 */
class Category {
  /**
   *
   *@description - Add a category
   * @param {object} categoryData
   * @param {function} callback
   * @memberof Category
   */
  addCategory(categoryData, callback) {
    const { name, description, department_id } = categoryData;
    const params = [name, description, department_id];
    const query = `INSERT INTO category (name, description, department_id) VALUES (?, ?, ?)`;
    sql.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  /**
   *
   *@description - Edit a category
   * @param {object} categoryData
   * @param {function} callback
   * @memberof Department
   */
  editCategory(categoryData, callback) {
    const { name, description, department_id, category_id } = categoryData;
    const params = [name, description, department_id, category_id];
    const query = `UPDATE category SET name = ?, description = ?, category_id = ? WHERE category_id = ?`;
    sql.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  /**
   *
   *@description - Delete a category
   * @param {number} categoryId
   * @param {function} callback
   * @memberof Category
   */
  deleteCategory(categoryId, callback) {
    const params = [categoryId];
    const query = `DELETE FROM category WHERE category_id = ?`;
    sql.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }
}

module.exports = Category;
