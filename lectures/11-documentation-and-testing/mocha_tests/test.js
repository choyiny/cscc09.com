// imports
const chai = require("chai");
const expect = chai.expect;
const assert = require("chai").assert;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { messages, app } = require("./app");

const SAMPLE_MESSAGE = {
  content: "test",
  username: "test",
  upvote: 0,
  downvote: 0,
};

describe("Messages", () => {
  describe("GET /api/messages", () => {
    beforeEach(() => {
      messages.remove({}, { multi: true });
    });
    it("should get all messages", (done) => {
      messages.insert(SAMPLE_MESSAGE, function () {
        chai
          .request(app)
          .get("/api/messages")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            expect(res.body[0]["content"]).to.equal(SAMPLE_MESSAGE["content"]);
            expect(res.body[0]["username"]).to.equal(
              SAMPLE_MESSAGE["username"]
            );
            done();
          });
      });
    });
  });
});
