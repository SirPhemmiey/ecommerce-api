/**
 * mappings.js
 * This file is the entry to the controller. 
 * It requires express server and defines the actions to
 * all the customer route.
 */

"use strict";

const router = require("express").Router({ mergeParams: true });
const validator = require("../../../utils/validators");
const { catchAsyncError } = require("../../../utils/handlers");
const actions = require("./actions");

const log = require("metalogger")();

router.post("/addCustomer", validator.validateNewCustomer, catchAsyncError(actions.registerCustomer));
// router.get("/index", function(req, res) {
//     console.log("I GAT YO!");
//     res.json({
//         message: 'YO!'
//     })
// })
router.get("/index", actions.test)
//router.post("/addCustomer", validator.validateNewCustomers)
// router.get("/", actions.getUsers);
// router.post("/", validator, actions.add);
// router.put("/update");
// router.get("/")

module.exports = router;
