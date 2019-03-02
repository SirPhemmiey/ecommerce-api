/**
 * actions.js
 * This is the file that will handle customer related
 * actions.
 */

"use strict";

const log = require("metalogger");
const { validationResult } = require("express-validator/check");
const Customers = require("../models/customers");
const actions = {},
  model = new Customers();

/**
 *
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @returns {JSON}
 */
actions.registerCustomer = async function(req, res) {

    let errorMessage;

    const errors = validationResult(req)
      .array()
      .map(error => {
        errorMessage = error.msg
      });
 
    if (errors.length < 1) {
        const customers = await model.register(req.body);
        if (customers) {
          return res.status(201).json({
            success: true,
            message: "Account created successfully"
          });
        }
        res.status(500).json({
          success: false,
          message: "An error occured while creating customers."
        });
    } else {      
      res.status(400).json({
          success: false,
          message: errorMessage
      });
    }
};

actions.test = async (req, res) => {
  const errors = validationResult(req)
    .array()
    .map(error => error.msg);
  res.json({
    message: "Funny",
    body: req.body,
    errors
  });
};

module.exports = actions;
