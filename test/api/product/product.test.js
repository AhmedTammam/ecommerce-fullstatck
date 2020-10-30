const request = require("supertest");
const { expect } = require("chai");
const createServer = require("../../../server");
const fs = require("fs");
const path = require("path");

describe("Product", () => {
  const app = new createServer();

  const imagePath = path.join(
    __dirname,
    "../../../for-testing/hqdefault-(1).jpg"
  );

  const bigSizeImagePath = path.join(
    __dirname,
    "../../../for-testing/Pizigani_1367_Chart_10MB.jpg"
  );

  const productIdToGetAndUpdate = "5f98efe1b0cf7113184a2153";
  const productIdToDelete = "5f9af37c8340cc22fd256baa";

  it("create new product", async () => {
    await request(app)
      .post("/api/product/create/5f923b122c3d8dcbe3a57858")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyM2IxMjJjM2Q4ZGNiZTNhNTc4NTgiLCJpYXQiOjE2MDM0MjI2NTF9.MXrvuffyvU65L9mAffW-ZYYGk1h0spim3L8VFh2FHtg"
      )
      .set("Content-Type", "multipart/form-data")
      .field({
        name: "book",
        description: "test product",
        price: 123,
        quantity: 1,
        shipping: false,
        category: "5f92553606e90fd9061bb943",
      })
      .attach("photo", imagePath)
      .expect(200)
      .then((res, err) => {
        expect(res.body).haveOwnProperty("description");
      });
  });

  it("shouldn't create new product get validation error all fields required", async () => {
    await request(app)
      .post("/api/product/create/5f923b122c3d8dcbe3a57858")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyM2IxMjJjM2Q4ZGNiZTNhNTc4NTgiLCJpYXQiOjE2MDM0MjI2NTF9.MXrvuffyvU65L9mAffW-ZYYGk1h0spim3L8VFh2FHtg"
      )
      .set("Content-Type", "multipart/form-data")
      .field({
        description: "test product",
        price: 123,
        quantity: 1,
        shipping: false,
        category: "5f92553606e90fd9061bb943",
      })
      .attach("photo", imagePath)
      .expect(400)
      .then((res, err) => {
        expect(res.body).haveOwnProperty("error");
      });
  });

  it("shouldn't create new product get validation error photo size", async () => {
    await request(app)
      .post("/api/product/create/5f923b122c3d8dcbe3a57858")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyM2IxMjJjM2Q4ZGNiZTNhNTc4NTgiLCJpYXQiOjE2MDM0MjI2NTF9.MXrvuffyvU65L9mAffW-ZYYGk1h0spim3L8VFh2FHtg"
      )
      .set("Content-Type", "multipart/form-data")
      .field({
        name: "book",
        description: "test product",
        price: 123,
        quantity: 1,
        shipping: false,
        category: "5f92553606e90fd9061bb943",
      })
      .attach("photo", bigSizeImagePath)
      .expect(400)
      .then((res, err) => {
        expect(res.body).haveOwnProperty("error");
      });
  });

  it("should get a product ", async () => {
    await request(app)
      .get(`/api/product/${productIdToGetAndUpdate}`)
      .expect(200)
      .then((res) => {
        expect(res.body).haveOwnProperty("product");
      });
  });

  it("should update product ", async () => {
    await request(app)
      .put(`/api/product/${productIdToGetAndUpdate}/5f923b122c3d8dcbe3a57858`)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyM2IxMjJjM2Q4ZGNiZTNhNTc4NTgiLCJpYXQiOjE2MDM0MjI2NTF9.MXrvuffyvU65L9mAffW-ZYYGk1h0spim3L8VFh2FHtg"
      )
      .set("Content-Type", "multipart/form-data")
      .field({
        name: "book updated",
        description: "test product",
        price: 123,
        quantity: 1,
        shipping: false,
        category: "5f92553606e90fd9061bb943",
      })
      .attach("photo", imagePath)
      .expect(200)
      .then((res, err) => {
        expect(res.body).haveOwnProperty("description");
      });
  });

  it("should delete product ", async () => {
    await request(app)
      .delete(`/api/product/${productIdToDelete}/5f923b122c3d8dcbe3a57858`)
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyM2IxMjJjM2Q4ZGNiZTNhNTc4NTgiLCJpYXQiOjE2MDM0MjI2NTF9.MXrvuffyvU65L9mAffW-ZYYGk1h0spim3L8VFh2FHtg"
      )
      .expect(200)
      .then((res, err) => {
        console.log("res", res);
        console.log("err", err);
        expect(res.body).haveOwnProperty("message");
      });
  });
});
