const { spieler, check, matchedData, sanitize } = require("spieler")();

export const validateNewCustomers = spieler([
  check("email")
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
    .isLength({ min: 5 })
    .matches(/\d/)
]);

export const validateNewDepartment = spieler([
  check("name")
    .not()
    .isEmpty()
    .withMessage("Description name cannot be empty")
    .trim()
    .escape()
]);

export const validateNewOrder = spieler([
  check("total_amount")
    .not()
    .isEmpty()
    .withMessage("Total amount cannot be empty")
    .isDecimal()
    .withMessage("Total amount must be a decimal"),

  check("status")
    .isInt()
    .withMessage("Status must be an Integer")
]);

export const validateNewProduct = spieler([
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
]);

export const validateNewShippingRegion = spieler([
  check("shipping_region")
    .isAlphanumeric()
    .withMessage(
      "Shipping region must be only alphabetical and numeric characaters"
    )
]);

// export const validateNewRecords = [
//   // validate comment field
//   check('comment')
//     .isString().withMessage('Comment Must be only alphabetical characters')
//     .isLength({ min: 10 })
//     .withMessage('Comment Must be at least 10 characters long'),
//   check('location')
//     .isLength({ min: 5 })
//     .withMessage('Location Must be at least 10 chars long'),
// ];

// // validates /PATCH/red-flags/location
// export const validatePatchLocation = [
//   check('location')
//     .isLength({ min: 5 })
//     .withMessage('Location Must be at least 10 characters long'),
// ];

// export const validatePatchComment = [
//   check('comment')
//     .isLength({ min: 5 })
//     .withMessage('Comment Must be at least 10 alphabetical characters long'),
// ];

// export const validateSignup = [
//   check('username')
//     .isString().withMessage('Username must be alphabetical characters.')
//     .isLength({ min: 4 })
//     .withMessage('Username must be at least 5 characters long'),

//   check('email')
//     .isString().withMessage('Email must be alphanumeric characters.')
//     .isLength({ min: 8, max: 40 })
//     .withMessage('Email must be at least 8 characters long and not more than 40'),

//   check('password')
//     .isString().withMessage('Password must be alphanumeric characters.')
//     .isLength({ min: 6, max: 20 })
//     .withMessage('Password must be at least 6 characters long and not more than 20'),

//   check('firstname')
//     .isString().withMessage('First name must be alphabetic characters.')
//     .isLength({ min: 3, max: 40 })
//     .withMessage('First name must be at least 3 characters long and not more than 40'),

//   check('lastname')
//     .isString().withMessage('Last name must be alphanumeric characters.')
//     .isLength({ min: 3, max: 40 })
//     .withMessage('Last name must be at least 3 characters long and not more than 40'),

//   check('password')
//     .isString().withMessage('Password must be alphanumeric characters.')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),

//   check('phonenumber')
//     .isString().withMessage('Phone number must be numeric characters.')
//     .isLength({ min: 10, max: 15 })
//     .withMessage('Phone number must be at least 10 characters long and not more than 15'),
// ];

// export const checkPassword = (req, res, next) => {
//   const { password, confirmPassword } = req.body;
//   if (password !== confirmPassword) {
//     return res.json({
//       status: 400,
//       error: 'Password and confirm password does not match.',
//     });
//   } return next();
// };

export const validateLogin = [
  check("username")
    .isString()
    .withMessage("Username must be alphabetical characters.")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "Username must be at least 5 characters long and not more than 20"
    ),

  check("password")
    .isString()
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
