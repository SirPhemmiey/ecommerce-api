

"use strict";

const sql = require("config/database");

const winston = require("winston");

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
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      // - Write all logs with level 'info' and below to 'conbined.log'
      new winston.transports.File({ filename: "sql_error.log", level: "error" }),
      new winston.transports.File({ filename: "sql_combined.log" })
    ]
  });

  
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
      const {name, email, password, shipping_region_id} = newCustomer;   
    try {
        const query =  `INSERT INTO customers (name, email, password, shipping_region_id) VALUES ('${name}', '${email}', '${password}', '${shipping_region_id}')`;
          sql.query(query, (err, customer) => {
            if (!err) {
                return customer;
            }
            console.log("This>>>", err.sqlMessage);
        });
    }
    catch(error) {
        throw new Error("An error occured while creating a new customer", error.sqlMessage);
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
