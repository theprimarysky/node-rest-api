const express = require("express");
const validate = require("express-validation");
const instaPostParamValidation = require("./instagram-post.validation");
const instaPostCtrl = require("./instagram-post.controller");

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/i/posts - Get list of posts */
  .get(instaPostCtrl.list)

  /** POST /api/i/posts - Create new Post */
  .post(validate(instaPostParamValidation.createPost), instaPostCtrl.create);

router
  .route("/:postId")
  /** GET /api/i/posts/:postId - Get Post */
  .get(instaPostCtrl.get)

  /** PUT /api/i/posts/:postId - Update Post */
  .put(validate(instaPostParamValidation.updatePost), instaPostCtrl.update)

  /** DELETE /api/i/posts/:postId - Delete user */
  .delete(instaPostCtrl.remove);

router
  .route("/:postId/rotate")
  /** PUT /api/i/posts/:postId/rotate - Update Post.rotateAngle */
  .put(validate(instaPostParamValidation.rotatePost), instaPostCtrl.rotate);

router
  .route("/:postId/favourite")
  /** PUT /api/i/posts/:postId - Update Post.isFavourite to true */
  .put(instaPostCtrl.favourite)

  /** PUT /api/i/posts/:postId - Update Post.isFavourite to false */
  .delete(instaPostCtrl.favourite);

/** Load user when API with userId route parameter is hit */
router.param("postId", instaPostCtrl.load);

module.exports = router;
