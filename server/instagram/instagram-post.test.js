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

describe("## Instagram Post APIs", () => {
  let post = {
    version: 1,
    isVideo: false,
    isStory: true,
    mediaId: "2247024721451107208",
    userId: 1009926645,
    username: "swhite523",
    children: { data: { usename: "swhite523" } },
    filepath:
      "/media/drive/b/Instagram/story/1009926645/2020/2020-02-19_04-23-59%202247024721451107208_1009926645.jpg",
    createTime: 1582086239,
    isFavourite: false,
    rotateAngle: 0
  };

  describe("# POST /api/i/posts", () => {
    it("should create a new post", done => {
      request(app)
        .post("/api/i/posts")
        .send(post)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.version).to.equal(post.version);
          expect(res.body.isVideo).to.equal(post.isVideo);
          expect(res.body.isStory).to.equal(post.isStory);
          expect(res.body.mediaId).to.equal(post.mediaId);
          expect(res.body.userId).to.equal(post.userId);
          expect(res.body.username).to.equal(post.username);
          expect(res.body.children.toString()).to.equal(
            post.children.toString()
          );
          expect(res.body.filepath).to.equal(post.filepath);
          expect(res.body.createTime).to.equal(post.createTime);
          expect(res.body.isFavourite).to.equal(post.isFavourite);
          expect(res.body.rotateAngle).to.equal(post.rotateAngle);
          post = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/i/posts/:postId", () => {
    it("should get post details", done => {
      request(app)
        .get(`/api/i/posts/${post._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.version).to.equal(post.version);
          expect(res.body.isVideo).to.equal(post.isVideo);
          expect(res.body.isStory).to.equal(post.isStory);
          expect(res.body.mediaId).to.equal(post.mediaId);
          expect(res.body.userId).to.equal(post.userId);
          expect(res.body.username).to.equal(post.username);
          expect(res.body.children.toString()).to.equal(
            post.children.toString()
          );
          expect(res.body.filepath).to.equal(post.filepath);
          expect(res.body.createTime).to.equal(post.createTime);
          expect(res.body.isFavourite).to.equal(post.isFavourite);
          expect(res.body.rotateAngle).to.equal(post.rotateAngle);
          done();
        })
        .catch(done);
    });

    it("should report error with message - Not found, when post does not exists", done => {
      request(app)
        .get("/api/i/posts/56c787ccc67fc16ccc1a5e92")
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal("Not Found");
          done();
        })
        .catch(done);
    });
  });

  describe("# PUT /api/i/posts/:postId", () => {
    it("should update user details", done => {
      post.mediaId = "678843726860144153723";
      request(app)
        .put(`/api/i/posts/${post._id}`)
        .send(post)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.version).to.equal(post.version);
          expect(res.body.isVideo).to.equal(post.isVideo);
          expect(res.body.isStory).to.equal(post.isStory);
          expect(res.body.mediaId).to.equal("678843726860144153723");
          expect(res.body.userId).to.equal(post.userId);
          expect(res.body.username).to.equal(post.username);
          expect(res.body.children.toString()).to.equal(
            post.children.toString()
          );
          expect(res.body.filepath).to.equal(post.filepath);
          expect(res.body.createTime).to.equal(post.createTime);
          expect(res.body.isFavourite).to.equal(post.isFavourite);
          expect(res.body.rotateAngle).to.equal(post.rotateAngle);
          done();
        })
        .catch(done);
    });
  });

  describe("# PUT /api/i/posts/:postId/rotate", () => {
    it("should update update rotateAngle", done => {
      post.rotateAngle = 90;
      request(app)
        .put(`/api/i/posts/${post._id}/rotate`)
        .send({ rotateAngle: 90 })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.rotateAngle).to.equal(post.rotateAngle);
          done();
        })
        .catch(done);
    });
  });

  describe("# PUT /api/i/posts/:postId/favourite", () => {
    it("should update isFavourite", done => {
      request(app)
        .put(`/api/i/posts/${post._id}/favourite`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.isFavourite).to.equal(true);
          done();
        })
        .catch(done);
    });
  });

  describe("# DELETE /api/i/posts/:postId/favourite", () => {
    it("should update isFavourite", done => {
      request(app)
        .delete(`/api/i/posts/${post._id}/favourite`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.isFavourite).to.equal(false);
          done();
        })
        .catch(done);
    });
  });

  describe("# GET /api/i/posts", () => {
    it("should get all posts", done => {
      request(app)
        .get("/api/i/posts")
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });

    it("should get all posts (with limit and skip)", done => {
      request(app)
        .get("/api/i/posts")
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

    it("should get all posts for userId", done => {
      const { userId } = post;
      request(app)
        .get("/api/i/posts")
        .query({
          filter: { userId }
        })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });

  describe("# DELETE /api/i/posts/:postId", () => {
    it("should delete post", done => {
      request(app)
        .delete(`/api/i/posts/${post._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.version).to.equal(post.version);
          expect(res.body.isVideo).to.equal(post.isVideo);
          expect(res.body.isStory).to.equal(post.isStory);
          expect(res.body.mediaId).to.equal("678843726860144153723");
          expect(res.body.userId).to.equal(post.userId);
          expect(res.body.username).to.equal(post.username);
          expect(res.body.children.toString()).to.equal(
            post.children.toString()
          );
          expect(res.body.filepath).to.equal(post.filepath);
          expect(res.body.createTime).to.equal(post.createTime);
          expect(res.body.isFavourite).to.equal(post.isFavourite);
          expect(res.body.rotateAngle).to.equal(post.rotateAngle);
          done();
        })
        .catch(done);
    });
  });
});
