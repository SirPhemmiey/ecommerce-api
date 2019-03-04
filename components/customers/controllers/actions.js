/**
 * actions.js
 * This is the file that will handle customer related
 * actions.
 */

"use strict";

const { validationResult } = require("express-validator/check");
const Customers = require("../models/customers");
const logger = require("config/winston");
const actions = {},
  model = new Customers();


actions.registerCustomer = (req, res) => {
  let errorMessage;

  const errors = validationResult(req)
    .array()
    .map(error => {
      errorMessage = error.msg;
    });

  if (errors.length < 1) {
    model.register(req.body, function(err, message) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.sqlMessage
        });
      }
      res.status(201).json({
        success: true,
        message: "Account created successfully"
      });
    });
  } else {
    res.status(400).json({
      success: false,
      message: errorMessage
    });
    logger.error(errorMessage);
  }
};

actions.login = (req, res) => {
  let errorMessage;
  const errors = validationResult(req)
    .array()
    .map(error => {
      errorMessage = error.msg;
    });

  if (errors.length < 1) {
    model.login(req.body, function(err, message) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.sqlMessage
        });
      }
      else if (message.length === 0 || message.length < 1) {
        return res.status(500).json({
          success: false,
          message: "Invalid username or password"
        });
      }
      res.status(200).json({
        success: true,
        message: "Login successful"
      });
    });
  } else {
    res.status(400).json({
      success: false,
      message: errorMessage
    });
    logger.error(errorMessage);
  }
};

actions.updateProfile = (req, res) => {
  let errorMessage;
  const errors = validationResult(req)
    .array()
    .map(error => {
      errorMessage = error.msg;
    });

  if (errors.length < 1) {
    model.updateProfile(req.body, function(err, message) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.sqlMessage
        });
      }
      res.status(200).json({
        success: true,
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
};

module.exports = actions;
