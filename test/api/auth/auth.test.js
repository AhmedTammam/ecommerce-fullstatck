process.env.NODE_ENV = "test";
const request = require("supertest");
const { expect } = require("chai");
const db = require("../../../db/connection");
const createServer = require("../../../server");

describe("Auth", () => {
  before((done) => {
    db.connect().then(() => done());
  });

  const app = new createServer();

  it("should signup", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "asasaa",
        email: "asaaas@g.com",
        password: "dhsj5as989",
      })
      .expect(200)
      .then((res) => {
        const body = res.body;
        expect(body).haveOwnProperty("user");
      });
  });

  it("should signup get already exist", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "asasaa",
        email: "asaaas@g.com",
        password: "dhsj5as989",
      })
      .expect(400)
      .then((res) => {
        const body = res.body;
        expect(body).haveOwnProperty("error");
      });
  });

  it("should not signup", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "gfasasgf",
        email: "asaaas@g.com",
        password: "dhsj5as989",
      })
      .expect(400)
      .then((res) => {
        const body = res.body;
        expect(body).haveOwnProperty("error");
      });
  });

  it("should login", async () => {
    await request(app)
      .post("/api/signin")
      .send({
        email: "asaaas@g.com",
        password: "dhsj5as989",
      })
      .expect(200)
      .then((res) => {
        const body = res.body;
        expect(body).haveOwnProperty("token");
      });
  });

  it("should login get email not exist", async () => {
    await request(app)
      .post("/api/signin")
      .send({
        email: "hdhdh@g.com",
        password: "dhsj5as989",
      })
      .expect(400)
      .then((res) => {
        const body = res.body;
        expect(body).haveOwnProperty("error");
      });
  });

  it("should signout", async () => {
    await request(app).get("/api/signout").expect(200);
  });
});
