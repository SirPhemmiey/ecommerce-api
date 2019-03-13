/***
 * Test all orders endpoints
 */

"use strict";

const request = require("supertest");
const app = require("../server");
const { expect } = require("chai");

describe("Order", () => {

  //GET all products
  describe("GET Orders", () => {
    it("Should return an array of orders", (done) => {
      request(app)
        .get("/api/v1/order/getOrders")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.orders).to.be.an("array");
          return done();
        });
    });
  });
  

  //GET an order information by ID
  describe("GET Order", () => {
    it("Should return only one order information", (done) => {
      request(app)
        .get("/api/v1/order/getOrder/1")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).to.be.true;
          expect(res.body.product).to.be.an("array");
          return done();
        });
    });
  });

  //GET a order information by ID
  describe('GET order (with a non-integer)', () => {
    it("Should show an error if a non-integer is passed", (done) => {
      request(app)
      .get("/api/v1/order/getOrder/test")
      .expect("Content-Type", /plain/)
      .expect(404, done)
    });
  });
  
});
