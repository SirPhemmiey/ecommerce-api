"use strict";

const sql = require("config/database");

/**
 * @description - Add/Edit/Delete Deparment
 *
 * @class Department
 */
class Department {
  /**
   *
   *@description - Add a department
   * @param {object} deparmentData
   * @param {function} callback
   * @memberof Department
   */
  addDepartment(deparmentData, callback) {
    const { name, description } = deparmentData;
    const params = [name, description];
    const query = `INSERT INTO department (name, description) VALUES (?, ?)`;
    sql.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  /**
   *
   *@description - Edit a department
   * @param {object} deparmentData
   * @param {function} callback
   * @memberof Department
   */
  editDepartment(deparmentData, callback) {
    const { name, description, department_id } = deparmentData;
    const params = [name, description, department_id];
    const query = `UPDATE department SET name = ?, description = ? WHERE department_id = ?`;
    sql.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }

  /**
   *
   *@description - Delete a department
   * @param {number} departmentId
   * @param {function} callback
   * @memberof Department
   */
  deleteDepartment(departmentId, callback) {
    const params = [departmentId];
    const query = `DELETE FROM department WHERE department_id = ?`;
    sql.query(query, params, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  }
}

module.exports = Department;
