/**
 * actions.js
 * This is the file that will handle customer related
 * actions.
 */

"use strict";

const { validationResult } = require("express-validator/check");
const Customers = require("../models/customers");
const logger = require("config/winston");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config/index");
const actions = {},
  model = new Customers();

actions.registerCustomer = async (req, res) => {
  let errorMessage;
  const errors = validationResult(req)
    .array()
    .map(error => {
      errorMessage = error.msg;
    });

  if (errors.length < 1) {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    req.body.password = hashedPassword;
    model.register(req.body, function(err, customer, isFound) {
      if (err) {
        return res.status(500).json({
          success: false,
          auth: false,
          message: err.sqlMessage
        });
      } else if (!isFound) {
        return res.status(409).json({
          success: false,
          auth: false,
          message: "The email is already registered. Please choose another one."
        });
      }
      // All is fine, create a token
      const token = jwt.sign({ id: customer.customer_id }, config.jwt.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(201).json({
        success: true,
        auth: true,
        token,
        message: "Account created successfully"
      });
    });
  } else {
    res.status(400).json({
      success: false,
      auth: false,
      message: errorMessage
    });
    logger.error(errorMessage);
  }
};

actions.login = (req, res) => {
  model.checkEmail(req.body.email, async function(err, customer) {
    let errorMessage;
    const errors = validationResult(req)
      .array()
      .map(error => {
        errorMessage = error.msg;
      });
    if (errors.length < 1) {
      if (err) {
        return res.status(500).json({
          success: false,
          auth: false,
          message: err.sqlMessage
        });
      } else if (customer.length === 0 || customer.length < 1) {
        return res.status(500).json({
          success: false,
          auth: false,
          message: "Email does not exist"
        });
      }
      const passwordIsValid = await bcrypt.compare(
        req.body.password,
        customer[0].password
      );
      if (!passwordIsValid)
        return res.status(401).json({
          auth: false,
          success: false,
          token: null,
          message: "Invalid password"
        });
      const token = jwt.sign({ id: customer[0].customer_id, email: customer[0].email }, config.jwt.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).json({
        success: true,
        auth: true,
        token,
        message: "Login successful"
      });
    } else {
      res.status(400).json({
        success: false,
        message: errorMessage
      });
      logger.error(errorMessage);
    }
  });
};

actions.updateProfile = (req, res) => {
  //Verify the token and get the customer's ID from it
  jwt.verify(req.token, config.jwt.secret, function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, token: null, message: err.message });
    }
    let errorMessage;
    const errors = validationResult(req)
      .array()
      .map(error => {
        errorMessage = error.msg;
      });

    if (errors.length < 1) {
      req.body.customer_id = decoded.id;
      model.updateProfile(req.body, function(err, message) {
        if (err) {
          return res.status(500).json({
            success: false,
            auth: false,
            message: err.sqlMessage
          });
        }
        res.status(200).json({
          success: true,
          auth: true,
          message: "Profile updated successfully"
        });
      });
    } else {
      res.status(400).json({
        success: false,
        message: errorMessage
      });
      logger.error(errorMessage);
    }
  });
};

module.exports = actions;
