/**
 * actions.js
 * This is the file that will payments related
 * actions.
 */

"use strict";

//const Customers = require("../models/payments");
const { validationResult } = require("express-validator/check");
const logger = require("config/winston");
const config = require("../../../config");
const stripe = require("stripe")(config.payment.secret_key);
const actions = {};
//   model = new Customers();

actions.makePayment = (req, res) => {
  let errorMessage;
  const { amount, currency, order_id } = req.body;
  let currency_ = currency || "usd";

  const errors = validationResult(req)
    .array()
    .map(error => {
      errorMessage = error.msg;
    });

  if (errors.length < 1) {
    stripe.charges.create(
      {
        amount: amount,
        currency: currency_,
        source: "tok_mastercard", // obtained with Stripe.js
        description: "Charge for jenny.rosen@example.com"
      },
      function(err, charge) {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message
          });
        }
        res.status(200).json({
          success: charge.paid,
          status: charge.status
        });
      }
    );
  } else {
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

module.exports = actions;
