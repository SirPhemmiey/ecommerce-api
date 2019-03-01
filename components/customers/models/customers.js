

"use strict";

const sql = require("config/database");

//Customer object contructor
// const Customer = (customer) => {
//     this.name = customer.name;
//     this.email = customer.email;
//     this.customer_id = customer.customer_id;
// };

// Customer.register = (newCustomer, result) => {
//     sql.query("INSERT INTO `customers` SET ?", newCustomer, (error, response) => {
//         if (error) {

//         }
//     })
// };

class Customers {
  /**
   * @description - Model for Customers
   * 
   * @param {object} - Customer data object
   * @memberof Customers
   * 
   * @returns {object} - Class instance
   */
  async register(newCustomer) {
    try {
        const customer = await sql.query(
            "INSERT INTO customers SET ?",
            newCustomer
          );
          return customer;
    }
    catch(error) {
        return error;
        //throw new Error("An error occured while creating a new customer")
    }
  }

/**
 *
 *
 * @param {*} customerId
 * @memberof Customers
 */
async deleteCustomer(customerId) {
      try {
        const result = await sql.query(`DELETE * FROM customers WHERE id = ${customerId}`);
        return result;
      }
      catch(error) {
        return error;
      }
  }

  async editCustomer(customer, customerId) {
      const {} = customer;
      try {
          const customer = await sql.query(`UPDATE customers SET `);
          return customer;
      }
      catch(error) {
          return error;
      }
  }
}

module.exports = Customers;
