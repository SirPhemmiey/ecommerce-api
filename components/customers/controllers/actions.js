/**
 * actions.js
 * This is the file that will handle customer related
 * actions.
 */

"use strict";

const log = require("metalogger");
const { validationResult } = require("spieler")();
const Customers = require("../models/customers");
const actions = {},
  model = new Customers();


actions.registerCustomer = function(req, res, next) {
    const errors = validationResult(req).array().map(error => error.msg);
    if (errors.length < 1) {
        //let customers = {};
    try {
        const customers = await model.register(req.body);
        if (customers) {
            res.status(201).json({
                success: true,
                message: "Account created successfully"
            });
        }
    }
    catch(error) {

    }
    }
    
}