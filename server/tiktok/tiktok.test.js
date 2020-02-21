const mongoose = require("mongoose");
const request = require("supertest-as-promised");
const httpStatus = require("http-status");
const chai = require("chai"); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require("../../index");

chai.config.includeStack = true;

/**
 * root level hooks
 */
after(done => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe("## TikTok APIs", () => {
  let aweme = {
    version: 1,
    authorId: "67543463857",
    awemeId: "6788437268601441537",
    children: "Object",
    createTime: 1580556221,
    diggCount: 166940,
    musicId: "6733420122045827841"
  };

  describe("# POST /api/awemes", () => {
    it("should create a new aweme", done => {
      request(app)
        .post("/api/awemes")
        .send(aweme)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.version).to.equal(aweme.version);
          expect(res.body.authorId).to.equal(aweme.authorId);
          expect(res.body.awemeId).to.equal(aweme.awemeId);
          expect(res.body.children).to.equal(aweme.children);
          expect(res.body.createTime).to.equal(aweme.createTime);
          expect(res.body.diggCount).to.equal(aweme.diggCount);
          expect(res.body.musicId).to.equal(aweme.musicId);
          aweme = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/awemes/:awemeId", () => {
    it("should get aweme details", done => {
      request(app)
        .get(`/api/awemes/${aweme._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.version).to.equal(aweme.version);
          expect(res.body.authorId).to.equal(aweme.authorId);
          expect(res.body.awemeId).to.equal(aweme.awemeId);
          expect(res.body.children).to.equal(aweme.children);
          expect(res.body.createTime).to.equal(aweme.createTime);
          expect(res.body.diggCount).to.equal(aweme.diggCount);
          expect(res.body.musicId).to.equal(aweme.musicId);
          done();
        })
        .catch(done);
    });

    it("should report error with message - Not found, when aweme does not exists", done => {
      request(app)
        .get("/api/awemes/5d1ccb459bbb45158cede3d1")
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal("Not Found");
          done();
        })
        .catch(done);
    });
  });

  describe("# PUT /api/awemes/:awemeId", () => {
    it("should update user details", done => {
      aweme.awemeId = "678843726860144153723";
      request(app)
        .put(`/api/awemes/${aweme._id}`)
        .send(aweme)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.version).to.equal(aweme.version);
          expect(res.body.authorId).to.equal(aweme.authorId);
          expect(res.body.awemeId).to.equal("678843726860144153723");
          expect(res.body.children).to.equal(aweme.children);
          expect(res.body.createTime).to.equal(aweme.createTime);
          expect(res.body.diggCount).to.equal(aweme.diggCount);
          expect(res.body.musicId).to.equal(aweme.musicId);
          done();
        })
        .catch(done);
    });
  });

  describe("# PUT /api/awemes/:awemeId/rotate", () => {
    it("should update update rotateAngle", done => {
      const rotateAngle = 90;
      request(app)
        .put(`/api/awemes/${aweme._id}/rotate`)
        .send({ rotateAngle })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.rotateAngle).to.equal(rotateAngle);
          done();
        })
        .catch(done);
    });
  });

  describe("# PUT /api/awemes/:awemeId/favourite", () => {
    it("should update isFavourite", done => {
      request(app)
        .put(`/api/awemes/${aweme._id}/favourite`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.isFavourite).to.equal(true);
          done();
        })
        .catch(done);
    });
  });

  describe("# DELETE /api/awemes/:awemeId/favourite", () => {
    it("should update isFavourite", done => {
      request(app)
        .delete(`/api/awemes/${aweme._id}/favourite`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.isFavourite).to.equal(false);
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/awemes", () => {
    it("should get all awemes", done => {
      request(app)
        .get("/api/awemes")
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });

    it("should get all awemes (with limit and skip)", done => {
      request(app)
        .get("/api/awemes")
        .query({
          limit: 10,
          skip: 1
        })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });

    it("should get all awemes for authorId", done => {
      const { authorId } = aweme;
      request(app)
        .get("/api/awemes")
        .query({
          filter: { authorId }
        })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });

  describe("# DELETE /api/awemes/:awemeId", () => {
    it("should delete aweme", done => {
      request(app)
        .delete(`/api/awemes/${aweme._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.version).to.equal(aweme.version);
          expect(res.body.authorId).to.equal(aweme.authorId);
          expect(res.body.awemeId).to.equal("678843726860144153723");
          expect(res.body.children).to.equal(aweme.children);
          expect(res.body.createTime).to.equal(aweme.createTime);
          expect(res.body.diggCount).to.equal(aweme.diggCount);
          expect(res.body.musicId).to.equal(aweme.musicId);
          done();
        })
        .catch(done);
    });

    it("should throw error", done => {
      request(app)
        .delete("/api/awemes/")
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal("Not Found");
          done();
        })
        .catch(done);
    });
  });
});
