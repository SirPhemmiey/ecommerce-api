
"use strict";

const log = require("metalogger");
const { validationResult } = require("spieler")();
const Department = require("../models/department");

const actions = {},
model = new Department();


actions.addDepartment = (req, res, next) => {

};

actions.editDepartment = (req, res) => {

};

actions.deleteDepartment = (req, res) => {

};

module.exports = actions;