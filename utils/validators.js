
"use strict";

const { check } = require("express-validator/check");

export const validateNewCustomer = [
  check("email")
  .not()
  .isEmpty()
    .exists()
    .withMessage("Email must be provided")
    .isEmail()
    .withMessage("email format is invalid")
    .trim()
    .normalizeEmail(),

  check("name")
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty")
    .trim()
    .escape(),

  check(
    "password",
    "passwords must be at least 5 chars long and contain one number"
  )
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .matches(/\d/)
];

export const validateNewDepartment = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Description name cannot be empty")
    .trim()
    .escape()
];

export const validateNewOrder = [
  check("total_amount")
    .not()
    .isEmpty()
    .withMessage("Total amount cannot be empty")
    .isDecimal()
    .withMessage("Total amount must be a decimal"),

  check("status")
    .isInt()
    .withMessage("Status must be an Integer")
];

export const validateNewProduct = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Product name cannot be empty"),

  check("description")
    .not()
    .isEmpty()
    .withMessage("The product description cannot be empty"),

  check("price")
    .isDecimal()
    .withMessage("Price must be a decimal"),

  check("discounted_price")
    .isDecimal()
    .withMessage("Discounted Price must be a decimal"),

  check("display")
    .isInt()
    .withMessage("Display must be an Integer")
];

export const validateNewShippingRegion = [
  check("shipping_region")
    .isAlphanumeric()
    .withMessage(
      "Shipping region must be only alphabetical and numeric characaters"
    )
];

export const validateLogin = [
  check("username")
    .isAlphanumeric()
    .withMessage("Username must be alphabetical characters.")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "Username must be at least 5 characters long and not more than 20"
    ),

  check("password")
    .isAlphanumeric()
    .withMessage("Password must be alphanumeric characters.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
];

// export const validateStatus = [
//   check('status')
//     .isString().withMessage('Status must be alphabetical characters.')
//     .isLength({ min: 4, max: 20 })
//     .withMessage('Status must be at least 5 characters long and not more than 20'),
// ];
