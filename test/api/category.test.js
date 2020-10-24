const request = require("supertest");
const { expect } = require("chai");
const createServer = require("../../server");

describe("Category", () => {
  const app = new createServer();

  it("create new category", async () => {
    await request(app)
      .post("/api/category/create/5f923b122c3d8dcbe3a57858")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyM2IxMjJjM2Q4ZGNiZTNhNTc4NTgiLCJpYXQiOjE2MDM0MjI2NTF9.MXrvuffyvU65L9mAffW-ZYYGk1h0spim3L8VFh2FHtg"
      )
      .set("Content-Type", "application/json")
      .send({ name: "art" })
      .expect(200)
      .then((res, err) => {
        expect(res.body).haveOwnProperty("data");
      });
  });
});
