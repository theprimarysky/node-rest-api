const T = require("./tiktok.model");

/**
 * Load aweme and append to req.
 */
function load(req, res, next, id) {
  T.get(id)
    .then(aweme => {
      req.aweme = aweme; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get aweme
 * @returns {T}
 */
function get(req, res) {
  return res.json(req.aweme);
}

/**
 * Create new aweme
 * @property {number} req.body.version - The Schema Version of TikTok JSON resp.
 * @property {string} req.body.authorId - The User Id of the TikTok.
 * @property {string} req.body.awemeId - The unique Id of TikTok.
 * @property {object} req.body.children - The TikTok JSON resp.
 * @property {number} req.body.createTime - The time at which TikTok was posted.
 * @property {number} req.body.diggCount - The Like count of TikTok.
 * @property {string} req.body.musicId - The Id of music associated with TikTok.
 * @property {boolean} req.body.isFavourite - Is TikTok a favourite TikTok.
 * @property {number} req.body.rotateAngle - The Orientation of TikTok.
 * @property {number} req.body.createdAt - The creation time in MongoDB.
 * @property {number} req.body.updatedAt - The updation time in MongoDB.
 * @returns {T}
 */
function create(req, res, next) {
  const aweme = new T({
    version: req.body.version,
    authorId: req.body.authorId,
    awemeId: req.body.awemeId,
    children: req.body.children,
    createTime: req.body.createTime,
    diggCount: req.body.diggCount,
    musicId: req.body.musicId
  });

  aweme
    .save()
    .then(savedT => res.json(savedT))
    .catch(e => next(e));
}

/**
 * Update existing aweme
 * @property {number} req.body.version - The Schema Version of TikTok JSON resp.
 * @property {string} req.body.authorId - The User Id of the TikTok.
 * @property {string} req.body.awemeId - The unique Id of TikTok.
 * @property {object} req.body.children - The TikTok JSON resp.
 * @property {number} req.body.createTime - The time at which TikTok was posted.
 * @property {number} req.body.diggCount - The Like count of TikTok.
 * @property {string} req.body.musicId - The Id of music associated with TikTok.
 * @property {boolean} req.body.isFavourite - Is TikTok a favourite TikTok.
 * @property {number} req.body.rotateAngle - The Orientation of TikTok.
 * @property {number} req.body.createdAt - The creation time in MongoDB.
 * @property {number} req.body.updatedAt - The updation time in MongoDB.
 * @returns {T}
 */
function update(req, res, next) {
  const { aweme } = req;

  aweme.version = req.body.version;
  aweme.authorId = req.body.authorId;
  aweme.awemeId = req.body.awemeId;
  aweme.children = req.body.children;
  aweme.createTime = req.body.createTime;
  aweme.diggCount = req.body.diggCount;
  aweme.musicId = req.body.musicId;

  aweme
    .save()
    .then(savedT => res.json(savedT))
    .catch(e => next(e));
}

/**
 * Update existing aweme
 * @property {number} req.body.rotateAngle - Orientation value of aweme.
 * @returns {T}
 */
function rotate(req, res, next) {
  const { aweme } = req;

  aweme.rotateAngle = req.body.rotateAngle;

  aweme
    .save()
    .then(savedT => res.json(savedT))
    .catch(e => next(e));
}

/**
 * Update existing aweme
 * @property {number} req.body.isFavourite - Is TikTok a favourite TikTok.
 * @returns {T}
 */
function favourite(req, res, next) {
  const { aweme } = req;

  if (req.method === "PUT") {
    aweme.isFavourite = true;
  }
  if (req.method === "DELETE") {
    aweme.isFavourite = false;
  }

  aweme
    .save()
    .then(savedT => res.json(savedT))
    .catch(e => next(e));
}

/**
 * Get aweme list.
 * @property {number} req.query.skip - Number of awemes to be skipped.
 * @property {number} req.query.limit - Limit number of awemes to be returned.
 * @returns {T[]}
 */
function list(req, res, next) {
  const {
    filter = {},
    limit = 50,
    skip = 0,
    sortBy = "createdAt",
    sortDir = "asc"
  } = req.query;
  T.list({
    filter,
    limit,
    skip,
    sortBy,
    sortDir
  })
    .then(awemes => res.json(awemes))
    .catch(e => next(e));
}

/**
 * Delete aweme.
 * @returns {T}
 */
function remove(req, res, next) {
  const { aweme } = req;
  aweme
    .remove()
    .then(deletedT => res.json(deletedT))
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
