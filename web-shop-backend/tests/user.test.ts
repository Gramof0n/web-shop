process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import { User } from "types";
import { userValidation } from "../validation/userValidation";
import { response } from "express";

chai.use(chaiHttp);
const expect = chai.expect;

const url = "http://localhost:4000/api/v1";
let counter = Math.floor(Math.random() * (1000000 - 1) + 1);

describe("User endpoints", () => {
  describe("GET all users route", () => {
    it("should return an array of all users", (done) => {
      chai
        .request(url)
        .get("/users")
        .end((_, res) => {
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("GET one user route", () => {
    it("should return an user with an ID of 1", (done) => {
      chai
        .request(url)
        .get("/users/1")
        .end((_, res) => {
          expect(res.body).to.be.an("object").and.to.include({ user_id: 1 });
          done();
        });
    });

    it(`should throw an error if the user with specified ID doesn't exist`, (done) => {
      chai
        .request(url)
        .get("/users/123")
        .end((_, res) => {
          expect(res.error).not.to.be.equal(false);
          done();
        });
    });
  });

  describe("POST Login route", () => {
    it(`should return logged in for correct credentials`, async () => {
      const res = await chai
        .request(url)
        .post("/users/login")
        .send({ username: "admin", password: "admin" });

      expect(res.body).to.be.an("object").and.include({ message: "Logged in" });
    });
  });

  describe("GET Toggle user route", () => {
    it("should return 'Account activated' if account was previously deactivated and vice versa", (done) => {
      let agent = chai.request.agent(url);
      agent
        .post("/users/login")
        .send({ username: "admin", password: "admin" })
        .then(() => {
          agent.get("/users/deactivate/3").end((_, res) => {
            expect(res.body.message).to.satisfy((data: string) => {
              return (
                data === "Account activated" || data === "Account deactivated"
              );
            });

            done();
          });
        });
    });
  });

  describe("GET Toggle admin status route", () => {
    it("should return 'Admin status successfully set' if user was not an admin and vice versa", (done) => {
      let agent = chai.request.agent(url);
      agent
        .post("/users/login")
        .send({ username: "admin", password: "admin" })
        .then(() => {
          agent.get("/users/promote/3").end((_, res) => {
            expect(res.body.message).to.satisfy((data: string) => {
              return (
                data === "Admin status successfully set" ||
                data === "Admin status successfully removed"
              );
            });

            done();
          });
        });
    });
  });

  describe("GET me route", () => {
    it("should return username, id and isadmin of logged user", (done) => {
      let agent = chai.request.agent(url);
      agent
        .post("/users/login")
        .send({ username: "admin", password: "admin" })
        .then(() => {
          agent.get("/user/me").end((_, res) => {
            expect(res.body)
              .to.be.an("object")
              .and.to.have.property("user")
              .and.have.deep.property("id");
            expect(res.body)
              .to.be.an("object")
              .and.to.have.property("user")
              .and.have.deep.property("username");
            expect(res.body)
              .to.be.an("object")
              .and.to.have.property("user")
              .and.have.deep.property("isadmin");

            done();
          });
        });
    });
  });

  describe("POST register route", () => {
    it("should return 'User successfully registered'", (done) => {
      chai
        .request(url)
        .post("/users")
        .send({
          username: `test${counter}`,
          password: "test",
          name: "test",
          surname: "test",
          email: `test${counter}@test.com`,
        })
        .end((_, res) => {
          expect(res.body)
            .to.be.an("object")
            .and.include({ message: "User successfully registered" });

          done();
        });
    });
  });

  describe("User validation", () => {
    it("should return false if username is <= 2 characters in length", async () => {
      const User: User = {
        name: "test",
        surname: "test",
        username: "test44256",
        password: "test",
        email: "test@test.com",
      };
      expect(await userValidation(response, User)).to.equal(false);
    });

    it("should return false if username exists in the database", async () => {
      const User: User = {
        name: "test",
        surname: "test",
        username: "test",
        password: "test",
        email: "test@test.com",
      };
      expect(await userValidation(response, User)).to.equal(false);
    });

    it("should return false if password is <= 3 characters", async () => {
      const User: User = {
        name: "test",
        surname: "test",
        username: `test2131`,
        password: "tessd",
        email: "test@test.com",
      };
      expect(await userValidation(response, User)).to.equal(false);
    });

    it("should return false if email format is invalid (!= www.nesto@nestodrugo.com)", async () => {
      const User: User = {
        name: "test",
        surname: "test",
        username: `test2131357`,
        password: "tes",
        email: "tesfa",
      };
      expect(await userValidation(response, User)).to.equal(false);
    });

    it("should return false if email already exists", async () => {
      const User: User = {
        name: "test",
        surname: "test",
        username: `test2131357`,
        password: "tes",
        email: "test@test.com",
      };
      expect(await userValidation(response, User)).to.equal(false);
    });
  });
});

module.exports = chaiHttp;
