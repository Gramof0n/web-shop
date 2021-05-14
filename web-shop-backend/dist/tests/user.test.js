"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
const url = "http://localhost:4000/api/v1";
describe("User endpoints", () => {
    describe("GET all users route", () => {
        it("should return an array of all users", (done) => {
            chai_1.default
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
            chai_1.default
                .request(url)
                .get("/users/1")
                .end((_, res) => {
                expect(res.body).to.be.an("object").and.to.include({ user_id: 1 });
                done();
            });
        });
        it(`should throw an error if the user with specified ID doesn't exist`, (done) => {
            chai_1.default
                .request(url)
                .get("/users/123")
                .end((_, res) => {
                expect(res.error).not.to.be.equal(false);
                done();
            });
        });
    });
    describe("POST Login route", () => {
        it(`should return logged in for correct credentials`, () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield chai_1.default
                .request(url)
                .post("/users/login")
                .send({ username: "admin", password: "admin" });
            expect(res.body).to.be.an("object").and.include({ message: "Logged in" });
        }));
    });
    describe("GET Toggle user route", () => {
        it("should return 'Account activated' if account was previously deactivated and vice versa", (done) => {
            let agent = chai_1.default.request.agent(url);
            agent
                .post("/users/login")
                .send({ username: "admin", password: "admin" })
                .then(() => {
                agent.get("/users/deactivate/3").end((_, res) => {
                    expect(res.body.message).to.satisfy((data) => {
                        return (data === "Account activated" || data === "Account deactivated");
                    });
                    done();
                });
            });
        });
    });
    describe("GET Toggle admin status route", () => {
        it("should return 'Admin status successfully set' if user was not an admin and vice versa", (done) => {
            let agent = chai_1.default.request.agent(url);
            agent
                .post("/users/login")
                .send({ username: "admin", password: "admin" })
                .then(() => {
                agent.get("/users/promote/3").end((_, res) => {
                    expect(res.body.message).to.satisfy((data) => {
                        return (data === "Admin status successfully set" ||
                            data === "Admin status successfully removed");
                    });
                    done();
                });
            });
        });
    });
});
module.exports = chai_http_1.default;
//# sourceMappingURL=user.test.js.map