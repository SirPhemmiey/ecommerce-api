"use strict";

//Check to make sure header is not undefined, if so, return Forbidden (403)
const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.status(403).json({
      auth: false,
      success: false,
      message: "Unauthorized Access. Please log in",
      token: null
    });
  }
};

module.exports = verifyToken;
