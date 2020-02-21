const request = require("supertest-as-promised");
const httpStatus = require("http-status");
const chai = require("chai"); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require("../../index");

chai.config.includeStack = true;

describe("## Server", () => {
  describe("loading express", () => {
    it("responds to /", done => {
      request(app)
        .get("/")
        .expect(200, done);
    });
    it("404 everything else", done => {
      request(app)
        .get("/foo/bar")
        .expect(404, done);
    });
  });
});

describe("## Misc", () => {
  describe("# GET /api/health-check", () => {
    it("should return OK", done => {
      request(app)
        .get("/api/health-check")
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.text).to.equal("OK");
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/404", () => {
    it("should return 404 status", done => {
      request(app)
        .get("/api/404")
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal("Not Found");
          done();
        })
        .catch(done);
    });
  });

  describe("# Error Handling", () => {
    // it('should handle mongoose CastError - Cast to ObjectId failed', (
    //   done) => {
    //   request(app)
    //     .get('/api/awemes/')
    //     .expect(httpStatus.INTERNAL_SERVER_ERROR)
    //     .then((res) => {
    //       expect(res.body.message).to.equal(
    //         'Internal Server Error');
    //       done();
    //     })
    //     .catch(done);
    // });

    it("should handle express validation error - awemeId is required", done => {
      request(app)
        .post("/api/awemes")
        .send({
          version: 1,
          authorId: "67543463857",
          children: { json: {}, timestamp: Date.now() },
          createTime: 1580556221,
          diggCount: 166940,
          musicId: "6733420122045827841"
        })
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          expect(res.body.message).to.equal('"awemeId" is required');
          done();
        })
        .catch(done);
    });
  });
});
