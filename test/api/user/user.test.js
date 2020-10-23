// process.env.NODE_ENV = "test";
const request = require("supertest");
const { expect } = require("chai");
const db = require("../../../db/connection");
const createServer = require("../../../server");

describe("User", () => {
  const app = new createServer();

  it("should get Unauthorized", async () => {
    await request(app)
      .get("/api/profile/5f923b122c3d8dcbe3a57858")
      .send()
      .expect(401);
  });

  it("should get user with ID", async () => {
    await request(app)
      .get("/api/profile/5f923b122c3d8dcbe3a57858")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyM2IxMjJjM2Q4ZGNiZTNhNTc4NTgiLCJpYXQiOjE2MDM0MTg5NDZ9.WE0spKyoS7dbkJ8w8Gs5dRYq_KFBdsWXl_87JWbr2jg"
      )
      .set("Content-Type", "application/json")
      .send()
      .expect(200)
      .then((res) => {
        const body = res.body;
        expect(body).haveOwnProperty("user");
      });
  });

  it("should get user not found", async () => {
    await request(app)
      .get("/api/profile/5f9227c83857fc4db347aaa")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyMjdjNjgzODU3ZmM0ZGIzNDdhYWEiLCJpYXQiOjE2MDM0MTM5NzJ9._Wgk0n2plPduBvAxmNL1RsuEHSgpHJ9UcARORAjW3mk"
      )
      .set("Content-Type", "application/json")
      .send()
      .expect(400)
      .then((res) => {
        const body = res.body;
        expect(body).haveOwnProperty("error");
      });
  });

  it("should get Access denied", async () => {
    await request(app)
      .get("/api/profile/5f923d4600d944cc4a563be7")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyMjdjNjgzODU3ZmM0ZGIzNDdhYWEiLCJpYXQiOjE2MDM0MTM5NzJ9._Wgk0n2plPduBvAxmNL1RsuEHSgpHJ9UcARORAjW3mk"
      )
      .set("Content-Type", "application/json")
      .send()
      .expect(403)
      .then((res) => {
        const body = res.body;
        expect(body).haveOwnProperty("error");
      });
  });

  it("should get Admin resource! Access denied", async () => {
    await request(app)
      .get("/api/profile/5f923d4600d944cc4a563be7")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkyM2Q0NjAwZDk0NGNjNGE1NjNiZTciLCJpYXQiOjE2MDM0MTk0Nzl9.BMOOGcv4k_VXBLuiqpVgbqQwF3v6VO0o7rw6JpBgMp0"
      )
      .set("Content-Type", "application/json")
      .send()
      .expect(403)
      .then((res) => {
        const body = res.body;
        expect(body).haveOwnProperty("error");
      });
  });
});
