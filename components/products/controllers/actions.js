"use strict";

const log = require("metalogger");
const { validationResult } = require("spieler")();
const Product = require("../models/products");

const actions = {},
  model = new Product();

/**
 *
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 */
actions.addProduct = (req, res) => {

};

actions.editProduct = (req, res) => {
   
};

actions.deleteProduct = (req, res) => {};

module.exports = actions;
