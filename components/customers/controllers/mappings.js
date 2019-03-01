/**
 * mappings.js
 * This file is the entry to the controller. 
 * It requires express server and defines the actions to
 * all the customer route.
 */

"use strict";

const router = require("express").Router({ mergeParams: true });
const validator = require("../../../utils/validators");
const actions = require("./actions");

const log = require("metalogger")();

validator.

//router.post("/addCustomer", validator.validateNewCustomers)
// router.get("/", actions.getUsers);
// router.post("/", validator, actions.add);
// router.put("/update");
// router.get("/")

module.exports = router;
