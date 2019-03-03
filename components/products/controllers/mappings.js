/**
 * mappings.js
 * This file is the entry to the controller. 
 * It requires express server and defines the actions to
 * all the product {item} route.
 */

"use strict";

const router = require("express").Router({ mergeParams: true });
const validator = require("utils/validators");
const { catchError } = require("utils/handlers");
const actions = require("./actions");

router.get("/allProducts", )
router.post("/addProduct", validator.validateNewCustomer, catchError(actions.registerCustomer));


module.exports = router;
