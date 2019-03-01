
"use strict";

const sql = require("../../../config/database");

/**
 * @description - Add/Edit/Delete deparment
 *
 * @class Department
 */
class Department {

  /**
   *
   *
   * @param {object} newDepartment
   * @returns {object} - Class instance
   * @memberof Department
   */
  async addDepartment(newDepartment) {
    const { name, description } = newDepartment;
    try {
        const query = `INSERT INTO department (name, description) VALUES ('${name}', '${description}')`;
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
  * @param {object} department
  * @param {number} departmentId
  * @returns {object} - Class instance
  * @memberof Department
  */
 async editDepartment(department, departmentId) {
      const {name, description} = department;
      try {
          const query = `UPDATE department SET name = '${name}', description = '${description}' WHERE department_id = '${departmentId}'`;
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
  * @param {number} departmentId
  * @returns {object} - Class instance
  * @memberof Department
  */
 async deleteDepartment(departmentId) {
      try {
          const query = `DELETE FROM department WHERE department_id = ${departmentId}`;
          const result = await sql.query(query);
          return result;
      }
      catch(error) {
          return error;
      }
  }
}

module.exports = Department;
