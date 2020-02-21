const Post = require("./instagram-post.model");

/**
 * Load post and append to req.
 */
function load(req, res, next, id) {
  Post.get(id)
    .then(post => {
      req.post = post; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get post
 * @returns {T}
 */
function get(req, res) {
  return res.json(req.post);
}

/**
 * Create new post
 * @property {number} req.body.version - The Schema Version of Post JSON resp.
 * @property {boolean} req.body.isVideo - The User Id of the Post.
 * @property {boolean} req.body.isStory - The Unique Id of Post.
 * @property {string} req.body.mediaId - The Post JSON resp.
 * @property {number} req.body.userId - The time at which it was posted.
 * @property {string} req.body.username - The Like count of Post.
 * @property {string} req.body.filepath - The location of Post.
 * @property {object} req.body.children - The Post JSON resp.
 * @property {number} req.body.createTime - The Post create timestamp.
 * @property {boolean} req.body.isFavourite - Is Post a favourite Post.
 * @property {number} req.body.rotateAngle - The Orientation of Post media.
 * @property {number} req.body.createdAt - The creation time in MongoDB.
 * @property {number} req.body.updatedAt - The updation time in MongoDB.
 * @returns {T}
 */
function create(req, res, next) {
  const post = new Post({
    version: req.body.version,
    isVideo: req.body.isVideo,
    isStory: req.body.isStory,
    mediaId: req.body.mediaId,
    userId: req.body.userId,
    username: req.body.username,
    children: req.body.children,
    filepath: req.body.filepath,
    createTime: req.body.createTime
  });

  post
    .save()
    .then(saved => res.json(saved))
    .catch(e => next(e));
}

/**
 * Update existing post
 * @property {number} req.body.version - The Schema Version of Post JSON resp.
 * @property {boolean} req.body.isVideo - The User Id of the Post.
 * @property {boolean} req.body.isStory - The Unique Id of Post.
 * @property {string} req.body.mediaId - The Post JSON resp.
 * @property {number} req.body.userId - The time at which it was posted.
 * @property {string} req.body.username - The Like count of Post.
 * @property {string} req.body.filepath - The location of Post.
 * @property {object} req.body.children - The Post JSON resp.
 * @property {number} req.body.createTime - The Post create timestamp.
 * @property {boolean} req.body.isFavourite - Is Post a favourite Post.
 * @property {number} req.body.rotateAngle - The Orientation of Post media.
 * @property {number} req.body.createdAt - The creation time in MongoDB.
 * @property {number} req.body.updatedAt - The updation time in MongoDB.
 * @returns {T}
 */
function update(req, res, next) {
  const { post } = req;

  post.version = req.body.version;
  post.isVideo = req.body.isVideo;
  post.isStory = req.body.isStory;
  post.mediaId = req.body.mediaId;
  post.userId = req.body.userId;
  post.username = req.body.username;
  post.filepath = req.body.filepath;
  post.children = req.body.children;
  post.createTime = req.body.createTime;

  post
    .save()
    .then(saved => res.json(saved))
    .catch(e => next(e));
}

/**
 * Update existing post
 * @property {number} req.body.rotateAngle - Orientation value of post.
 * @returns {T}
 */
function rotate(req, res, next) {
  const { post } = req;

  post.rotateAngle = req.body.rotateAngle;

  post
    .save()
    .then(saved => res.json(saved))
    .catch(e => next(e));
}

/**
 * Update existing post
 * @property {number} req.body.isFavourite - Is Post a favourite Post.
 * @returns {T}
 */
function favourite(req, res, next) {
  const { post } = req;

  if (req.method === "PUT") {
    post.isFavourite = true;
  }
  if (req.method === "DELETE") {
    post.isFavourite = false;
  }

  post
    .save()
    .then(saved => res.json(saved))
    .catch(e => next(e));
}

/**
 * Get post list.
 * @property {number} req.query.skip - Number of posts to be skipped.
 * @property {number} req.query.limit - Limit number of posts to be returned.
 * @returns {T[]}
 */
function list(req, res, next) {
  const {
    filter = {},
    limit = 50,
    skip = 0,
    sortBy = "createTime",
    sortDir = "asc"
  } = req.query;
  Post.list({
    filter,
    limit,
    skip,
    sortBy,
    sortDir
  })
    .then(posts => res.json(posts))
    .catch(e => next(e));
}

/**
 * Delete post.
 * @returns {T}
 */
function remove(req, res, next) {
  const { post } = req;
  post
    .remove()
    .then(deleted => res.json(deleted))
    .catch(e => next(e));
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove,
  rotate,
  favourite
};
